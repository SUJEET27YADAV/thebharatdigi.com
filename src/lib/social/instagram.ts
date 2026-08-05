import { sleep } from "@/utils/async";

export interface InstagramPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

function getAccountId(): string {
  const id = process.env.INSTAGRAM_ACCOUNT_ID;
  if (!id) throw new Error("INSTAGRAM_ACCOUNT_ID not set");
  return id as string;
}

function getAccessToken(): string {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!token) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN not set (Instagram uses the same token)");
  return token as string;
}

export async function postToInstagram(
  caption: string,
  imageUrl: string
): Promise<InstagramPostResult> {
  const accountId = getAccountId();
  const accessToken = getAccessToken();

  try {
    const createResponse = await fetch(
      `https://graph.facebook.com/v21.0/${accountId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }),
      }
    );

    if (!createResponse.ok) {
      const createData = await createResponse.json();
      return {
        success: false,
        error: `Instagram container creation error: ${JSON.stringify(createData)}`,
      };
    }

    const createData = await createResponse.json();

    if (!createData.id) {
      return {
        success: false,
        error: `Instagram container creation error: ${JSON.stringify(createData)}`,
      };
    }

    const containerId = createData.id;

    for (let attempt = 0; attempt < 30; attempt++) {
      await sleep(2000);

      const statusResponse = await fetch(
        `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${accessToken}`
      );
      if (!statusResponse.ok) {
        const statusError = await statusResponse.json();
        return {
          success: false,
          error: `Instagram container status error: ${JSON.stringify(statusError)}`,
        };
      }
      const statusData = await statusResponse.json();

      if (statusData.status_code === "FINISHED") break;
      if (statusData.status_code === "ERROR") {
        return {
          success: false,
          error: `Instagram container processing error: ${JSON.stringify(statusData)}`,
        };
      }
    }

    const publishResponse = await fetch(
      `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: accessToken,
        }),
      }
    );

    if (!publishResponse.ok) {
      const publishData = await publishResponse.json();
      return {
        success: false,
        error: `Instagram publish error: ${JSON.stringify(publishData)}`,
      };
    }

    const publishData = await publishResponse.json();

    if (!publishData.id) {
      return {
        success: false,
        error: `Instagram publish error: ${JSON.stringify(publishData)}`,
      };
    }

    return { success: true, postId: publishData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Instagram error",
    };
  }
}

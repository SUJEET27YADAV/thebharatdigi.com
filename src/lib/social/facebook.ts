export interface FacebookPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

function getPageId(): string {
  const id = process.env.FACEBOOK_PAGE_ID;
  if (!id) throw new Error("FACEBOOK_PAGE_ID not set");
  return id as string;
}

function getAccessToken(): string {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!token) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN not set");
  return token as string;
}

export async function postToFacebook(
  caption: string,
  imageUrl: string
): Promise<FacebookPostResult> {
  const pageId = getPageId();
  const accessToken = getAccessToken();

  try {
    const postResponse = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: caption,
          link: imageUrl,
          access_token: accessToken,
        }),
      }
    );

    const postData = await postResponse.json();

    if (!postResponse.ok || !postData.id) {
      return {
        success: false,
        error: `Facebook API error: ${JSON.stringify(postData)}`,
      };
    }

    return { success: true, postId: postData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Facebook error",
    };
  }
}

export async function postImageToFacebook(
  caption: string,
  imageBuffer: Buffer,
  filename: string,
  mimeType: string
): Promise<FacebookPostResult> {
  const pageId = getPageId();
  const accessToken = getAccessToken();

  try {
    const formData = new FormData();
    formData.append("message", caption);
    formData.append("source", new Blob([new Uint8Array(imageBuffer)], { type: mimeType }), filename);
    formData.append("access_token", accessToken);

    const postResponse = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}/photos`,
      {
        method: "POST",
        body: formData,
      }
    );

    const postData = await postResponse.json();

    if (!postResponse.ok || !postData.id) {
      return {
        success: false,
        error: `Facebook photo API error: ${JSON.stringify(postData)}`,
      };
    }

    return { success: true, postId: postData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Facebook error",
    };
  }
}

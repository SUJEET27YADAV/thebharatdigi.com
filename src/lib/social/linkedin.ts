export interface LinkedInPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

function getOrgId(): string {
  const id = process.env.LINKEDIN_ORG_ID;
  if (!id) throw new Error("LINKEDIN_ORG_ID not set");
  return id as string;
}

function getAccessToken(): string {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) throw new Error("LINKEDIN_ACCESS_TOKEN not set");
  return token as string;
}

export async function postToLinkedIn(
  caption: string,
  imageUrl?: string
): Promise<LinkedInPostResult> {
  const orgId = getOrgId();
  const accessToken = getAccessToken();

  try {
    const postBody: Record<string, unknown> = {
      author: `urn:li:organization:${orgId}`,
      commentary: caption,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
    };

    if (imageUrl) {
      const imageUploadResult = await uploadLinkedInImage(imageUrl, accessToken);
      if (imageUploadResult.success && imageUploadResult.imageUrn) {
        postBody.content = {
          media: {
            title: "The Bharat Digital",
            id: imageUploadResult.imageUrn,
          },
        };
      }
    }

    const response = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202507",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(postBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        success: false,
        error: `LinkedIn API error ${response.status}: ${errText}`,
      };
    }

    const postId = response.headers.get("x-restli-id") || undefined;

    return { success: true, postId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown LinkedIn error",
    };
  }
}

interface ImageUploadResult {
  success: boolean;
  imageUrn?: string;
  error?: string;
}

async function uploadLinkedInImage(
  imageUrl: string,
  accessToken: string
): Promise<ImageUploadResult> {
  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return { success: false, error: "Failed to download image" };
    }

    const imageBlob = await imageResponse.blob();
    const formData = new FormData();
    formData.append("initializeUploadRequest", JSON.stringify({ "registerUploadRequest": { "recipes": [ "urn:li:digitalmediaRecipe:feedshare-image" ], "owner": `urn:li:organization:${getOrgId()}` } }));

    const initResponse = await fetch(
      "https://api.linkedin.com/v2/assets?action=registerUpload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202507",
        },
        body: formData,
      }
    );

    if (!initResponse.ok) {
      const errText = await initResponse.text();
      return { success: false, error: `LinkedIn image init error: ${errText}` };
    }

    const initData = await initResponse.json();
    const uploadUrl = initData.value?.uploadMechanism?.[
      "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ]?.uploadUrl;
    const assetUrn = initData.value?.asset;

    if (!uploadUrl || !assetUrn) {
      return { success: false, error: "LinkedIn returned no upload URL" };
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
      },
      body: imageBlob,
    });

    if (!uploadResponse.ok) {
      return { success: false, error: "LinkedIn image upload failed" };
    }

    return { success: true, imageUrn: assetUrn };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "LinkedIn image upload failed",
    };
  }
}

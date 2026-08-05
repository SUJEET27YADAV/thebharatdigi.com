export interface FacebookPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

interface GraphResponse {
  id?: string;
  post_id?: string;
  error?: { message?: string };
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
  imageUrl: string | null
): Promise<FacebookPostResult> {
  const pageId = getPageId();
  const accessToken = getAccessToken();

  try {
    const data: GraphResponse = imageUrl
      ? await uploadPhotoPost(pageId, accessToken, caption, imageUrl)
      : await createTextPost(pageId, accessToken, caption);

    if (!data.id && !data.post_id) {
      return {
        success: false,
        error: `Facebook API error: ${JSON.stringify(data)}`,
      };
    }

    return { success: true, postId: data.post_id || data.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Facebook error",
    };
  }
}

async function uploadPhotoPost(
  pageId: string,
  accessToken: string,
  caption: string,
  imageUrl: string
): Promise<GraphResponse> {
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: HTTP ${imageResponse.status}`);
  }

  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  const contentType = imageResponse.headers.get("content-type") || "image/png";

  const form = new FormData();
  form.append(
    "source",
    new Blob([imageBuffer], { type: contentType }),
    "post.png"
  );
  form.append("message", caption);
  form.append("access_token", accessToken);

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${pageId}/photos`,
    {
      method: "POST",
      body: form,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Facebook API error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

async function createTextPost(
  pageId: string,
  accessToken: string,
  caption: string
): Promise<GraphResponse> {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/${pageId}/feed`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: caption,
        access_token: accessToken,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Facebook API error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

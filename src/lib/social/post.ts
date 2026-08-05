export interface PlatformResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
}

export interface PostResult {
  topicId: string;
  topicTitle: string;
  platforms: PlatformResult[];
  imageUrl: string | null;
  timestamp: string;
  alreadyPosted?: boolean;
}

export { ALL_TOPICS, SERVICES, INDUSTRIES, TIPS, FACTS, getTopicById, getRandomTopic, getTopicsByCategory } from "./topics";
export type { ContentTopic } from "./topics";

export { generatePostText } from "./generate-text";
export type { GeneratedText } from "./generate-text";

export { generateImage, generateImageAsBuffer } from "./generate-image";
export type { GeneratedImage } from "./generate-image";

export { postToFacebook, postImageToFacebook } from "./facebook";
export type { FacebookPostResult } from "./facebook";

export { postToInstagram } from "./instagram";
export type { InstagramPostResult } from "./instagram";

export { postToLinkedIn } from "./linkedin";
export type { LinkedInPostResult } from "./linkedin";

export { runPost } from "./post";
export type { PlatformResult, PostResult } from "./post";

import type { ContentTopic } from "./topics";

const BRAND_NAME = "The Bharat Digital";
const WEBSITE = "https://www.thebharatdigi.com";
const TAGLINE = "Transforming ideas into digital reality";

export function buildTextPrompt(topic: ContentTopic, platform: "facebook" | "instagram" | "linkedin"): string {
  const platformGuidelines: Record<string, string> = {
    facebook: `Write for Facebook: conversational, friendly, use emojis moderately, include a clear call-to-action. Keep it under 280 characters for best engagement. Include 3-5 relevant hashtags at the end.`,
    instagram: `Write for Instagram: engaging, visual language, use emojis generously, storytelling tone. Include 15-20 relevant hashtags at the end (mix of popular and niche). Keep caption under 300 characters for the hook, then expand.`,
    linkedin: `Write for LinkedIn: professional but approachable, thought-leadership tone, no excessive emojis. Focus on business value. Include 3-5 relevant hashtags. Keep it concise and impactful.`,
  };

  return `You are a social media marketing expert for ${BRAND_NAME}, a premium web development and IT company based in Noida, India.

Write a social media post about this topic:

**Topic:** ${topic.title}
**About:** ${topic.description}

**Platform guidelines:** ${platformGuidelines[platform]}

**Brand voice:** Friendly, professional, confident. We're experts who make technology accessible. We serve clients globally from our base in India.

**Rules:**
1. Start with a hook that grabs attention
2. Provide value or insight
3. End with a clear CTA (visit website, contact us, etc.)
4. Website URL: ${WEBSITE}
5. Never mention competitors
6. Never use false claims or statistics
7. Make it feel authentic, not salesy

Return ONLY the post text, nothing else. No quotes around it.`;
}

export function buildImagePrompt(topic: ContentTopic): string {
  return `${topic.imagePromptBase}, professional corporate style, clean modern design, no text, high quality`;
}

export function adaptForPlatform(
  text: string,
  platform: "facebook" | "instagram" | "linkedin"
): string {
  let adapted = text.trim();

  if (platform === "instagram") {
    if (!adapted.includes("#")) {
      adapted += "\n\n#WebDevelopment #DigitalMarketing #TheBharatDigital #WebDesign #TechSolutions";
    }
  }

  if (platform === "linkedin") {
    adapted = adapted.replace(/😊|🎉|🚀|💡|🔥|✨|🎯|💪|🙌|🌟/g, "");
    adapted = adapted.replace(/\n{3,}/g, "\n\n");
  }

  if (platform === "facebook") {
    if (!adapted.includes(WEBSITE)) {
      adapted += `\n\nVisit us: ${WEBSITE}`;
    }
  }

  return adapted;
}

export function generateHashtags(topic: ContentTopic): string[] {
  const base = ["TheBharatDigital", "WebDevelopment", "DigitalSolutions"];

  const topicHashtags: Record<string, string[]> = {
    "mvp-development": ["MVP", "StartupLife", "LaunchFast", "ProductDevelopment"],
    "ai-development": ["ArtificialIntelligence", "AI", "MachineLearning", "TechInnovation"],
    automation: ["BusinessAutomation", "Workflow", "Efficiency", "ProductivityHack"],
    ecommerce: ["Ecommerce", "OnlineStore", "Shopify", "WooCommerce", "DigitalStore"],
    "seo-marketing": ["SEO", "DigitalMarketing", "GoogleRanking", "MarketingStrategy"],
    "mobile-apps": ["MobileApp", "AppDevelopment", "iOS", "Android", "ReactNative"],
    "custom-web": ["WebDevelopment", "NextJS", "ReactJS", "CustomWebsite"],
    performance: ["WebsiteSpeed", "CoreWebVitals", "PerformanceOptimization", "FastWebsite"],
    "web-apps": ["WebApp", "SaaS", "Dashboard", "FullStack"],
    uiux: ["UIUX", "DesignThinking", "UserExperience", "FigmaDesign"],
    "responsive-design": ["ResponsiveDesign", "MobileFirst", "WebDesign"],
    healthcare: ["HealthTech", "DigitalHealth", "MedTech", "HealthcareIT"],
    legal: ["LegalTech", "LawFirm", "LegalInnovation", "CaseManagement"],
    "real-estate": ["RealEstate", "PropTech", "PropertyTech", "RealEstateTech"],
    "ecommerce-retail": ["RetailTech", "EcommerceSolutions", "OnlineRetail"],
    travel: ["TravelTech", "HospitalityTech", "BookingPlatform", "TravelDigital"],
    "luxury-automotive": ["LuxuryBrands", "AutomotiveWeb", "PremiumDesign", "LuxuryDigital"],
  };

  const extra = topicHashtags[topic.id] || [];
  return [...base, ...extra].slice(0, 10);
}

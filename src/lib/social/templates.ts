import type { ContentTopic } from "./topics";

const BRAND_NAME = "The Bharat Digital";
const WEBSITE = "https://www.thebharatdigi.com";
const PHONE = "+91 99992 39307";
// Clean, high-converting contact block
const CONTACT_FOOTER = `\n\n👇 **Ready to scale? Let’s talk.**\n📞 Call/WhatsApp: ${PHONE}\n🌐 Visit: ${WEBSITE}`;

export function buildTextPrompt(
  topic: ContentTopic,
  platform: "facebook" | "instagram" | "linkedin",
): string {
  const platformGuidelines: Record<string, string> = {
    facebook: `Goal: Immediate Leads. Hook the reader with an active business problem within 2 lines. Focus on ROI, speed, and reliability. End with a strong CTA to comment or message directly. Include 3 high-converting hashtags. Keep under 300 characters.`,
    instagram: `Goal: Immediate Leads. High-energy hook using problem-agitation-solution. Use clear line breaks and relevant emojis to highlight value points. End with a CTA pushing users to link in bio or WhatsApp. Include 8-10 targeted hashtags.`,
    linkedin: `Goal: B2B Lead Generation. Write a direct, insight-packed post. Format: [Bold Problem Hook] -> [1-3 Bullet Points of Impact/Solution] -> [Direct B2B Call to Action]. Maintain an authoritative, professional voice. No fluff, high signal. Include 3 B2B hashtags.`,
  };

  return `You are an elite B2B conversion copywriter for ${BRAND_NAME}, a premier web development and digital agency in Noida, India serving global clients.

Your goal is to write a social media post that generates **IMMEDIATE LEADS** for:

**Topic:** ${topic.title}
**Context:** ${topic.description}

**Platform Strategy:** ${platformGuidelines[platform]}

**Brand Voice:** Authoritative, direct, highly persuasive, results-focused.

**Conversion Rules:**
1. **Hook:** Start with a high-intent pain point, alarming statistic, or direct transformation offer.
2. **Value:** Deliver a crisp 2-3 point solution showing clear business ROI (e.g., higher conversions, faster loading, automated leads).
3. **CTA:** Prompt the user to reach out *now* (e.g., "Ready for a free tech audit?", "Get your custom demo today").
4. **No Placeholders:** NEVER write placeholders like "[Insert Link]" or contact information in the body text.
5. **No Fluff:** Eliminate corporate jargon and generic statements.

Return ONLY the final post text. No introductory remarks or quotes.`;
}

export function adaptForPlatform(
  text: string,
  platform: "facebook" | "instagram" | "linkedin",
): string {
  let adapted = text.trim();

  // Strip accidental LLM-generated contact blocks or footers
  adapted = adapted.replace(/(📞|🌐|Call\/WhatsApp|Visit:).*$/gi, "").trim();
  adapted = adapted.replace(/\[Insert[^\]]*\]/gi, "").trim();
  adapted = adapted
    .replace(/(Phone|Contact|Website|Link):?\s*\[?[^\]\n]*\]?/gi, "")
    .trim();

  // Normalize excessive spacing
  adapted = adapted.replace(/\n{3,}/g, "\n\n");

  // Format tailored to platform engagement
  if (platform === "linkedin") {
    // Keep subtle strategic emojis (e.g., 🚀, 📈) for readability, strip non-professional ones
    adapted = adapted.replace(/😜|🎉|🙌|🔥/g, "");
  }

  // Append standardized high-conversion contact footer
  adapted += CONTACT_FOOTER;

  return adapted;
}

export function generateHashtags(topic: ContentTopic): string[] {
  // Intent-focused base hashtags
  const base = [
    "TheBharatDigital",
    "WebDevelopment",
    "HireDevelopers",
    "TechGrowth",
  ];

  const topicHashtags: Record<string, string[]> = {
    "mvp-development": [
      "MVPDevelopment",
      "StartupGrowth",
      "BuildInPublic",
      "LaunchFast",
    ],
    "ai-development": [
      "AIBusiness",
      "AutomationTools",
      "AIIntegration",
      "TechInnovation",
    ],
    automation: [
      "BusinessAutomation",
      "WorkflowEfficiency",
      "ProcessAutomation",
    ],
    ecommerce: [
      "EcommerceGrowth",
      "ShopifyExperts",
      "IncreaseSales",
      "ConversionRate",
    ],
    "seo-marketing": [
      "SEOStrategy",
      "LeadGeneration",
      "GoogleRanking",
      "DigitalMarketing",
    ],
    "mobile-apps": [
      "AppDevelopment",
      "iOSApps",
      "AndroidApps",
      "MobileSolutions",
    ],
    "custom-web": ["NextJS", "ReactJS", "CustomWebDesign", "WebPerformance"],
    performance: ["WebsiteSpeed", "CoreWebVitals", "SiteOptimization"],
    "web-apps": ["SaaSDevelopment", "WebApps", "FullStackSolutions"],
    uiux: ["UIUXDesign", "UXOptimization", "ConversionDesign"],
  };

  const extra = topicHashtags[topic.id] || [
    "DigitalTransformation",
    "ITServices",
  ];
  return [...base, ...extra].slice(0, 8);
}

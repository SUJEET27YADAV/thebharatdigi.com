export interface ContentTopic {
  id: string;
  category: "service" | "industry" | "tip" | "fact" | "testimonial" | "behindthescenes";
  title: string;
  description: string;
  imagePromptBase: string;
}

export const SERVICES: ContentTopic[] = [
  {
    id: "mvp-development",
    category: "service",
    title: "MVP Development",
    description:
      "We help startups launch their Minimum Viable Product in just 60 days. Validate your idea, attract investors, and hit the market fast.",
    imagePromptBase: "modern startup office with developers building an MVP on screens, clean tech aesthetic",
  },
  {
    id: "ai-development",
    category: "service",
    title: "AI Development",
    description:
      "From custom ChatGPT models to RAG pipelines and AI-powered automation — we build intelligent solutions that transform how your business operates.",
    imagePromptBase: "futuristic AI neural network visualization with glowing nodes, blue and purple tech colors",
  },
  {
    id: "automation",
    category: "service",
    title: "Business Automation",
    description:
      "Automate your CRM workflows, email sequences, and repetitive tasks. We build custom automation using Zapier, Make, n8n, and custom scripts.",
    imagePromptBase: "workflow automation diagram with connected gears and digital nodes, clean modern design",
  },
  {
    id: "ecommerce",
    category: "service",
    title: "E-Commerce Development",
    description:
      "Whether it's Shopify, WooCommerce, or a custom headless solution — we build online stores that convert visitors into loyal customers.",
    imagePromptBase: "modern e-commerce store interface on laptop with shopping cart, vibrant product display",
  },
  {
    id: "seo-marketing",
    category: "service",
    title: "SEO & Digital Marketing",
    description:
      "Rank higher on Google with our technical SEO, content strategy, and local search optimization. Data-driven marketing that delivers results.",
    imagePromptBase: "SEO analytics dashboard showing growth charts and search rankings, professional blue theme",
  },
  {
    id: "mobile-apps",
    category: "service",
    title: "Mobile App Development",
    description:
      "Beautiful, performant apps for iOS and Android using React Native and Flutter. From concept to App Store, we've got you covered.",
    imagePromptBase: "sleek mobile app interfaces on iPhone and Android phones, modern UI design showcase",
  },
  {
    id: "custom-web",
    category: "service",
    title: "Custom Web Development",
    description:
      "Bespoke websites and web applications built with Next.js, React, and modern technologies. No templates, just pure craftsmanship.",
    imagePromptBase: "developer workspace with multiple monitors showing code and website designs, clean aesthetic",
  },
  {
    id: "performance",
    category: "service",
    title: "Performance Optimization",
    description:
      "Is your website slow? We optimize Core Web Vitals, implement caching, compress images, and squeeze every millisecond out of your load time.",
    imagePromptBase: "speed gauge hitting maximum with website loading instantly, green performance indicators",
  },
  {
    id: "web-apps",
    category: "service",
    title: "Web App Development",
    description:
      "SaaS platforms, dashboards, and APIs — built with Next.js, React, Node.js, and Supabase. Scalable architecture for growing businesses.",
    imagePromptBase: "modern SaaS dashboard with charts and data visualizations, dark mode interface",
  },
  {
    id: "uiux",
    category: "service",
    title: "UI/UX Design",
    description:
      "From user research to wireframing and Figma prototypes — we design interfaces that users love. Beautiful design meets perfect usability.",
    imagePromptBase: "UI/UX design process showing wireframes evolving into polished interface, Figma style",
  },
  {
    id: "responsive-design",
    category: "service",
    title: "Responsive Design",
    description:
      "Every website we build looks stunning on every device — from 4K monitors to the smallest smartphones. Mobile-first, always.",
    imagePromptBase: "responsive website displaying perfectly across laptop tablet and phone, multi-device showcase",
  },
];

export const INDUSTRIES: ContentTopic[] = [
  {
    id: "healthcare",
    category: "industry",
    title: "Healthcare Digital Solutions",
    description:
      "We build HIPAA-compliant patient portals, telemedicine platforms, and healthcare apps that improve patient outcomes and streamline operations.",
    imagePromptBase: "modern healthcare technology with digital patient portal on tablet, clean medical blue theme",
  },
  {
    id: "legal",
    category: "industry",
    title: "Legal Tech Solutions",
    description:
      "Case management systems, client portals, and document automation — we build digital tools that help law firms work smarter, not harder.",
    imagePromptBase: "modern law office with digital case management system on screen, professional legal theme",
  },
  {
    id: "real-estate",
    category: "industry",
    title: "Real Estate Platforms",
    description:
      "Property listing websites, virtual tour integrations, and CRM systems — everything real estate agencies need to close more deals.",
    imagePromptBase: "real estate platform showing property listings with virtual tour feature, modern interface",
  },
  {
    id: "ecommerce-retail",
    category: "industry",
    title: "E-Commerce & Retail",
    description:
      "From boutique stores to large-scale marketplaces — we build e-commerce experiences that drive sales and build brand loyalty.",
    imagePromptBase: "luxury e-commerce storefront with product showcase, elegant retail design",
  },
  {
    id: "travel",
    category: "industry",
    title: "Travel & Hospitality",
    description:
      "Booking engines, travel platforms, and hotel management systems — we create digital experiences that inspire wanderlust and drive bookings.",
    imagePromptBase: "travel booking platform with beautiful destination images, wanderlust inspired design",
  },
  {
    id: "luxury-automotive",
    category: "industry",
    title: "Luxury & Automotive",
    description:
      "High-end websites for luxury brands and automotive businesses. Premium design that matches the caliber of your products.",
    imagePromptBase: "luxury automotive website with sleek car photography, premium dark gold aesthetic",
  },
];

export const TIPS: ContentTopic[] = [
  {
    id: "tip-core-web-vitals",
    category: "tip",
    title: "Core Web Vitals Matter",
    description:
      "Google uses Core Web Vitals as a ranking factor. A 1-second delay in load time can reduce conversions by 7%. Is your website fast enough?",
    imagePromptBase: "website performance metrics dashboard showing Core Web Vitals scores, speed optimization",
  },
  {
    id: "tip-mobile-first",
    category: "tip",
    title: "Mobile-First is Not Optional",
    description:
      "Over 60% of web traffic comes from mobile. If your website isn't optimized for phones, you're losing customers every single day.",
    imagePromptBase: "mobile phone browsing a beautiful website, split screen with desktop version",
  },
  {
    id: "tip-seo-basics",
    category: "tip",
    title: "SEO Basics Every Business Needs",
    description:
      "1) Optimize your title tags. 2) Add meta descriptions. 3) Use header tags properly. 4) Build quality backlinks. 5) Update content regularly.",
    imagePromptBase: "SEO checklist with checkmarks on a clean notepad, surrounded by digital marketing icons",
  },
  {
    id: "tip-ai-automation",
    category: "tip",
    title: "AI Can Save You 20 Hours/Week",
    description:
      "From automated email responses to intelligent data processing — AI automation isn't the future, it's here now. Start saving time today.",
    imagePromptBase: "clock transforming into AI gears, time saved concept, modern tech illustration",
  },
  {
    id: "tip-ecommerce-ux",
    category: "tip",
    title: "E-Commerce UX That Converts",
    description:
      "Simplify your checkout process. Add trust signals. Use high-quality images. Offer multiple payment options. Small changes, big revenue impact.",
    imagePromptBase: "e-commerce checkout flow showing smooth user experience, conversion optimization",
  },
  {
    id: "tip-security",
    category: "tip",
    title: "Website Security Checklist",
    description:
      "1) Use HTTPS. 2) Keep plugins updated. 3) Implement CSP headers. 4) Regular backups. 5) Monitor for vulnerabilities. Don't wait until it's too late.",
    imagePromptBase: "digital security shield protecting a website, cybersecurity protection concept",
  },
];

export const FACTS: ContentTopic[] = [
  {
    id: "fact-load-time",
    category: "fact",
    title: "Speed Kills (Slow Websites)",
    description:
      "53% of mobile users abandon a website that takes over 3 seconds to load. Every second counts. We optimize for speed so you never lose a visitor.",
    imagePromptBase: "stopwatch measuring website load speed, lightning fast website concept",
  },
  {
    id: "fact-first-impression",
    category: "fact",
    title: "First Impressions Are Digital",
    description:
      "94% of first impressions are design-related. Visitors judge your business within 50 milliseconds of landing on your website. Make it count.",
    imagePromptBase: "split screen showing bad vs good website design, before and after comparison",
  },
  {
    id: "fact-roi",
    category: "fact",
    title: "Every $1 in UX Returns $100",
    description:
      "That's a 9,900% ROI. Investing in good design isn't an expense — it's the highest-return investment your business can make.",
    imagePromptBase: "graph showing ROI growth from UX investment, upward arrow with dollar signs",
  },
  {
    id: "fact-india-digital",
    category: "fact",
    title: "India's Digital Boom",
    description:
      "India will have 900M+ internet users by 2025. If your business isn't online with a strong digital presence, you're invisible to the world's largest digital market.",
    imagePromptBase: "India digital transformation map with connected cities, growth visualization",
  },
];

export const ALL_TOPICS: ContentTopic[] = [
  ...SERVICES,
  ...INDUSTRIES,
  ...TIPS,
  ...FACTS,
];

export function getTopicById(id: string): ContentTopic | undefined {
  return ALL_TOPICS.find((t) => t.id === id);
}

export function getRandomTopic(excludeIds: string[] = []): ContentTopic {
  const available = ALL_TOPICS.filter((t) => !excludeIds.includes(t.id));
  if (available.length === 0) return ALL_TOPICS[Math.floor(Math.random() * ALL_TOPICS.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getTopicsByCategory(category: ContentTopic["category"]): ContentTopic[] {
  return ALL_TOPICS.filter((t) => t.category === category);
}

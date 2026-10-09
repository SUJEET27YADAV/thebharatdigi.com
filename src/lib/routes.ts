export interface RouteGroup {
  label: string;
  path: string;
  icon: string;
  children?: { label: string; path: string; description?: string }[];
}

export const NAV_GROUPS: RouteGroup[] = [
  {
    label: "Services",
    path: "/services",
    icon: "Code",
    children: [
      {
        label: "MVP Development",
        path: "/services/mvp-development",
        description: "Launch in 60 days",
      },
      {
        label: "AI Development",
        path: "/services/ai-development",
        description: "Generative AI solutions",
      },
      {
        label: "Automation",
        path: "/services/automation",
        description: "CRM, workflows, no-code",
      },
      {
        label: "E-commerce Development",
        path: "/services/ecommerce-development",
        description: "Shopify, WooCommerce, custom",
      },
      {
        label: "SEO & Marketing",
        path: "/services/seo-marketing",
        description: "Rank higher, convert better",
      },
      {
        label: "Mobile Apps",
        path: "/services/mobile-app-development",
        description: "iOS, Android, cross-platform",
      },
      {
        label: "Custom Web Development",
        path: "/services/custom-web-development",
        description: "Tailored websites, any stack",
      },
      {
        label: "Performance Optimization",
        path: "/services/performance-optimization",
        description: "Speed, Core Web Vitals, caching",
      },
      {
        label: "Web App Development",
        path: "/services/web-app-development",
        description: "SaaS, dashboards, APIs",
      },
      {
        label: "UI/UX Design",
        path: "/services/ui-ux-design",
        description: "User research to prototypes",
      },
      {
        label: "Responsive Design",
        path: "/services/responsive-design",
        description: "Mobile-first, cross-browser",
      },
    ],
  },
  {
    label: "Games",
    path: "/games",
    icon: "Gamepad2",
    children: [
      {
        label: "Bingo Clash Live",
        path: "/games/bingo-clash-live",
        description: "Multiplayer PvP & Voice Chat",
      },
      {
        label: "All Games",
        path: "/games",
        description: "Explore TBD Mobile Games",
      },
    ],
  },
  {
    label: "Industries",
    path: "/industries",
    icon: "Building",
    children: [
      { label: "Healthcare", path: "/industries/healthcare" },
      { label: "Legal", path: "/industries/legal" },
      { label: "Real Estate", path: "/industries/real-estate" },
      { label: "E-commerce & Retail", path: "/industries/ecommerce-retail" },
      { label: "Travel & Hospitality", path: "/industries/travel-hospitality" },
      { label: "Luxury & Automotive", path: "/industries/luxury-automotive" },
    ],
  },
  {
    label: "Resources",
    path: "/blog",
    icon: "Book",
    children: [
      { label: "Blog", path: "/blog" },
      { label: "Guides", path: "/guides" },
      { label: "Cost Calculator", path: "/cost-calculator" },
    ],
  },
  {
    label: "Locations",
    path: "/locations",
    icon: "Map",
    children: [
      { label: "Delhi", path: "/locations/delhi" },
      { label: "Noida", path: "/locations/noida" },
      { label: "Gurugram", path: "/locations/gurugram" },
      { label: "Faridabad", path: "/locations/faridabad" },
      { label: "Ghaziabad", path: "/locations/ghaziabad" },
    ],
  },
];

export const NAV_LINKS: RouteGroup[] = [
  { label: "Services", path: "/services", icon: "Code" },
  { label: "Games", path: "/games", icon: "Gamepad2" },
  { label: "About", path: "/aboutus", icon: "BookUser" },
  { label: "Portfolio", path: "/portfolio", icon: "GalleryHorizontalEnd" },
  { label: "SEO Audit Pro", path: "/seo-audit-pro", icon: "SearchCode" },
  { label: "Shop", path: "/shop", icon: "Store" },
  { label: "Contact", path: "/contactus", icon: "Contact" },
];

export const PUBLIC_PATHS: string[] = [
  "/",
  "/aboutus",
  "/contactus",
  "/shop",
  "/services",
  "/services/mvp-development",
  "/services/ai-development",
  "/services/automation",
  "/services/ecommerce-development",
  "/services/seo-marketing",
  "/services/mobile-app-development",
  "/services/custom-web-development",
  "/services/performance-optimization",
  "/services/web-app-development",
  "/services/ui-ux-design",
  "/services/responsive-design",
  "/games",
  "/games/bingo-clash-live",
  "/games/bingo-clash-live/privacy",
  "/industries",
  "/industries/healthcare",
  "/industries/legal",
  "/industries/real-estate",
  "/industries/ecommerce-retail",
  "/industries/travel-hospitality",
  "/industries/luxury-automotive",
  "/portfolio",
  "/seo-audit-pro",
  "/blog",
  "/guides",
  "/cost-calculator",
  "/tutorials",
  "/locations",
  "/locations/delhi",
  "/locations/noida",
  "/locations/gurugram",
  "/locations/faridabad",
  "/locations/ghaziabad",
  "/nodemailer",
  "/passgen",
  "/cart",
  "/payment-confirmation",
  "/privacypolicy",
  "/termsandconditions",
];

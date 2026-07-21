export interface RouteGroup {
  label: string;
  path?: string;
  icon?: string;
  children?: { label: string; path: string; description?: string }[];
}

export const NAV_GROUPS: RouteGroup[] = [
  {
    label: "Services",
    path: "/services",
    icon: "code",
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
    label: "Industries",
    path: "/industries",
    icon: "building",
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
    icon: "book",
    children: [
      { label: "Blog", path: "/blog" },
      { label: "Guides", path: "/guides" },
      { label: "Cost Calculator", path: "/cost-calculator" },
    ],
  },
  {
    label: "Locations",
    path: "/locations",
    icon: "map",
    children: [
      { label: "Delhi", path: "/locations/delhi" },
      { label: "Noida", path: "/locations/noida" },
      { label: "Gurugram", path: "/locations/gurugram" },
      { label: "Faridabad", path: "/locations/faridabad" },
      { label: "Ghaziabad", path: "/locations/ghaziabad" },
    ],
  },
];

export const TOP_LINKS: RouteGroup[] = [
  { label: "Services", path: "/services" },
  { label: "About", path: "/aboutus" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "SEO Audit Pro", path: "/seo-audit-pro" },
  { label: "Shop", path: "/shop" },
  { label: "Contact", path: "/contactus" },
];

export const ALL_ROUTES = [
  ...TOP_LINKS,
  ...NAV_GROUPS.flatMap((g) => g.children),
];

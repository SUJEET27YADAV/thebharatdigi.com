import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Bharat Digital",
    short_name: "TBD",
    description:
      "Premium Web Development Company offering SEO, e-commerce solutions, IT support & more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png" },
    ],
  };
}

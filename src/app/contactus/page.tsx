import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | The Bharat Digital",
  description: "Get in touch with The Bharat Digital for web development, SEO audit tools, e-commerce solutions, and IT support. Free consultation available 24/7.",
};

export default function Page() {
  return <ContactPage />;
}

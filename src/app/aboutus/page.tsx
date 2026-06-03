import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us | The Bharat Digital",
  description: "Learn about The Bharat Digital — a premium web development company with 500+ projects delivered since 2015. Our mission, values, and journey in digital excellence.",
};

export default function Page() {
  return <AboutPage />;
}

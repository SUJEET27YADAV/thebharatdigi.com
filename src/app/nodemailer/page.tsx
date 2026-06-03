import type { Metadata } from "next";
import NodemailerPage from "./NodemailerPage";

export const metadata: Metadata = {
  title: "Nodemailer Email Testing Tool | The Bharat Digital",
  description: "Test and debug your SMTP email integration with our interactive nodemailer demo. Add recipients, compose emails, and send test emails.",
};

export default function Page() {
  return <NodemailerPage />;
}

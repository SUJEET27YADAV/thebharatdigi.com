import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Business Automation Services | CRM & Workflow Automation | The Bharat Digital",
  description:
    "Automate your business workflows with CRM integrations, Zapier/Make automations, and custom scripts. Save time and reduce errors.",
};

const SERVICE_DATA = {
  title: "Automation",
  subtitle: "Business Automation — CRM, Workflows, and No-Code Systems",
  description: `Stop wasting time on repetitive tasks. We build automations that connect your tools, streamline your workflows, and free your team to focus on what matters. From simple email sequences to complex multi-system integrations, we handle the technical heavy lifting.

Our automation philosophy: start simple, measure impact, and layer complexity only when it pays off. We use a mix of no-code tools (Zapier, Make) for speed and custom scripts for the 20% of cases where off-the-shelf doesn't cut it.`,
  subServices: [
    { title: "CRM Automation", description: "Lead capture, follow-up sequences, deal stage updates, activity logging" },
    { title: "Email & Marketing Automation", description: "Welcome sequences, drip campaigns, abandoned cart recovery" },
    { title: "Invoice & Billing Automation", description: "Auto-generate invoices, payment reminders, reconciliation" },
    { title: "Social Media Scheduling", description: "Cross-platform posting, content calendars, analytics aggregation" },
    { title: "Data Sync & Integration", description: "Keep tools in sync — CRMs, accounting, project management, analytics" },
    { title: "Custom Script Automation", description: "Python/Node.js scripts for bespoke business logic no platform can handle" },
  ],
  techStack: ["Zapier", "Make (Integromat)", "n8n", "Python", "Node.js", "HubSpot API", "Google Apps Script", "WhatsApp API"],
  process: [
    { step: "01", title: "Audit", desc: "Map your current workflows, identify bottlenecks, and calculate potential time savings." },
    { step: "02", title: "Design", desc: "Blueprint the automated workflow with inputs, triggers, and fallbacks documented." },
    { step: "03", title: "Build", desc: "Configure no-code tools or write custom scripts. Test with real data." },
    { step: "04", title: "Deploy", desc: "Go live with monitoring. We watch the first week to catch edge cases." },
    { step: "05", title: "Optimize", desc: "Review performance metrics and refine for maximum efficiency." },
  ],
  portfolioItems: [
    { name: "CRM Integration", desc: "Automated lead capture from 5 sources into HubSpot with enrichment" },
  ],
  slug: "automation" as const,
};

export default function AutomationPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["automation"]} />;
}

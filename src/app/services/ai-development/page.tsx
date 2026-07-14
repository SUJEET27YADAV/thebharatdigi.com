import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "AI Development Company | Generative AI Solutions | The Bharat Digital",
  description:
    "Custom AI development services including ChatGPT integration, RAG pipelines, AI chatbots, and automation. Based in Noida, serving India.",
};

const SERVICE_DATA = {
  title: "AI Development",
  subtitle: "AI-Assisted App Development & Generative AI Solutions",
  description: `Integrate AI into your product the right way. Whether you need a ChatGPT-powered chatbot, a RAG pipeline that answers questions from your documents, or custom model fine-tuning, we build production-ready AI features that actually work.

We focus on practical AI — not hype. Every AI feature we build solves a real business problem: reducing support tickets, automating data entry, generating personalized content, or powering intelligent search.`,
  subServices: [
    { title: "AI Chatbots", description: "Customer support bots, lead qualification, WhatsApp/website integration" },
    { title: "RAG Pipelines", description: "Document Q&A, knowledge bases, internal wikis with source citations" },
    { title: "Content Generation", description: "Blog writing, product descriptions, ad copy, personalized emails" },
    { title: "Data Extraction", description: "Invoice parsing, form processing, document classification" },
    { title: "Recommendation Engines", description: "Personalized product/content recommendations based on user behavior" },
    { title: "Custom Model Fine-tuning", description: "Domain-specific models trained on your data for specialized tasks" },
  ],
  techStack: ["OpenAI GPT-4o", "Claude", "Llama", "LangChain", "Pinecone", "Python", "FastAPI", "Next.js"],
  process: [
    { step: "01", title: "Use Case Discovery", desc: "We identify the highest-ROI AI opportunities in your business." },
    { step: "02", title: "Proof of Concept", desc: "A working prototype with your real data to validate accuracy and performance." },
    { step: "03", title: "Production Build", desc: "Scalable architecture with monitoring, rate limiting, and cost controls." },
    { step: "04", title: "Integration", desc: "Connect AI features into your existing product with clean APIs." },
    { step: "05", title: "Monitor & Optimize", desc: "Track quality, costs, and user satisfaction. Retrain and improve over time." },
  ],
  portfolioItems: [
    { name: "AI Customer Support Bot", desc: "Reduced support tickets by 40% with intelligent chatbot" },
  ],
  slug: "ai-development" as const,
};

export default function AiDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["ai-development"]} />;
}

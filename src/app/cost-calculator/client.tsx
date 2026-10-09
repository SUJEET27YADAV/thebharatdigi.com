"use client";

import { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Bot,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  Users,
  IndianRupee,
  DollarSign,
  Store,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  MessageSquare,
  Building2,
  Rocket,
  Check,
} from "lucide-react";

export type Region = "IN" | "GLOBAL";
export type BusinessTier = "local" | "growth" | "enterprise";

interface CalculatorState {
  region: Region;
  businessTier: BusinessTier;
  projectType: string | null;
  features: string[];
  timeline: "standard" | "fast" | "urgent";
  hasDesign: boolean;
  needsBackend: boolean;
  needsSeoSetup: boolean;
}

type CalculatorAction =
  | { type: "SET_REGION"; payload: Region }
  | { type: "SET_BUSINESS_TIER"; payload: BusinessTier }
  | { type: "SET_PROJECT_TYPE"; payload: string }
  | { type: "TOGGLE_FEATURE"; payload: string }
  | { type: "SET_TIMELINE"; payload: CalculatorState["timeline"] }
  | { type: "SET_HAS_DESIGN"; payload: boolean }
  | { type: "SET_NEEDS_BACKEND"; payload: boolean }
  | { type: "SET_NEEDS_SEO_SETUP"; payload: boolean }
  | { type: "RESET" };

const PROJECT_TYPES = [
  {
    id: "landing",
    label: "Local Business / Landing Page",
    sublabel: "Local shops, clinics, portfolios & lead funnels",
    icon: Store,
    badge: "Most Affordable",
  },
  {
    id: "website",
    label: "Corporate Business Website",
    sublabel: "Multi-page brand site with CMS & blog",
    icon: Globe,
    badge: "Popular",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Online Store",
    sublabel: "D2C store, payment gateways, product catalog",
    icon: ShoppingCart,
    badge: "High ROI",
  },
  {
    id: "webapp",
    label: "Web App / SaaS Platform",
    sublabel: "Full-stack web application with dashboard & auth",
    icon: Layers,
    badge: "Scalable",
  },
  {
    id: "mobile",
    label: "Mobile App & Games",
    sublabel: "iOS & Android cross-platform React Native / Flutter",
    icon: Smartphone,
    badge: "Cross-Platform",
  },
  {
    id: "ai",
    label: "AI & Automation Solution",
    sublabel: "AI agents, smart chatbots, RAG & workflow automation",
    icon: Bot,
    badge: "Trending 2026",
  },
];

// Base Prices per region
const BASE_PRICES: Record<Region, Record<string, number>> = {
  IN: {
    landing: 7999, // ₹7,999 (~$95) - highly affordable for local shops & freelancers
    website: 19999, // ₹19,999 (~$240) - standard business website
    ecommerce: 34999, // ₹34,999 (~$420) - complete online store
    webapp: 49999, // ₹49,999 (~$600) - custom SaaS/MVP
    mobile: 69999, // ₹69,999 (~$840) - iOS/Android app
    ai: 44999, // ₹44,999 (~$540) - AI integration
  },
  GLOBAL: {
    landing: 299, // $299 USD
    website: 699, // $699 USD
    ecommerce: 1299, // $1,299 USD
    webapp: 1799, // $1,799 USD
    mobile: 2499, // $2,499 USD
    ai: 1999, // $1,999 USD
  },
};

// Features with costs per region
const FEATURES: Record<
  string,
  { id: string; label: string; inrCost: number; usdCost: number; desc: string }[]
> = {
  landing: [
    {
      id: "whatsapp-btn",
      label: "WhatsApp & Call Click-to-Chat",
      inrCost: 1500,
      usdCost: 40,
      desc: "Instant customer connection on WhatsApp",
    },
    {
      id: "local-seo",
      label: "Google Business & Local Map SEO",
      inrCost: 3500,
      usdCost: 90,
      desc: "Rank in 'near me' local search searches",
    },
    {
      id: "contact-form",
      label: "Lead Capture Form + Email Alerts",
      inrCost: 2000,
      usdCost: 50,
      desc: "Instant notification on every enquiry",
    },
    {
      id: "speed-boost",
      label: "Super-Fast Page Speed (<1s load)",
      inrCost: 2500,
      usdCost: 60,
      desc: "Core Web Vitals 95+ score guarantee",
    },
    {
      id: "domain-hosting",
      label: "Domain & 1 Year Cloud Setup",
      inrCost: 3000,
      usdCost: 80,
      desc: "Zero technical hassle setup",
    },
  ],
  website: [
    {
      id: "cms",
      label: "Headless CMS (Edit Text & Images)",
      inrCost: 8000,
      usdCost: 180,
      desc: "Easily update content without coding",
    },
    {
      id: "seo-package",
      label: "Complete On-Page SEO Optimization",
      inrCost: 6000,
      usdCost: 150,
      desc: "Schema tags, sitemaps, open graph metadata",
    },
    {
      id: "blog",
      label: "Blog Engine for Organic Traffic",
      inrCost: 5000,
      usdCost: 120,
      desc: "Publish articles to rank on Google",
    },
    {
      id: "multilingual",
      label: "Multi-Language Localization",
      inrCost: 9000,
      usdCost: 200,
      desc: "Reach audiences in multiple languages",
    },
    {
      id: "analytics",
      label: "Analytics & Conversion Tracking",
      inrCost: 4000,
      usdCost: 90,
      desc: "Google Analytics 4 & heatmaps integration",
    },
    {
      id: "animations",
      label: "Modern Interactive UI Animations",
      inrCost: 5000,
      usdCost: 120,
      desc: "Smooth Framer Motion micro-interactions",
    },
  ],
  ecommerce: [
    {
      id: "payments",
      label: "Payment Gateways (Razorpay/PhonePe/Stripe)",
      inrCost: 7000,
      usdCost: 180,
      desc: "UPI, Cards, NetBanking, PayPal, Apple Pay",
    },
    {
      id: "inventory",
      label: "Inventory & Stock Management",
      inrCost: 9000,
      usdCost: 220,
      desc: "Real-time stock alerts and variant control",
    },
    {
      id: "coupons",
      label: "Discount Codes & Promotions Engine",
      inrCost: 5000,
      usdCost: 120,
      desc: "Percentage & flat discount vouchers",
    },
    {
      id: "order-tracking",
      label: "Live Order Tracking & Shiprocket/DHL",
      inrCost: 8000,
      usdCost: 190,
      desc: "Automated courier tracking updates",
    },
    {
      id: "reviews",
      label: "Customer Reviews & Photo Ratings",
      inrCost: 4500,
      usdCost: 110,
      desc: "Build social proof with verified reviews",
    },
    {
      id: "abandoned-cart",
      label: "Abandoned Cart Recovery System",
      inrCost: 6000,
      usdCost: 150,
      desc: "Recover lost sales via automated emails",
    },
  ],
  webapp: [
    {
      id: "auth-roles",
      label: "Authentication & Role-Based Access",
      inrCost: 12000,
      usdCost: 280,
      desc: "JWT, OAuth Google/GitHub, Admin/User roles",
    },
    {
      id: "custom-dashboard",
      label: "Interactive Analytics Dashboard",
      inrCost: 15000,
      usdCost: 350,
      desc: "Data charts, metrics, export CSV/PDF",
    },
    {
      id: "billing-saas",
      label: "Recurring Subscription Billing (Stripe/Razorpay)",
      inrCost: 14000,
      usdCost: 320,
      desc: "Tiered SaaS pricing, invoices, webhooks",
    },
    {
      id: "rest-api",
      label: "Scalable REST / GraphQL API",
      inrCost: 12000,
      usdCost: 280,
      desc: "Clean API with rate limiting & docs",
    },
    {
      id: "realtime-socket",
      label: "Real-Time WebSockets & Notifications",
      inrCost: 10000,
      usdCost: 240,
      desc: "Live in-app notifications and chat",
    },
    {
      id: "admin-crm",
      label: "Super Admin Management Console",
      inrCost: 15000,
      usdCost: 350,
      desc: "User management, telemetry & system controls",
    },
  ],
  mobile: [
    {
      id: "push-notify",
      label: "Push Notifications (OneSignal/Firebase)",
      inrCost: 7000,
      usdCost: 160,
      desc: "Re-engage players and users on phone",
    },
    {
      id: "in-app-voice",
      label: "In-Game Audio / Voice Chat",
      inrCost: 18000,
      usdCost: 400,
      desc: "Push-to-talk voice notes & audio player",
    },
    {
      id: "in-app-purchases",
      label: "In-App Purchases & Wallet Coin Economy",
      inrCost: 15000,
      usdCost: 350,
      desc: "Google Play Billing & Apple StoreKit",
    },
    {
      id: "ads-integration",
      label: "Google AdMob Ads & Rewarded Videos",
      inrCost: 9000,
      usdCost: 200,
      desc: "Banner, interstitial & rewarded video ads",
    },
    {
      id: "offline-sync",
      label: "Offline Storage & Auto Sync",
      inrCost: 8000,
      usdCost: 190,
      desc: "Local SQLite caching with cloud sync",
    },
    {
      id: "store-publishing",
      label: "App Store & Play Store Submission",
      inrCost: 6000,
      usdCost: 150,
      desc: "AAB/IPA build, screenshots & approval support",
    },
  ],
  ai: [
    {
      id: "ai-chatbot",
      label: "Custom AI Support Chatbot (OpenAI/Claude)",
      inrCost: 15000,
      usdCost: 350,
      desc: "24/7 smart assistant trained on your data",
    },
    {
      id: "rag-knowledge",
      label: "RAG Pipeline (Custom Knowledge Base)",
      inrCost: 22000,
      usdCost: 500,
      desc: "Vector embeddings with Pinecone/Supabase",
    },
    {
      id: "ai-automation",
      label: "AI Workflow & Lead Automation",
      inrCost: 14000,
      usdCost: 320,
      desc: "Auto-sort emails, qualify leads, generate reports",
    },
    {
      id: "ai-content",
      label: "AI Copy & Content Generation Engine",
      inrCost: 12000,
      usdCost: 280,
      desc: "Automate blog & product description drafting",
    },
    {
      id: "vision-ai",
      label: "Image / Document OCR AI Analysis",
      inrCost: 16000,
      usdCost: 380,
      desc: "Extract text & data from PDF/Images",
    },
  ],
};

const TIER_MULTIPLIERS: Record<BusinessTier, { multiplier: number; label: string; desc: string }> = {
  local: {
    multiplier: 0.85,
    label: "Small & Local Business",
    desc: "Budget-conscious, rapid turnaround, clean essentials",
  },
  growth: {
    multiplier: 1.0,
    label: "Growth Startup / SME",
    desc: "Full-scale custom engineering, scalable architecture",
  },
  enterprise: {
    multiplier: 1.35,
    label: "Enterprise & Global Brand",
    desc: "High security, multi-region cloud, dedicated SLA",
  },
};

const TIMELINE_MULTIPLIER = { standard: 1.0, fast: 1.2, urgent: 1.4 };
const TIMELINE_INFO = {
  standard: { label: "Standard Delivery", days: "2–4 Weeks", desc: "Balanced pacing & testing" },
  fast: { label: "Fast-Track Sprint", days: "1–2 Weeks", desc: "Priority developer allocation" },
  urgent: { label: "Urgent Launch MVP", days: "5–7 Days", desc: "All-hands rapid delivery" },
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_BUSINESS_TIER":
      return { ...state, businessTier: action.payload };
    case "SET_PROJECT_TYPE":
      return { ...state, projectType: action.payload, features: [] };
    case "TOGGLE_FEATURE": {
      const exists = state.features.includes(action.payload);
      return {
        ...state,
        features: exists
          ? state.features.filter((f) => f !== action.payload)
          : [...state.features, action.payload],
      };
    }
    case "SET_TIMELINE":
      return { ...state, timeline: action.payload };
    case "SET_HAS_DESIGN":
      return { ...state, hasDesign: action.payload };
    case "SET_NEEDS_BACKEND":
      return { ...state, needsBackend: action.payload };
    case "SET_NEEDS_SEO_SETUP":
      return { ...state, needsSeoSetup: action.payload };
    case "RESET":
      return { ...initialState, region: state.region };
    default:
      return state;
  }
}

const initialState: CalculatorState = {
  region: "IN",
  businessTier: "growth",
  projectType: "landing",
  features: ["whatsapp-btn", "local-seo", "speed-boost"],
  timeline: "standard",
  hasDesign: false,
  needsBackend: true,
  needsSeoSetup: true,
};

function calculateEstimate(state: CalculatorState) {
  if (!state.projectType) return null;

  const isIndia = state.region === "IN";
  const base = BASE_PRICES[state.region][state.projectType];

  const featureList = FEATURES[state.projectType] ?? [];
  const featureCost = state.features.reduce((sum, fid) => {
    const feat = featureList.find((f) => f.id === fid);
    if (!feat) return sum;
    return sum + (isIndia ? feat.inrCost : feat.usdCost);
  }, 0);

  // Discounts & Addons
  const designDiscount = state.hasDesign ? Math.round(base * 0.15) : 0;
  const backendCost =
    state.needsBackend && state.projectType !== "landing" ? Math.round(base * 0.2) : 0;
  const seoBonus = state.needsSeoSetup ? (isIndia ? 2500 : 60) : 0;

  const subtotal = Math.max(
    base * 0.7,
    base + featureCost - designDiscount + backendCost + seoBonus
  );

  const tierMult = TIER_MULTIPLIERS[state.businessTier].multiplier;
  const timeMult = TIMELINE_MULTIPLIER[state.timeline];

  const total = Math.round(subtotal * tierMult * timeMult);
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.15);

  return {
    total,
    low,
    high,
    currencySymbol: isIndia ? "₹" : "$",
    currencyCode: isIndia ? "INR" : "USD",
    timeline: TIMELINE_INFO[state.timeline].days,
    tierLabel: TIER_MULTIPLIERS[state.businessTier].label,
  };
}

export default function CostCalculatorClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const estimate = calculateEstimate(state);
  const selectedFeatures = useMemo(
    () => new Set(state.features),
    [state.features]
  );

  const isIndia = state.region === "IN";

  return (
    <div className="space-y-10">
      {/* Top Region & Currency Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/40">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Select Your Market / Currency
          </div>
          <div className="text-xs text-slate-400">
            Tailored pricing for Indian MSMEs & International Global Businesses
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_REGION", payload: "IN" })}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              isIndia
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" /> India (INR ₹)
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_REGION", payload: "GLOBAL" })}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              !isIndia
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Global / US (USD $)
          </button>
        </div>
      </div>

      {/* Step 1: Business Scale & Tier */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1. Select Your Business Scale
          </h3>
          <span className="text-[11px] text-slate-500">Tier adapts cost to your exact scale</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["local", "growth", "enterprise"] as const).map((tier) => {
            const isSelected = state.businessTier === tier;
            const item = TIER_MULTIPLIERS[tier];
            return (
              <button
                key={tier}
                type="button"
                onClick={() => dispatch({ type: "SET_BUSINESS_TIER", payload: tier })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-indigo-600/10 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm font-extrabold ${isSelected ? "text-indigo-400" : "text-slate-200"}`}>
                    {item.label}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Project Type */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Choose Project Scenario
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PROJECT_TYPES.map(({ id, label, sublabel, icon: Icon, badge }) => {
            const isSelected = state.projectType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => dispatch({ type: "SET_PROJECT_TYPE", payload: id })}
                className={`flex flex-col justify-between p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? "bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border-indigo-500 text-white shadow-xl shadow-indigo-600/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>

                  <h4 className={`text-sm font-extrabold mb-1 ${isSelected ? "text-white" : "text-slate-200"}`}>
                    {label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{sublabel}</p>
                </div>

                <div className="text-xs font-bold text-slate-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                  Starts at {isIndia ? "₹" : "$"}{BASE_PRICES[state.region][id].toLocaleString(isIndia ? "en-IN" : "en-US")}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 3: High-Value Features & Add-ons */}
      {state.projectType && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Customize Features & Add-ons (Optional)
            </h3>
            <span className="text-xs text-indigo-400 font-semibold">
              {state.features.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(FEATURES[state.projectType] ?? []).map((feat) => {
              const isChecked = selectedFeatures.has(feat.id);
              const cost = isIndia ? feat.inrCost : feat.usdCost;

              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => dispatch({ type: "TOGGLE_FEATURE", payload: feat.id })}
                  className={`flex items-start justify-between p-4 rounded-2xl border text-left transition-all ${
                    isChecked
                      ? "bg-indigo-950/20 border-indigo-500/60 text-white shadow-md shadow-indigo-600/5"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 mr-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isChecked ? "bg-indigo-600 text-white" : "border border-slate-700 bg-slate-950"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isChecked ? "text-white" : "text-slate-300"}`}>
                        {feat.label}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {feat.desc}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-indigo-400 shrink-0">
                    +{isIndia ? "₹" : "$"}{cost.toLocaleString(isIndia ? "en-IN" : "en-US")}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 4: Timeline Sprint */}
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          4. Delivery Speed & Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["standard", "fast", "urgent"] as const).map((t) => {
            const isSelected = state.timeline === t;
            const info = TIMELINE_INFO[t];

            return (
              <button
                key={t}
                type="button"
                onClick={() => dispatch({ type: "SET_TIMELINE", payload: t })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-indigo-600/15 border-indigo-500 text-white shadow-md"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-extrabold ${isSelected ? "text-indigo-400" : "text-slate-200"}`}>
                    {info.label}
                  </span>
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div className="text-sm font-black text-white">{info.days}</div>
                <div className="text-[11px] text-slate-400 mt-1">{info.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 5: Cost Reduction Options */}
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          5. Design & Tech Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_HAS_DESIGN", payload: !state.hasDesign })}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
              state.hasDesign
                ? "bg-emerald-950/20 border-emerald-500/50 text-white"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                  state.hasDesign ? "bg-emerald-600 text-white" : "border border-slate-700 bg-slate-950"
                }`}
              >
                {state.hasDesign && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">I already have Figma / UI designs</div>
                <div className="text-[11px] text-emerald-400 font-semibold">Saves 15% on total cost</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "SET_NEEDS_SEO_SETUP", payload: !state.needsSeoSetup })}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
              state.needsSeoSetup
                ? "bg-indigo-950/20 border-indigo-500/50 text-white"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                  state.needsSeoSetup ? "bg-indigo-600 text-white" : "border border-slate-700 bg-slate-950"
                }`}
              >
                {state.needsSeoSetup && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Include Complete SEO Launch Kit</div>
                <div className="text-[11px] text-indigo-400 font-semibold">Google Indexing + Schema Markup</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Result Estimate Card */}
      {estimate && (
        <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 p-6 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Instant Ballpark Quote
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Estimated Project Investment
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configured for {estimate.tierLabel} ({estimate.currencyCode})
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors self-start md:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Selections
            </button>
          </div>

          {/* Pricing Display */}
          <div className="my-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                {estimate.currencySymbol}
                {estimate.low.toLocaleString(isIndia ? "en-IN" : "en-US")}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-500">–</span>
              <span className="text-3xl sm:text-5xl font-black text-indigo-300">
                {estimate.currencySymbol}
                {estimate.high.toLocaleString(isIndia ? "en-IN" : "en-US")}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              *Transparent fixed-scope estimate. Zero hidden maintenance fees.
            </p>
          </div>

          {/* Project Highlights Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">Timeline</div>
                <div className="font-bold text-slate-200">{estimate.timeline}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">Dedicated Team</div>
                <div className="font-bold text-slate-200">2–4 Specialists</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">Code Warranty</div>
                <div className="font-bold text-slate-200">100% Bug-Free</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">Live Delivery</div>
                <div className="font-bold text-slate-200">Full Source Code</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contactus"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 text-center"
            >
              Lock in This Price &amp; Get Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919999239307"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      )}

      <p className="text-center text-xs text-slate-500">
        Estimated prices are indicative. The Bharat Digital provides formal milestone-based
        proposals with signed NDAs before project kick-off.
      </p>
    </div>
  );
}

"use client";

import { useReducer } from "react";
import {
  Calculator,
  Globe,
  Smartphone,
  ShoppingCart,
  Bot,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Clock,
  Users,
  IndianRupee,
} from "lucide-react";

interface CalculatorState {
  projectType: string | null;
  features: string[];
  complexity: "simple" | "moderate" | "complex";
  timeline: "standard" | "fast" | "urgent";
  hasDesign: boolean;
  needsBackend: boolean;
}

type CalculatorAction =
  | { type: "SET_PROJECT_TYPE"; payload: string }
  | { type: "TOGGLE_FEATURE"; payload: string }
  | { type: "SET_COMPLEXITY"; payload: CalculatorState["complexity"] }
  | { type: "SET_TIMELINE"; payload: CalculatorState["timeline"] }
  | { type: "SET_HAS_DESIGN"; payload: boolean }
  | { type: "SET_NEEDS_BACKEND"; payload: boolean }
  | { type: "RESET" };

const PROJECT_TYPES = [
  { id: "website", label: "Business Website", icon: Globe },
  { id: "webapp", label: "Web App / SaaS", icon: Globe },
  { id: "ecommerce", label: "E-commerce Store", icon: ShoppingCart },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "ai", label: "AI Integration", icon: Bot },
];

const FEATURES: Record<string, { id: string; label: string; cost: number }[]> = {
  website: [
    { id: "cms", label: "CMS Integration", cost: 15000 },
    { id: "contact-form", label: "Contact Forms", cost: 5000 },
    { id: "seo", label: "SEO Optimization", cost: 8000 },
    { id: "analytics", label: "Analytics Dashboard", cost: 12000 },
    { id: "blog", label: "Blog Section", cost: 10000 },
    { id: "multilingual", label: "Multilingual Support", cost: 18000 },
  ],
  webapp: [
    { id: "auth", label: "Authentication", cost: 20000 },
    { id: "dashboard", label: "Dashboard", cost: 30000 },
    { id: "api", label: "REST/GraphQL API", cost: 25000 },
    { id: "payments", label: "Payment Integration", cost: 20000 },
    { id: "notifications", label: "Real-time Notifications", cost: 15000 },
    { id: "admin", label: "Admin Panel", cost: 25000 },
  ],
  ecommerce: [
    { id: "product-catalog", label: "Product Catalog", cost: 20000 },
    { id: "cart", label: "Shopping Cart", cost: 15000 },
    { id: "payments", label: "Payment Gateway", cost: 18000 },
    { id: "inventory", label: "Inventory Management", cost: 22000 },
    { id: "order-tracking", label: "Order Tracking", cost: 12000 },
    { id: "reviews", label: "Reviews & Ratings", cost: 10000 },
  ],
  mobile: [
    { id: "cross-platform", label: "Cross-platform (React Native)", cost: 40000 },
    { id: "push-notifications", label: "Push Notifications", cost: 12000 },
    { id: "offline", label: "Offline Support", cost: 15000 },
    { id: "camera", label: "Camera/Gallery Access", cost: 10000 },
    { id: "maps", label: "Maps & Location", cost: 12000 },
    { id: "payments", label: "In-app Payments", cost: 18000 },
  ],
  ai: [
    { id: "chatbot", label: "AI Chatbot", cost: 35000 },
    { id: "rag", label: "RAG Pipeline", cost: 50000 },
    { id: "content-gen", label: "Content Generation", cost: 30000 },
    { id: "image-gen", label: "Image Generation", cost: 40000 },
    { id: "analytics-ai", label: "AI Analytics", cost: 45000 },
    { id: "automation", label: "Workflow Automation", cost: 25000 },
  ],
};

const BASE_PRICES: Record<string, number> = {
  website: 25000,
  webapp: 60000,
  ecommerce: 45000,
  mobile: 80000,
  ai: 70000,
};

const COMPLEXITY_MULTIPLIER = { simple: 0.8, moderate: 1, complex: 1.4 };
const TIMELINE_MULTIPLIER = { standard: 1, fast: 1.25, urgent: 1.5 };
const TIMELINE_LABELS = { standard: "6-12 weeks", fast: "4-8 weeks", urgent: "2-4 weeks" };

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
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
    case "SET_COMPLEXITY":
      return { ...state, complexity: action.payload };
    case "SET_TIMELINE":
      return { ...state, timeline: action.payload };
    case "SET_HAS_DESIGN":
      return { ...state, hasDesign: action.payload };
    case "SET_NEEDS_BACKEND":
      return { ...state, needsBackend: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState: CalculatorState = {
  projectType: null,
  features: [],
  complexity: "moderate",
  timeline: "standard",
  hasDesign: false,
  needsBackend: true,
};

function calculateEstimate(state: CalculatorState) {
  if (!state.projectType) return null;

  const base = BASE_PRICES[state.projectType];
  const featureCost = state.features.reduce((sum, fid) => {
    const feat = FEATURES[state.projectType!]?.find((f) => f.id === fid);
    return sum + (feat?.cost ?? 0);
  }, 0);

  const designCost = state.hasDesign ? 0 : Math.round(base * 0.2);
  const backendCost = state.needsBackend ? Math.round(base * 0.3) : 0;

  const subtotal = base + featureCost + designCost + backendCost;
  const complexityMult = COMPLEXITY_MULTIPLIER[state.complexity];
  const timelineMult = TIMELINE_MULTIPLIER[state.timeline];
  const total = Math.round(subtotal * complexityMult * timelineMult);

  const low = Math.round(total * 0.85);
  const high = Math.round(total * 1.15);

  return { total, low, high, timeline: TIMELINE_LABELS[state.timeline] };
}

export default function CostCalculatorClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const estimate = calculateEstimate(state);

  return (
    <div className="space-y-8">
      {/* Step 1: Project Type */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          1. Project Type
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PROJECT_TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => dispatch({ type: "SET_PROJECT_TYPE", payload: id })}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                state.projectType === id
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-500/10 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-zinc-300"
              }`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Features */}
      {state.projectType && (
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            2. Features (optional)
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(FEATURES[state.projectType] ?? []).map((feat) => (
              <button
                key={feat.id}
                onClick={() => dispatch({ type: "TOGGLE_FEATURE", payload: feat.id })}
                className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${
                  state.features.includes(feat.id)
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  {state.features.includes(feat.id) && (
                    <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                  {feat.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-500">+₹{(feat.cost / 1000).toFixed(0)}K</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 3: Complexity */}
      {state.projectType && (
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            3. Complexity
          </h3>
          <div className="flex gap-3">
            {(["simple", "moderate", "complex"] as const).map((level) => (
              <button
                key={level}
                onClick={() => dispatch({ type: "SET_COMPLEXITY", payload: level })}
                className={`flex-1 rounded-xl border p-4 text-center text-sm font-medium capitalize transition-all ${
                  state.complexity === level
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 4: Timeline */}
      {state.projectType && (
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            4. Timeline
          </h3>
          <div className="flex gap-3">
            {(["standard", "fast", "urgent"] as const).map((t) => (
              <button
                key={t}
                onClick={() => dispatch({ type: "SET_TIMELINE", payload: t })}
                className={`flex-1 rounded-xl border p-4 text-center text-sm font-medium capitalize transition-all ${
                  state.timeline === t
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                <Clock className="mx-auto mb-1 h-4 w-4" />
                {t}
                <span className="mt-1 block text-xs text-slate-500 dark:text-zinc-500">{TIMELINE_LABELS[t]}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 5: Options */}
      {state.projectType && (
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            5. Additional Options
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => dispatch({ type: "SET_HAS_DESIGN", payload: !state.hasDesign })}
              className={`flex-1 rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                state.hasDesign
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
              }`}
            >
              <CheckCircle className={`mb-1 h-4 w-4 ${state.hasDesign ? "text-indigo-600 dark:text-indigo-400" : "text-slate-300 dark:text-zinc-600"}`} />
              I already have design files
            </button>
            <button
              onClick={() => dispatch({ type: "SET_NEEDS_BACKEND", payload: !state.needsBackend })}
              className={`flex-1 rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                state.needsBackend
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
              }`}
            >
              <CheckCircle className={`mb-1 h-4 w-4 ${state.needsBackend ? "text-indigo-600 dark:text-indigo-400" : "text-slate-300 dark:text-zinc-600"}`} />
              Needs backend / database
            </button>
          </div>
        </section>
      )}

      {/* Result */}
      {estimate && (
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 sm:p-8 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-purple-500/10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Estimated Cost</h3>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              ₹{estimate.low.toLocaleString("en-IN")} – ₹{estimate.high.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              {estimate.timeline}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              2–4 developers
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Final quote may vary
            </span>
          </div>

          <a
            href="/contactus"
            className="btn-primary w-full sm:w-auto"
          >
            Get Exact Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      )}

      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-500 dark:text-zinc-600">
        This is an estimate based on typical projects. Final pricing depends on exact requirements, scope changes, and technology choices.
      </p>
    </div>
  );
}

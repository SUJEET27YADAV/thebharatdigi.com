import type { Metadata } from "next";
import Link from "next/link";
import {
  Gamepad2,
  Mic,
  Trophy,
  Coins,
  Crown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Download,
  Users,
  Flame,
  CheckCircle2,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bingo Clash Live: Voice & PvP | Real-Time Multiplayer Bingo by The Bharat Digital",
  description:
    "Play Bingo Clash Live: Voice & PvP! Fast-paced 1-25 grid turns, 75-Ball auto-caller, in-game push-to-talk voice notes, and 175% instant winner rewards. Download for iOS & Android.",
  alternates: {
    canonical: "https://thebharatdigi.com/games/bingo-clash-live",
  },
  openGraph: {
    title: "Bingo Clash Live: Voice & PvP | Multiplayer Mobile Game",
    description:
      "Play real-time multiplayer Bingo with in-game voice chat, 1-25 PvP battles, 75-Ball auto caller, and 175% winner prizes. Published by The Bharat Digital.",
    url: "https://thebharatdigi.com/games/bingo-clash-live",
    siteName: "The Bharat Digital Games",
    type: "website",
  },
};

export default function BingoClashLivePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bingo Clash Live: Voice & PvP",
    operatingSystem: "ANDROID, IOS",
    applicationCategory: "GameApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    author: {
      "@type": "Organization",
      name: "The Bharat Digital (TBD)",
      url: "https://thebharatdigi.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
    },
  };

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-indigo-500 selection:text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Published by</span>
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-300 font-bold underline decoration-indigo-400/30"
            >
              The Bharat Digital (TBD)
            </Link>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            BINGO CLASH LIVE{" "}
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Voice & PvP Battles
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Experience real-time multiplayer Bingo with{" "}
            <strong className="text-white">Push-to-Talk Voice Notes</strong>, lightning-fast 15s{" "}
            <strong className="text-white">1-25 Grid PvP turns</strong>, 75-Ball auto-caller, and{" "}
            <strong className="text-emerald-400">175% Instant Winner Rewards</strong> with zero
            forced ads!
          </p>

          {/* Download CTA Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:scale-105 cursor-pointer">
              <Download className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] text-indigo-200 uppercase font-semibold">
                  Get it on
                </div>
                <div className="text-sm font-black">Google Play Store</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold text-sm shadow-xl hover:border-slate-500 transition-all hover:scale-105 cursor-pointer">
              <Download className="w-5 h-5 text-slate-300" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Download on
                </div>
                <div className="text-sm font-black">Apple App Store</div>
              </div>
            </div>
          </div>

          {/* Feature Highlights Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" /> In-Game Voice
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> 175% Win Prize
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-2">
              <Crown className="w-4 h-4 text-pink-400" /> 1.5x VIP Coins
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Forced Ads
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-2">
            Why Gamers Love It
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Built for Thrill, Speed & Social Gaming
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1-25 PvP */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl shadow-black/50 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-white mb-3">
                1-25 Turn-Based PvP Grid
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Take turns with rivals in 1v1 and group duels on a 15-second timer. Mark called
                numbers on your 5x5 card. Complete 5 lines (horizontal, vertical, diagonal) to spell
                B-I-N-G-O and claim victory!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-bold text-indigo-400 flex items-center gap-1">
              Entry: 20 Coins &rarr; Winner Gets 35 Coins
            </div>
          </div>

          {/* Card 2: Voice Notes */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl shadow-black/50 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-white mb-3">
                Push-to-Talk Voice Notes
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Chat naturally with friends and opponents. Hold the in-game mic to record and send
                high-clarity audio notes. Includes live audio waveforms and quick emoji reaction
                bursts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-bold text-purple-400 flex items-center gap-1">
              Real-time Social Interaction
            </div>
          </div>

          {/* Card 3: 75-Ball & Fair Economy */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl shadow-black/50 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-white mb-3">
                75-Ball Classic & Instant Wins
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enjoy automated ball hopper draws every 4 seconds. Daub your ticket and claim
                BINGO. All prizes are credited instantly to your cloud coin wallet with ZERO mandatory
                ads for winners.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1">
              Entry: 30 Coins &rarr; Winner Gets 53 Coins
            </div>
          </div>
        </div>
      </section>

      {/* VIP & Ad-Free Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/30 p-8 sm:p-12 text-center">
          <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            VIP Elite Pass: 100% Ad-Free + 1.5x Coins
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-8">
            Upgrade for ₹100/month or ₹900/year to completely remove all banner and interstitial
            ads, receive a permanent <strong className="text-amber-300">1.5x Coin Multiplier</strong>{" "}
            on every recharge, and get up to 6,000 bonus coins!
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <span className="px-4 py-2 bg-slate-900/80 border border-amber-500/30 rounded-xl text-amber-300">
              ₹100 / month (+500 Bonus Coins)
            </span>
            <span className="px-4 py-2 bg-slate-900/80 border border-emerald-500/30 rounded-xl text-emerald-300">
              ₹900 / year (Save upto 25% + 6,000 Bonus Coins)
            </span>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-slate-800 text-center relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            The Bharat Digital Home
          </Link>
          <span>•</span>
          <Link
            href="/games/bingo-clash-live/privacy"
            className="hover:text-white transition-colors text-indigo-400"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/contactus" className="hover:text-white transition-colors">
            Contact & Game Support
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          Bingo Clash Live: Voice & PvP &copy; 2026{" "}
          <strong className="text-slate-400">The Bharat Digital (TBD)</strong>. All Rights
          Reserved.
        </p>
      </footer>
    </main>
  );
}

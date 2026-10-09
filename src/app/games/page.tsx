import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Trophy, Mic, ArrowRight, Download, Sparkles, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile Games & Apps Studio | The Bharat Digital",
  description:
    "Explore mobile games and real-time multiplayer apps developed and published by The Bharat Digital (TBD). Play Bingo Clash Live on iOS & Android.",
  alternates: {
    canonical: "https://thebharatdigi.com/games",
  },
};

export default function GamesHubPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-4">
            <Gamepad2 className="w-4 h-4 text-indigo-400" /> TBD Games & Mobile Apps Studio
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Multiplayer Games for Global Players
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Real-time cross-platform games with instant voice chat, fair coin economy, and high-speed
            matchmaking, crafted by The Bharat Digital.
          </p>
        </div>

        {/* Featured Game: Bingo Clash Live */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Game Icon */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-black text-white text-5xl shadow-2xl shadow-indigo-600/40 shrink-0">
                B
              </div>

              {/* Game Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> FEATURED RELEASE
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Bingo Clash Live: Voice & PvP
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  Turn-based 1-25 Grid PvP battles, 75-Ball classic auto-caller, in-game push-to-talk
                  voice notes, and 175% instant coin prize payouts with zero mandatory ads!
                </p>

                {/* Badges and CTA */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Link
                    href="/games/bingo-clash-live"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                  >
                    View Game & Download <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/games/bingo-clash-live/privacy"
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

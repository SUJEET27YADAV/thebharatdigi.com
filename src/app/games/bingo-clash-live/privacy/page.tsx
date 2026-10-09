import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Mic, Tv, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Bingo Clash Live - The Bharat Digital",
  description:
    "Privacy Policy for Bingo Clash Live: Voice & PvP multiplayer mobile game, developed and published by The Bharat Digital (TBD).",
  alternates: {
    canonical: "https://thebharatdigi.com/games/bingo-clash-live/privacy",
  },
};

export default function BingoPrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/games/bingo-clash-live"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bingo Clash Live
        </Link>

        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official Game Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy for Bingo Clash Live
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last Updated: October 2026 • Published by{" "}
            <strong className="text-indigo-300">The Bharat Digital (TBD)</strong>
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" /> 1. Introduction & Developer Information
            </h2>
            <p>
              Welcome to <strong>Bingo Clash Live: Voice & PvP</strong> (&quot;the App&quot;),
              developed, operated, and published by{" "}
              <strong>The Bharat Digital (TBD)</strong> (&quot;Company&quot;, &quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;), available at{" "}
              <a
                href="https://thebharatdigi.com"
                className="text-indigo-400 underline font-semibold"
              >
                https://thebharatdigi.com
              </a>
              . We are committed to protecting your privacy and ensuring a safe, fair, and fun
              gaming environment for all players.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Mic className="w-5 h-5 text-purple-400" /> 2. Microphone & Voice Notes Permission
            </h2>
            <p className="mb-3">
              Bingo Clash Live features an interactive Push-to-Talk Voice Notes capability inside
              multiplayer game rooms.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong>Permission Usage:</strong> We request access to your device microphone (
                <code className="text-indigo-300">RECORD_AUDIO</code>) solely to allow you to
                record and transmit short push-to-talk audio clips to fellow room participants.
              </li>
              <li>
                <strong>No Continuous Listening:</strong> The microphone is activated{" "}
                <em>only</em> while you physically hold down the in-game recording button.
              </li>
              <li>
                <strong>Audio Storage:</strong> Voice note recordings are stored temporarily on
                our secure servers only for the duration of the active game room session and are
                never sold, monetized, or shared with external third parties.
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Tv className="w-5 h-5 text-blue-400" /> 3. Advertising & AdMob Policy
            </h2>
            <p className="mb-3">
              We integrate Google AdMob to display banner ads, interstitial ads, and optional
              rewarded video ads that grant free in-game coins.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong>Ad-Free Exemption:</strong> Users who subscribe to VIP Membership or
                receive administrative ad-free status have all banner and interstitial advertising
                completely suppressed.
              </li>
              <li>
                <strong>No Forced Ads for Winners:</strong> Game winners are never subjected to
                mandatory ads to claim their prizes.
              </li>
              <li>
                <strong>Ad Identifiers:</strong> Google AdMob may collect pseudonymous device
                identifiers (such as Google Advertising ID or IDFA) in accordance with Google&apos;s
                Privacy Policy.
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" /> 4. In-Game Coin Economy & Wallet
            </h2>
            <p>
              In-game coins are virtual game points utilized for room entry and rewards. The app
              maintains a real-time ledger of game participation, recharges, and ad rewards on our
              cloud servers to prevent fraudulent behavior and ensure game fairness.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">5. Data Deletion & Contact Us</h2>
            <p className="mb-3">
              You have the right to request deletion of your account and all associated game data at
              any time.
            </p>
            <p>
              For privacy inquiries, account data deletion, or support, please contact us at:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <p className="font-bold text-slate-200">The Bharat Digital (TBD) - Game Studio</p>
              <p className="text-slate-400">Game Support: <a href="mailto:support@thebharatdigi.com" className="text-indigo-400 font-semibold">support@thebharatdigi.com</a></p>
              <p className="text-slate-400">Legal &amp; Privacy: <a href="mailto:admin@thebharatdigi.com" className="text-indigo-400 font-semibold">admin@thebharatdigi.com</a></p>
              <p className="text-slate-400">General Inquiries: <a href="mailto:info@thebharatdigi.com" className="text-indigo-400 font-semibold">info@thebharatdigi.com</a></p>
              <p className="text-slate-400">Official Website: <a href="https://thebharatdigi.com" className="text-indigo-400">https://thebharatdigi.com</a></p>
              <p className="text-slate-400">Studio Address: Sector-37, Noida, Uttar Pradesh, India - 201301</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

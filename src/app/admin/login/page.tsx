"use client";

import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hashPassword } from "@/utils/admin/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-xl border border-[#444444] shadow-xl shadow-black/30 dark:shadow-white/30 bg-slate-200/60 dark:bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-2 text-center tracking-wide">
          Admin Panel
        </h1>
        {/* {hashPassword("Mahadev#tru3QAZXSW")} */}
        <p className="text-center mb-8 text-sm">
          Sign in to manage your business
        </p>

        {error && (
          <div className="p-3 rounded mb-6 text-sm bg-[#fb2c36] text-white">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded text-sm outline-none border border-[#444444] focus:ring-2 focus:border-[#ac4bff] placeholder:text-[#888888]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded text-sm outline-none border border-[#444444] focus:ring-2 focus:border-[#ac4bff] placeholder:text-[#888888]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded font-medium transition-opacity text-sm mt-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-blue-500/70 disabled:hover:bg-blue-500/70 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 text-xs">
          <span>Need help?{"  "}</span>
          <Link
            href="/"
            className="text-[#ac4bff] hover:underline text-decoration-none"
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

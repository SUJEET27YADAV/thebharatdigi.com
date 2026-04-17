// components/HeroBg.tsx
"use client";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroBg() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // Colors based on theme
  const colors = {
    bg1: dark ? "#0f0a1f" : "#f8fafc",
    bg2: dark ? "#050208" : "#e2e8f0",
    planet: dark ? "#6366f1" : "#818cf8",
    planetOpacity: dark ? 0.4 : 0.6,
    moon: dark ? "#1e1b4b" : "#c7d2fe",
    circuit: dark ? 0.8 : 0.5,
    node: dark ? "#818cf8" : "#6366f1",
    star: dark ? "#ffffff" : "#6366f1",
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full transition-all duration-500"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="heroBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={colors.bg1} />
          <stop offset="100%" stopColor={colors.bg2} />
        </radialGradient>

        <radialGradient id="planetGrad" cx="35%" cy="35%" r="60%">
          <stop
            offset="0%"
            stopColor={colors.planet}
            stopOpacity={colors.planetOpacity}
          />
          <stop offset="100%" stopColor={colors.planet} stopOpacity={0.1} />
        </radialGradient>

        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="circuit1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
          <stop offset="50%" stopColor="#818cf8" stopOpacity={colors.circuit} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="circuit2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
          <stop
            offset="50%"
            stopColor="#a78bfa"
            stopOpacity={colors.circuit * 0.9}
          />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="circuit3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop
            offset="50%"
            stopColor="#22d3ee"
            stopOpacity={colors.circuit * 0.7}
          />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="circuit4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
          <stop
            offset="50%"
            stopColor="#f472b6"
            stopOpacity={colors.circuit * 0.7}
          />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="planetGlow">
          <feGaussianBlur stdDeviation="30" />
        </filter>

        <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.bg2} />
          <stop offset="100%" stopColor={colors.bg2} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.bg2} stopOpacity="0" />
          <stop offset="100%" stopColor={colors.bg2} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="1920" height="1080" fill="url(#heroBg)" />

      {/* Stars - visible in dark mode */}
      {dark && (
        <g fill={colors.star}>
          <circle cx="120" cy="80" r="1" opacity="0.6" />
          <circle cx="350" cy="150" r="0.8" opacity="0.5" />
          <circle cx="580" cy="60" r="1.2" opacity="0.7" />
          <circle cx="820" cy="120" r="0.8" opacity="0.4" />
          <circle cx="1100" cy="80" r="1" opacity="0.6" />
          <circle cx="1400" cy="140" r="0.8" opacity="0.5" />
          <circle cx="1650" cy="70" r="1.1" opacity="0.6" />
          <circle cx="1820" cy="130" r="0.7" opacity="0.4" />
          <circle cx="200" cy="300" r="0.8" opacity="0.4" />
          <circle cx="1750" cy="350" r="1" opacity="0.5" />
          <circle cx="100" cy="600" r="0.9" opacity="0.5" />
          <circle cx="1850" cy="650" r="0.8" opacity="0.4" />
          <circle cx="180" cy="900" r="1" opacity="0.6" />
          <circle cx="750" cy="950" r="1.1" opacity="0.5" />
          <circle cx="1500" cy="930" r="1" opacity="0.6" />
        </g>
      )}

      {/* Light mode decorative circles */}
      {!dark && (
        <g>
          <circle cx="200" cy="200" r="100" fill="#e0e7ff" opacity="0.5" />
          <circle cx="1700" cy="300" r="150" fill="#ede9fe" opacity="0.4" />
          <circle cx="300" cy="800" r="120" fill="#fce7f3" opacity="0.3" />
        </g>
      )}

      {/* Planet glow */}
      <circle
        cx="1500"
        cy="250"
        r="180"
        fill={colors.planet}
        opacity={dark ? 0.15 : 0.2}
        filter="url(#planetGlow)"
      />

      {/* Planet */}
      <circle cx="1500" cy="250" r="120" fill="url(#planetGrad)" />
      <ellipse
        cx="1500"
        cy="250"
        rx="180"
        ry="40"
        fill="none"
        stroke="url(#ring)"
        strokeWidth="2"
        transform="rotate(-20, 1500, 250)"
      />

      {/* Moon */}
      <circle cx="280" cy="750" r="40" fill={colors.moon} opacity="0.4" />

      {/* Circuit paths */}
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#glow)"
      >
        <path
          d="M0,400 Q300,350 500,450 T900,400 Q1100,350 1300,420 T1700,380 L1920,400"
          stroke="url(#circuit1)"
        />
        <path
          d="M0,550 Q250,500 450,580 T850,520 Q1050,460 1250,540 T1650,500 L1920,530"
          stroke="url(#circuit1)"
          opacity="0.6"
        />
        <path
          d="M0,650 Q350,700 600,620 T1000,680 Q1300,740 1500,660 T1920,700"
          stroke="url(#circuit2)"
        />
        <path
          d="M0,300 Q200,250 400,320 T800,280 Q1000,240 1200,300 T1600,270 L1920,290"
          stroke="url(#circuit3)"
          opacity="0.7"
        />
        <path
          d="M0,800 Q300,850 550,780 T950,830 Q1200,880 1450,810 T1920,850"
          stroke="url(#circuit4)"
          opacity="0.7"
        />
        <path
          d="M400,0 Q380,200 420,400 T380,700 Q360,900 400,1080"
          stroke="url(#circuit1)"
          opacity="0.4"
        />
        <path
          d="M960,0 Q1000,250 940,500 T1000,800 Q1040,950 960,1080"
          stroke="url(#circuit2)"
          opacity="0.5"
        />
        <path
          d="M1520,0 Q1480,180 1540,380 T1500,650 Q1460,850 1520,1080"
          stroke="url(#circuit3)"
          opacity="0.4"
        />
      </g>

      {/* Nodes */}
      <g filter="url(#glow)">
        <circle cx="500" cy="450" r="5" fill={colors.node} />
        <circle cx="900" cy="400" r="6" fill="#a78bfa" />
        <circle cx="1300" cy="420" r="5" fill={colors.node} />
        <circle cx="600" cy="620" r="5" fill="#a78bfa" />
        <circle cx="1000" cy="680" r="6" fill="#c4b5fd" />
        <circle cx="1500" cy="660" r="5" fill="#a78bfa" />
        <circle cx="400" cy="320" r="4" fill="#22d3ee" />
        <circle cx="800" cy="280" r="5" fill="#67e8f9" />
        <circle cx="1200" cy="300" r="4" fill="#22d3ee" />
        <circle cx="550" cy="780" r="4" fill="#f472b6" />
        <circle cx="950" cy="830" r="5" fill="#f9a8d4" />
        <circle cx="1450" cy="810" r="4" fill="#f472b6" />
      </g>

      {/* Grid dots */}
      <g fill={colors.node} opacity={dark ? 0.1 : 0.06}>
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={80 + col * 160}
              cy={80 + row * 100}
              r="1"
            />
          )),
        )}
      </g>

      {/* Fades */}
      <rect width="1920" height="150" fill="url(#topFade)" />
      <rect y="950" width="1920" height="130" fill="url(#bottomFade)" />
    </svg>
  );
}

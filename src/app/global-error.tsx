"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#020617", color: "#ffffff", fontFamily: "Inter, system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(251, 44, 54, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <span style={{ fontSize: "24px", color: "#fb2c36" }}>!</span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", color: "#ffffff" }}>Something went wrong</h1>
            <p style={{ color: "#90a1b9", marginBottom: "24px", lineHeight: 1.5 }}>
              A critical error occurred. Please try refreshing the page or come back later.
            </p>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px",
                borderRadius: "4px", fontWeight: 600, border: "none", cursor: "pointer",
                backgroundColor: "#ac4bff", color: "#ffffff", fontSize: "14px"
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function appUrl(fallback = "https://thebharatdigi.com"): string {
  return process.env.NEXT_PUBLIC_APP_URL || fallback;
}

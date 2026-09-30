import type { NextConfig } from "next";

/**
 * The site is fully static: no API routes, no database, no secrets.
 * Integrations: Cal.com's booking widget and Vercel Web Analytics.
 */
const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  // Next injects inline bootstrap scripts; 'unsafe-inline' is required for those.
  // React's development stack traces require eval; production does not.
  `script-src 'self' 'unsafe-inline' https://app.cal.com${isDevelopment ? " 'unsafe-eval'" : ""}`,
  // Tailwind and next/font emit inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // Vercel serves the production analytics script and collection routes on this origin.
  "connect-src 'self'",
  "frame-src https://cal.com https://app.cal.com",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;

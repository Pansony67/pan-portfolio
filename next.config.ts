// next.config.ts
import type { NextConfig } from "next";

// Security headers. This project has no API routes, no forms, and no
// external scripts/fonts/images (everything is self-hosted via
// next/font and local /public assets) - checked before writing this,
// so a fairly strict Content-Security-Policy is safe here without
// breaking anything currently on the site. 'unsafe-inline' is kept for
// script/style because Next.js injects inline hydration data and this
// codebase uses dynamic inline style={{...}} throughout (SWOT radar,
// progress bars, accent colors, etc.) - locking those down would need
// a nonce-based middleware setup, which is more machinery than this
// static portfolio needs right now. img-src also allows blob: because
// PixelBrandIcon.tsx renders the Contact page's brand icons onto a
// canvas via a Blob-URL image (URL.createObjectURL) - without blob:
// here those icons silently fail to load and the canvas stays blank.
//
// 'unsafe-eval' is added to script-src ONLY in development below -
// `next dev` uses eval() for React's Fast Refresh / readable dev-mode
// stack traces, which this CSP was silently blocking (visible as
// console errors, page still worked). React never uses eval() in a
// production build, so production stays without 'unsafe-eval'.
//
// Heads up for later: if/when Google Analytics or Tag Manager gets
// added, connect-src and script-src below will need
// https://www.googletagmanager.com and https://www.google-analytics.com
// added, or GA will get silently blocked by this CSP.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

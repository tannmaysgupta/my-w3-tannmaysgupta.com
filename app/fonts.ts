import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

/**
 * Satoshi is Fontshare-licensed and self-hosted (free for commercial use).
 * Only woff2 is shipped — every browser that runs this site supports it, and
 * dropping the woff fallbacks halves the font payload.
 */
export const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Display face for headings. */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "700", "800"],
});

/** Reserved for long-form reading in /writing. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const fontVariables = `${satoshi.variable} ${jakarta.variable} ${newsreader.variable}`;

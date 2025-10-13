"use client";

import Link from "next/link";
import type { Metadata } from "next";
import { useMemo } from "react";

export const metadata: Metadata = {
  title: "PatternRipple Lab - Free tools and prototypes",
  description:
    "Try our in-browser tools - tile checker, audio processor, slideshow maker - plus the cqs-rs browser simulator. Files are processed client-side where possible.",
  alternates: {
    canonical: "https://www.patternripple.com/lab",
  },
  openGraph: {
    title: "PatternRipple Lab - Free tools and prototypes",
    description:
      "Try our in-browser tools - tile checker, audio processor, slideshow maker - plus the cqs-rs browser simulator.",
    url: "https://www.patternripple.com/lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternRipple Lab - Free tools and prototypes",
    description:
      "Hands-on tools you can use in the browser - no install needed.",
  },
};

type Tool = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  badge?: string;
};

const tools: Tool[] = [
  {
    slug: "cqs-rs-browser-simulator",
    title: "cqs-rs Browser Simulator",
    href: "/cqs_rs_docs.html",
    summary:
      "Run quantum circuits in the browser. JSON program editor, shots control, and on-page results. Matches the Rust project at a demo level. Ops include init, H, X, Y, Z, RX, RY, RZ, CNOT, CZ, measure.", // 
- Seamless Pattern Checker explains rows, columns, and gaps to reveal seams, with supported formats and load from URL. :contentReference[oaicite:2]{index=2}
- Audio Processor states Web Audio API, client-side, fade in-out, normalize, and export to WAV or MP3 with common formats supported. :contentReference[oaicite:3]{index=3}
- Property Slideshow Maker shows aspect ratios, overlay fields, brand color, logo controls, Ken Burns, and export to WebM or GIF or frames ZIP. :contentReference[oaicite:4]{index=4}
::contentReference[oaicite:5]{index=5}

// app/api/search/route.ts
export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

type Searchable = {
  type: "tool";
  title: string;
  description?: string;
  tags?: string[];
  slug: string;
  href: string;
};

function norm(s: unknown) {
  return (s ?? "").toString().toLowerCase();
}

// Software tools searchable index
const tools: Searchable[] = [
  { type: "tool", title: "Colorway Generator", description: "Recolor pattern images across 8 preset hues", slug: "colorway-generator", href: "/colorway-generator.html", tags: ["design", "pattern", "colors"] },
  { type: "tool", title: "Pattern Repeat Engine", description: "Generate seamless pattern tiles with vector motifs", slug: "pattern-repeat-engine", href: "/pattern-repeat-engine.html", tags: ["design", "pattern", "seamless"] },
  { type: "tool", title: "Motif Painter", description: "Browser-based paint tool for creating custom motifs", slug: "motif-painter", href: "/motif-painter.html", tags: ["design", "paint", "drawing"] },
  { type: "tool", title: "PNG2SVG Fabric Design Vectorizer", description: "Convert PNG designs to vector SVG for fabric printing", slug: "png2svg", href: "/png2svg.html", tags: ["design", "vector", "svg"] },
  { type: "tool", title: "Seamless Pattern Checker", description: "Preview and validate seamless patterns", slug: "seamless-pattern-checker", href: "/pattern-checker-smoothsnap.html", tags: ["design", "pattern"] },
  { type: "tool", title: "Audio Looper Desktop Edition", description: "Loop audio with adjustable start/end points and tempo", slug: "audio-looper-panek", href: "/audio-looper-panek.html", tags: ["audio", "music", "looping"] },
  { type: "tool", title: "Audio Processor", description: "Add fades and normalize audio levels", slug: "audio-processor", href: "/audio-processor.html", tags: ["audio", "music", "processing"] },
  { type: "tool", title: "Property Slideshow Maker", description: "Create quick listing videos with custom branding", slug: "property-slideshow-maker", href: "/property-slideshow-maker.html", tags: ["video", "slideshow"] },
  { type: "tool", title: "Nonogram Generator", description: "Convert images to nonogram puzzles with logic clues", slug: "nonogram-generator", href: "/nonogram-generator.html", tags: ["puzzle", "design"] },
  { type: "tool", title: "QR Code Generator", description: "Convert text or URLs to QR codes instantly", slug: "qr-code-generator", href: "/qr-code-generator.html", tags: ["utility", "qr"] },
  { type: "tool", title: "EXIF Stripper", description: "Remove metadata from images for privacy", slug: "exif-stripper", href: "/exif-stripper.html", tags: ["privacy", "image"] },
  { type: "tool", title: "Favicon Generator", description: "Generate favicon sets from any image", slug: "favicon-generator", href: "/favicon-generator.html", tags: ["web", "favicon"] },
  { type: "tool", title: "Bulk Image Resizer", description: "Batch resize multiple images", slug: "bulk-image-resizer", href: "/bulk-image-resizer.html", tags: ["image", "batch"] },
  { type: "tool", title: "Image to ASCII Art", description: "Convert images to ASCII text art", slug: "image-to-ascii", href: "/image-to-ascii.html", tags: ["image", "art", "ascii"] },
  { type: "tool", title: "Color Blindness Simulator", description: "Test design accessibility", slug: "color-blindness-simulator", href: "/color-blindness-simulator.html", tags: ["accessibility", "colors"] },
];

function intoDocs(): Searchable[] {
  return tools;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = norm(url.searchParams.get("q"));
  const docs = intoDocs();

  if (!q || q.length < 2) {
    return NextResponse.json({ q, count: 0, results: [] }, { status: 200 });
  }

  const terms = q.split(/\s+/).filter(Boolean);
  const results = docs
    .map((d) => {
      const hay = [
        norm(d.title),
        norm(d.description),
        norm(Array.isArray(d.tags) ? d.tags.join(" ") : ""),
        norm(d.slug),
      ].join(" ");

      let score = 0;
      for (const t of terms) {
        if (norm(d.title).includes(t)) score += 5;
        if (norm(d.slug).includes(t)) score += 3;
        if (norm(Array.isArray(d.tags) ? d.tags.join(" ") : "").includes(t)) score += 3;
        if (hay.includes(t)) score += 1;
      }
      return { d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    .map(({ d, score }) => ({ ...d, score }));

  return NextResponse.json({ q, count: results.length, results }, { status: 200 });
}

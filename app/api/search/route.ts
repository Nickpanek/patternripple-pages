// app/api/search/route.ts
export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { products } from "@/app/data/products";

type Searchable = {
  type: "product" | "post";
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  category?: string | string[];
  slug: string;
  href: string;
};

function norm(s: unknown) {
  return (s ?? "").toString().toLowerCase();
}

function intoDocs(): Searchable[] {
  const prodDocs: Searchable[] = products.map((p: any) => ({
    type: "product",
    title: p.title,
    subtitle: p.subtitle,
    description: p.description || "",
    tags:
      (typeof p.seo?.keywords === "string"
        ? p.seo.keywords.split(",").map((t: string) => t.trim()).filter(Boolean)
        : Array.isArray(p.tags)
        ? p.tags
        : []) || [],
    category: p.category,
    slug: p.slug,
    href: `/p/${p.slug}`,
  }));
  return prodDocs;
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
        norm(d.subtitle),
        norm(d.description),
        norm(Array.isArray(d.tags) ? d.tags.join(" ") : ""),
        norm(Array.isArray(d.category) ? d.category.join(" ") : d.category),
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

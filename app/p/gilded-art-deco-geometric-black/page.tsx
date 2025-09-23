// app/p/art-deco-ogee-gold-black/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";

// Force static generation for this product page
export const dynamic = "force-static";

const product = {
  slug: "art-deco-ogee-gold-black",
  title: "Art Deco Ogee in Gold and Black",
  subtitle: "Geometric Collection",
  sku: "PR-geo-20250921-007",
  price: 125,
  url: "https://patternripple.com/p/art-deco-ogee-gold-black",
  brand: "PatternRipple",
  description:
    "A bold and sophisticated seamless pattern featuring a classic ogee motif with an Art Deco influence. The interplay of textured gold and deep black creates a dramatic, luxurious effect perfect for statement wallpaper, upholstery, and high-end fashion.",
  category: "geometric",
  subcategory: "ogee",
  tags: [
    "ogee pattern",
    "art deco design",
    "geometric seamless",
    "bold graphic",
    "modernist pattern",
    "luxury geometric",
    "abstract ogee",
    "gold and black",
    "yellow pattern",
    "wallpaper pattern",
    "fabric print",
    "upholstery design",
    "gift wrap",
    "modern decor",
  ],
  images: [
    "https://files.patternripple.com/art-deco-ogee-gold-black-preview.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup1.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup2.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup3.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup4.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup5.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup6.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup7.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup8.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup9.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup10.jpg",
    "https://files.patternripple.com/art-deco-ogee-gold-black-mockup11.jpg",
  ],
  altText: "Seamless Art Deco ogee pattern in gold and black.",
} as const;

// Stripe
const stripePriceId = "price_1S9nUoBB8R6OUfKV75USAunw"; // replace as needed

// ---- SEO (App Router) ----
export async function generateMetadata(): Promise<Metadata> {
  const title = "Art Deco Ogee Pattern - Gold and Black | PatternRipple";
  const description =
    "Sophisticated seamless Art Deco ogee pattern in gold and black. Bold geometric design for luxury wallpaper and modern textiles. Shop this exclusive pattern.";
  return {
    title,
    description,
    alternates: { canonical: product.url },
    openGraph: {
      title,
      description,
      url: product.url,
      type: "product",
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}

// ---- Client bits (gallery + BuyButton) ----
const BuyButton = dynamic(() => import("@/components/BuyButton"), { ssr: false });

// isolated client component for interactivity
function ClientGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  "use client";
  const [selected, setSelected] = React.useState(0);
  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selected]}
          alt={alt}
          width={2048}
          height={2048}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {images.slice(0, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-md overflow-hidden border-2 ${
              selected === i ? "border-blue-500" : "border-transparent"
            }`}
            aria-label={`Select view ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${alt} - view ${i + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Use React from next's runtime without explicit import in server components
import React from "react";

export default function ProductPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href={`/c/${product.category}`}>Geometric</a></li>
            <li aria-current="page">{product.title}</li>
          </ul>
        </nav>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
          {/* Gallery */}
          <ClientGallery images={product.images} alt={product.altText} />

          {/* Details */}
          <section>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{product.subtitle}</p>
            <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>

            <div className="mt-4">
              {/* BuyButton expects { priceId, sku } based on your component definition */}
              <BuyButton priceId={stripePriceId} sku={product.sku} />
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold border-b pb-2">Description</h3>
              <p className="text-gray-700 mt-3">{product.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold border-b pb-2">Details</h3>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
                <li>SKU: {product.sku}</li>
                <li>
                  Category:{" "}
                  <a href={`/c/${product.category}`} className="underline hover:text-blue-600">
                    {product.category}
                  </a>
                </li>
                <li>License: Exclusive Commercial Use</li>
                <li>Asset Files: PNG (6000x6000), JPG (Preview), PDF (Certificate)</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* JSON-LD */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            description: product.description,
            sku: product.sku,
            category: product.category,
            brand: { "@type": "Brand", name: product.brand },
            image: product.images.slice(0, 3),
            offers: {
              "@type": "Offer",
              price: String(product.price),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: product.url,
            },
            keywords: product.tags.join(", "),
          }),
        }}
      />
    </>
  );
}

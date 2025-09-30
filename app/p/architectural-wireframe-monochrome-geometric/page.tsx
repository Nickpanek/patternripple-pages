"use client";

import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

export const dynamic = "force-static";

const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

export default function ProductPage() {
  const product = {
    title: "Architectural Wireframe in Monochrome",
    subtitle: "Architecture Collection",
    sku: "PR-arc-20250929-007",
    price: 20,
    url: "https://patternripple.com/p/architectural-wireframe-monochrome-geometric",
    brand: "PatternRipple",
    description:
      "A complex and sophisticated seamless pattern featuring an abstract architectural wireframe. The detailed, monochrome sketch style creates a modern, urban aesthetic perfect for statement wallpaper, textiles, and contemporary decor.",
    category: "architecture",
    subcategory: "abstract",
    tags: [
      "architectural pattern",
      "wireframe sketch",
      "monochrome design",
      "black and white",
      "geometric abstract",
      "brutalist architecture",
      "modern blueprint",
      "urban cityscape",
      "minimalist decor",
      "complex lines",
      "wallpaper pattern",
      "fabric print",
      "office decor",
      "architect gift wrap",
      "contemporary textile"
    ],
    images: [
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-preview.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup1.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup2.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup3.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup4.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup5.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup6.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup7.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup8.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup9.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup10.jpg",
      "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-mockup11.jpg"
    ],
    altText: "Seamless architectural wireframe pattern with complex building sketches in monochrome."
  };

  // Use the provided Stripe Price ID
  const stripePriceId = "price_1SCs4NBB8R6OUfKVkaceldyP";

  const [selectedImage, setSelectedImage] = useState(0);

  const seoTitle = "Architectural Wireframe Pattern - Monochrome Geometric | PatternRipple";
  const seoDescription =
    "Intricate seamless architectural wireframe pattern in monochrome. A complex, modern geometric design for sophisticated textiles and wallpaper. Shop this exclusive pattern.";

  return (
    <>
      <NextHead>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/collections/architecture" className="hover:underline capitalize">architecture</a> <span className="mx-1">/</span>
          <a href="/collections/architecture/abstract" className="hover:underline capitalize">abstract</a> <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: image viewer */}
          <section>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <Image
                key={product.images[selectedImage]}
                src={product.images[selectedImage]}
                alt={product.altText || "Architectural wireframe pattern in monochrome"}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <ul className="mt-4 grid grid-cols-6 sm:grid-cols-8 gap-2">
              {product.images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Select image ${i + 1}`}
                    className={`relative w-full aspect-square rounded border ${i === selectedImage ? "ring-2 ring-black" : "hover:opacity-80"}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.altText || "Architectural wireframe pattern"} - ${i + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="15vw"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: details */}
          <section className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
            <p className="mt-1 text-gray-600">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xl font-medium">${product.price}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="mt-6">
              {/* Fix: BuyButton expects { priceId: string; sku: string } */}
              <BuyButton priceId={stripePriceId} sku={product.sku} />
              <p className="mt-2 text-xs text-gray-500">Secure transaction via Stripe</p>
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* Exclusive note */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-md font-medium">Pattern details</h2>
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li>Exclusive commercial license - single buyer</li>
                <li>Optimized source at 6000x6000</li>
                <li>Instant delivery after checkout</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

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
            brand: { "@type": "Brand", name: "PatternRipple" },
            image: product.images.slice(0, 3),
            offers: {
              "@type": "Offer",
              price: String(product.price),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: product.url
            },
            keywords: product.tags.join(", ")
          })
        }}
      />
    </>
  );
}

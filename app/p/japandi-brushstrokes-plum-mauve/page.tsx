// file: app/p/japandi-brushstrokes-plum-mauve/page.tsx
"use client";

import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

export const dynamic = "force-static";

const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

export default function ProductPage() {
  const product = {
    title: "Japandi Brushstrokes in Plum and Mauve",
    subtitle: "Abstract Collection",
    sku: "PR-abs-20250921-019",
    price: 125,
    url: "https://patternripple.com/p/japandi-brushstrokes-plum-mauve",
    brand: "PatternRipple",
    description:
      "A modern abstract pattern featuring painterly brushstrokes in a sophisticated palette of plum, mauve, and black. This Japandi-inspired seamless design offers a textured, artistic feel for contemporary interiors and textiles.",
    category: "abstract",
    subcategory: "painterly",
    tags: [
      "Japandi pattern",
      "abstract brushstrokes",
      "painterly texture",
      "plum and mauve",
      "modern farmhouse",
      "wabi-sabi design",
      "minimalist pattern",
      "artistic composition",
      "purple abstract",
      "sophisticated decor",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "home decor fabric",
      "upholstery design",
    ],
    images: [
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-preview.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup1.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup2.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup3.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup4.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup5.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup6.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup7.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup8.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup9.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup10.jpg",
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup11.jpg",
    ],
    altText: "Seamless abstract pattern with painterly plum and mauve brushstrokes on cream.",
  };

  const stripePriceId = "price_1S9wwJBB8R6OUfKVmseB0xm4";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Japandi Brushstrokes Pattern - Plum and Mauve | PatternRipple</title>
        <meta
          name="description"
          content="Sophisticated seamless pattern with abstract Japandi brushstrokes in plum and mauve. Modern painterly design for luxury textiles and wallpaper. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Japandi Brushstrokes Pattern - Plum and Mauve | PatternRipple" />
        <meta
          property="og:description"
          content="Sophisticated seamless pattern with abstract Japandi brushstrokes in plum and mauve. Modern painterly design for luxury textiles and wallpaper. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/abstract" className="hover:underline capitalize">{product.category}</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a> <span className="mx-1">/</span>
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
                alt={product.altText}
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
                    <Image src={src} alt={`${product.altText} - ${i + 1}`} fill className="object-cover rounded" sizes="15vw" />
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
              <BuyButton priceId={stripePriceId} sku={product.sku} />
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">{t}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Below-the-fold section */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Exclusive single-buyer license</li>
            <li>Optimized source at 6000x6000</li>
            <li>Instant file delivery after checkout</li>
          </ul>
        </section>
      </main>

      {/* JSON-LD */}
      <script
        id="product-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
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
              url: product.url,
            },
            keywords: product.tags.join(", "),
          }),
        }}
      />
    </>
  );
}

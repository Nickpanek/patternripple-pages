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
    title: "Abstract Brushstrokes in Navy and Blush",
    subtitle: "Abstract Collection",
    sku: "PR-abs-20250927-420",
    price: 125,
    url: "https://patternripple.com/p/abstract-brushstrokes-navy-blush",
    brand: "PatternRipple",
    description:
      "A dynamic, multi-layered composition of painterly brushstrokes. Hues of deep navy, soft blush pink, and ochre gold create a sophisticated, artistic statement for contemporary fabric and decor.",
    category: "abstract",
    subcategory: "painterly",
    tags: [
      "abstract pattern",
      "painterly brushstrokes",
      "navy blue",
      "blush pink",
      "gold accent",
      "multicolor design",
      "modern art",
      "contemporary seamless",
      "artistic texture",
      "expressive marks",
      "sophisticated pattern",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "interior decor",
      "impasto"
    ],
    images: [
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-preview.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup1.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup2.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup3.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup4.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup5.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup6.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup7.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup8.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup9.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup10.jpg",
      "https://files.patternripple.com/abstract-brushstrokes-navy-blush-mockup11.jpg"
    ],
    altText: "Seamless abstract brushstroke pattern with navy blue and blush pink."
  };

  const stripePriceId = "price_1SC84cBB8R6OUfKVn1E7kDKs";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Abstract Brushstrokes Pattern - Navy and Blush | PatternRipple</title>
        <meta
          name="description"
          content="Expressive seamless pattern with abstract brushstrokes in navy, blush, and gold. A sophisticated, artistic design for modern textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Abstract Brushstrokes Pattern - Navy and Blush | PatternRipple" />
        <meta
          property="og:description"
          content="Expressive seamless pattern with abstract brushstrokes in navy, blush, and gold. A sophisticated, artistic design for modern textiles. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}`} className="hover:underline capitalize">{product.category}</a> <span className="mx-1">/</span>
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

            {/* Quick facts */}
            <ul className="mt-6 text-sm text-gray-700 space-y-1">
              <li>Exclusive single-buyer license</li>
              <li>Optimized source at 6000x6000</li>
              <li>Instant file delivery after checkout</li>
            </ul>
          </section>
        </div>

        {/* Below-the-fold section */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Category: {product.category}</li>
            <li>Subcategory: {product.subcategory}</li>
            <li>Alternate fit: impasto</li>
          </ul>
        </section>
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

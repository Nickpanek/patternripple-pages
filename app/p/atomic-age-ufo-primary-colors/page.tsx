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
    title: "Atomic Age UFOs in Primary Colors",
    subtitle: "UFO & Cryptids Collection",
    sku: "PR-ufo-20250929-001",
    price: 20,
    url: "https://patternripple.com/p/atomic-age-ufo-primary-colors",
    brand: "PatternRipple",
    description:
      "A playful, mid-century modern seamless pattern capturing the optimism of the atomic age. Stylized UFOs and atomic symbols in bold primary colors create a dynamic, retro composition perfect for statement textiles and unique decor.",
    category: "ufo-cryptids",
    subcategory: "retro",
    tags: [
      "ufo pattern",
      "atomic age",
      "mid-century modern",
      "retro spaceship",
      "1950s style",
      "googie aesthetic",
      "space age design",
      "primary colors",
      "red blue yellow",
      "seamless repeat",
      "kids room decor",
      "retro textile",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "groovy-psychedelic"
    ],
    images: [
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-preview.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup1.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup2.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup3.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup4.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup5.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup6.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup7.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup8.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup9.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup10.jpg",
      "https://files.patternripple.com/atomic-age-ufo-primary-colors-mockup11.jpg"
    ],
    altText:
      "Seamless pattern of retro 1950s UFOs and atomic symbols in blue, red, and yellow on cream."
  };

  const stripePriceId = "price_1SCcIOBB8R6OUfKV7H0O7s3V";
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Atomic Age UFO Pattern - Retro Primary Colors | PatternRipple</title>
        <meta
          name="description"
          content="Vibrant seamless pattern of retro UFOs and atomic symbols in primary colors. Mid-century modern design for unique textiles and decor. Shop this pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta
          property="og:title"
          content="Atomic Age UFO Pattern - Retro Primary Colors | PatternRipple"
        />
        <meta
          property="og:description"
          content="Vibrant seamless pattern of retro UFOs and atomic symbols in primary colors. Mid-century modern design for unique textiles and decor. Shop this pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/ufo-cryptids" className="hover:underline">UFO & Cryptids</a> <span className="mx-1">/</span>
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
                    className={`relative w-full aspect-square rounded border ${
                      i === selectedImage ? "ring-2 ring-black" : "hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${product.altText} - ${i + 1}`}
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
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                Exclusive
              </span>
            </div>

            <h1 className="mt-2 text-2xl md:text-3xl font-semibold">{product.title}</h1>
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
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* At a glance */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <li>Category: {product.category}</li>
              <li>Style: {product.subcategory}</li>
              <li>License: Exclusive single buyer</li>
              <li>Instant file delivery</li>
            </ul>
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

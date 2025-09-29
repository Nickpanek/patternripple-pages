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
    title: "Bigfoot Forest Faux Embroidery",
    subtitle: "UFO & Cryptids Collection",
    sku: "PR-ufo-20250929-117",
    price: 20,
    url: "https://patternripple.com/p/bigfoot-forest-faux-embroidery-blue-green",
    brand: "PatternRipple",
    description:
      "A detailed faux embroidery seamless pattern capturing the elusive Bigfoot silhouette against a sunset-hued mountain backdrop. The intricate stitch work in deep forest blues, greens, and earthy tones adds a unique, tactile dimension to this mythic design.",
    category: "ufo-cryptids",
    subcategory: "bigfoot",
    tags: [
      "bigfoot pattern",
      "sasquatch design",
      "faux embroidery",
      "cryptidcore",
      "forest scene",
      "mountain landscape",
      "blue and green",
      "forest hues",
      "earth tones",
      "mythical creature",
      "folklore pattern",
      "outdoor theme",
      "wallpaper pattern",
      "fabric print",
      "gift wrap"
    ],
    images: [
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-preview.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup1.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup2.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup3.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup4.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup5.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup6.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup7.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup8.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup9.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup10.jpg",
      "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-mockup11.jpg"
    ],
    altText: "Seamless Bigfoot faux embroidery pattern in a blue and green forest."
  };

  // Stripe price id provided by user
  const stripePriceId = "price_1SCcekBB8R6OUfKVPwSAhoC2";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Bigfoot Forest Faux Embroidery Pattern - Blue Green | PatternRipple</title>
        <meta
          name="description"
          content="Discover a seamless faux embroidery pattern featuring the legendary Bigfoot in a deep forest scene. Rich blues and greens create a mythic design. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Bigfoot Forest Faux Embroidery Pattern - Blue Green | PatternRipple" />
        <meta
          property="og:description"
          content="Discover a seamless faux embroidery pattern featuring the legendary Bigfoot in a deep forest scene. Rich blues and greens create a mythic design. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/ufo-cryptids" className="hover:underline capitalize">{product.category}</a> <span className="mx-1">/</span>
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
                alt={product.altText || "Bigfoot faux embroidery pattern - blue and green forest"}
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
                    <Image src={src} alt={`${product.altText || "Bigfoot faux embroidery pattern"} - ${i + 1}`} fill className="object-cover rounded" sizes="15vw" />
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

        {/* Details */}
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

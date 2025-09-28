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
    title: "Sunset Gunslinger Faux Embroidery",
    subtitle: "Faux Embroidery Collection",
    sku: "PR-emb-20250927-077",
    price: 125,
    url: "https://patternripple.com/p/sunset-gunslinger-faux-embroidery-purple",
    brand: "PatternRipple",
    description:
      "A dramatic Western scene captured in rich faux embroidery. This seamless pattern features a lone gunslinger against a desert sunset, with saguaro cacti and distant mountains. Ideal for bold textiles and apparel.",
    category: "faux-embroidery",
    subcategory: "western",
    tags: [
      "faux embroidery",
      "gunslinger pattern",
      "western seamless",
      "cowboy art",
      "desert sunset",
      "purple and orange",
      "stitched landscape",
      "saguaro cactus",
      "southwest style",
      "dramatic textile",
      "bold apparel print",
      "fabric print",
      "wallpaper pattern",
      "quilt fabric",
      "masculine design",
      "old-west"
    ],
    images: [
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-preview.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup1.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup2.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup3.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup4.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup5.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup6.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup7.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup8.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup9.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup10.jpg",
      "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-mockup11.jpg"
    ],
    altText: "Seamless faux embroidery pattern of a gunslinger in a purple and orange desert sunset."
  };

  const stripePriceId = "price_1SC9vcBB8R6OUfKVZtY4nkQI";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Sunset Gunslinger Faux Embroidery Pattern | PatternRipple</title>
        <meta
          name="description"
          content="Striking faux embroidery of a gunslinger in a desert at sunset. Rich purples and oranges create a dramatic Western scene for textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Sunset Gunslinger Faux Embroidery Pattern | PatternRipple" />
        <meta
          property="og:description"
          content="Striking faux embroidery of a gunslinger in a desert at sunset. Rich purples and oranges create a dramatic Western scene for textiles. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/faux-embroidery" className="hover:underline capitalize">{product.category}</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a> <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <section className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
            <p className="mt-1 text-gray-600">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xl font-medium">${product.price}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="mt-6">
              <BuyButton priceId={stripePriceId} sku={product.sku} title={product.title} />
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">{t}</span>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Pattern details</h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>Category: {product.category}</li>
                <li>Subcategory: {product.subcategory}</li>
                <li>License: Exclusive commercial</li>
                <li>Auth note: Exclusive pattern available with authenticity certificate.</li>
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

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
    title: "Retro UFOs on Teal",
    subtitle: "retro Collection",
    sku: "PR-ret-20250928-007",
    price: 125,
    url: "https://patternripple.com/p/retro-ufo-pattern-atomic-teal",
    brand: "PatternRipple",
    description:
      "A vibrant, mid-century modern seamless pattern featuring stylized flying saucers in red, orange, and olive. This atomic age design on a rich teal background evokes a classic 1950s sci-fi aesthetic, perfect for statement wallpaper or novelty textiles.",
    category: "retro",
    subcategory: "sci-fi",
    tags: [
      "retro pattern",
      "ufo pattern",
      "atomic age",
      "1950s design",
      "mid-century modern",
      "flying saucer",
      "sci-fi seamless",
      "teal and red",
      "kids room decor",
      "novelty print",
      "vintage space",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "nostalgic design",
      "ufo-cryptids"
    ],
    images: [
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-preview.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup1.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup2.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup3.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup4.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup5.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup6.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup7.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup8.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup9.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup10.jpg",
      "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-mockup11.jpg"
    ],
    altText: "Seamless retro UFO pattern with red and orange spaceships on teal."
  };

  const stripePriceId = "price_1SCRaJBB8R6OUfKVWO3bfd6l";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Retro UFO Pattern - Atomic Age Teal | PatternRipple</title>
        <meta
          name="description"
          content="A seamless 1950s atomic age pattern of retro UFOs on teal. Perfect for nostalgic sci-fi decor and textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Retro UFO Pattern - Atomic Age Teal | PatternRipple" />
        <meta
          property="og:description"
          content="A seamless 1950s atomic age pattern of retro UFOs on teal. Perfect for nostalgic sci-fi decor and textiles. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/retro" className="hover:underline capitalize">{product.category}</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a> <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 mt-6">
          {/* Image Gallery */}
          <section className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                key={product.images[selectedImage]}
                src={product.images[selectedImage]}
                alt={product.altText || "Retro UFO pattern on teal"}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <ul className="grid grid-cols-5 gap-2">
              {product.images.slice(0, 5).map((img, index) => (
                <li key={img}>
                  <button
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-full aspect-square rounded-md overflow-hidden border ${selectedImage === index ? "ring-2 ring-black" : "hover:opacity-80"}`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Image src={img} alt={`${product.altText} - view ${index + 1}`} fill className="object-cover" sizes="20vw" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Product Details */}
          <section>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-lg text-gray-500 mt-1">{product.subtitle}</p>
            <p className="text-3xl mt-4">${product.price.toFixed(2)}</p>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>
            <div className="mt-8">
              <BuyButton productName={product.title} priceId={stripePriceId} />
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
              SKU: {product.sku}
            </div>

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

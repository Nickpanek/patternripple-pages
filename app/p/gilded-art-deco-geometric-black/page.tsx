// app/p/art-deco-ogee-gold-black/page.tsx

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

  const stripePriceId = "price_1S9nUoBB8R6OUfKV75USAunw"; // replace if needed

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Art Deco Ogee Pattern - Gold and Black | PatternRipple</title>
        <meta
          name="description"
          content="Sophisticated seamless Art Deco ogee pattern in gold and black. Bold geometric design for luxury wallpaper and modern textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Art Deco Ogee Pattern - Gold and Black | PatternRipple" />
        <meta
          property="og:description"
          content="Sophisticated seamless Art Deco ogee pattern in gold and black. Bold geometric design for luxury wallpaper and modern textiles. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.altText}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative rounded-md overflow-hidden ring-offset-2 focus:outline-none focus:ring-2 ${
                    selectedImage === index ? "ring-indigo-500" : "ring-transparent"
                  }`}
                  aria-label={`Select view ${index + 1}`}
                >
                  <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="20vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-500">{product.subtitle}</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>
              <p className="text-2xl mt-2 text-gray-900">${product.price}</p>
            </div>
            <p className="text-base text-gray-700">{product.description}</p>
            <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-3 rounded-md">
              <p>
                <strong>Exclusive License:</strong> You are purchasing the sole ownership rights to this pattern. It will be
                removed from our store permanently after your purchase.
              </p>
            </div>
            <BuyButton sku={product.sku} priceId={stripePriceId} />
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>SKU: {product.sku}</li>
                <li>Category: {product.category}</li>
                <li>Seamless and tileable design</li>
                <li>High-resolution digital download</li>
              </ul>
            </div>
          </div>
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
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            image: product.images,
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

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
    title: "Op Art Tunnel Illusion in Monochrome",
    subtitle: "Geometric Collection",
    sku: "PR-geo-20250921-008",
    price: 125,
    url: "https://patternripple.com/p/op-art-tunnel-illusion-black-white",
    brand: "PatternRipple",
    description: "A striking seamless pattern featuring a minimalist op-art tunnel illusion. The clean lines and contrasting monochrome palette create a hypnotic, sophisticated effect perfect for modern statement pieces.",
    category: "geometric",
    subcategory: "optical-illusion",
    tags: [
      "op art pattern",
      "geometric illusion",
      "black and white",
      "monochrome design",
      "tunnel vision",
      "abstract geometric",
      "minimalist pattern",
      "bold graphic",
      "modern wallpaper",
      "contemporary art",
      "fabric print",
      "modern decor",
      "hypnotic pattern",
      "kinetic art",
      "wrapping paper"
    ],
    images: [
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-preview.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup1.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup2.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup3.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup4.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup5.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup6.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup7.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup8.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup9.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup10.jpg",
      "https://files.patternripple.com/op-art-tunnel-illusion-black-white-mockup11.jpg"
    ],
    altText: "Seamless op-art tunnel illusion pattern in black and white."
  };

  const stripePriceId = "price_1S9wTvBB8R6OUfKV2jsZV0sK"; // REPLACE WITH YOUR STRIPE PRICE ID

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Op Art Tunnel Pattern - Black White Geometric | PatternRipple</title>
        <meta name="description" content="Bold seamless op-art pattern with a geometric tunnel illusion in black and white. A minimalist design for modern interiors and textiles. Shop this exclusive pattern." />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Op Art Tunnel Pattern - Black White Geometric | PatternRipple" />
        <meta property="og:description" content="Bold seamless op-art pattern with a geometric tunnel illusion in black and white. A minimalist design for modern interiors and textiles. Shop this exclusive pattern." />
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
              {product.images.slice(0, 5).map((img, index) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative rounded-md overflow-hidden ring-offset-2 focus:outline-none focus:ring-2 ${selectedImage === index ? 'ring-indigo-500' : 'ring-transparent'}`}
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
                <strong>Exclusive License:</strong> You are purchasing the sole ownership rights to this pattern. It will be removed from our store permanently after your purchase.
              </p>
            </div>
            <BuyButton sku={product.sku} priceId={stripePriceId} />
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>SKU: {product.sku}</li>
                <li>Category: {product.category}</li>
                <li>Seamless & tileable design</li>
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
            "name": product.title,
            "description": product.description,
            "sku": product.sku,
            "category": product.category,
            "brand": {
              "@type": "Brand",
              "name": "PatternRipple"
            },
            "image": product.images.slice(0, 3),
            "offers": {
              "@type": "Offer",
              "price": String(product.price),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": product.url
            },
            "keywords": product.tags.join(", ")
          })
        }}
      />
    </>
  );
}

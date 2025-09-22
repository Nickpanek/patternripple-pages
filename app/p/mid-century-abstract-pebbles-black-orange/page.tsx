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
    title: "Mid-Century Abstract Pebbles in Black and Orange",
    subtitle: "Abstract Collection",
    sku: "PR-abs-20250922-011",
    price: 125,
    url: "https://patternripple.com/p/mid-century-abstract-pebbles-black-orange",
    brand: "PatternRipple",
    description:
      "A sophisticated seamless pattern featuring layered, organic pebble shapes in a classic mid-century modern palette of black, orange, and pink. This bold, retro design brings a timeless graphic statement to textiles and interiors.",
    category: "abstract",
    subcategory: "mid-century",
    tags: [
      "mid-century modern",
      "abstract pattern",
      "retro design",
      "organic shapes",
      "pebble pattern",
      "graphic print",
      "1960s style",
      "minimalist art",
      "black and orange",
      "bold pink",
      "cream background",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "home decor",
    ],
    images: [
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-preview.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup1.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup2.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup3.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup4.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup5.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup6.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup7.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup8.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup9.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup10.jpg",
      "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-mockup11.jpg",
    ],
    altText: "Seamless mid-century abstract pebble pattern in black, orange, and pink.",
    exclusive: true,
    exclusivityStatus: "available",
  };

  const seoTitle = "Mid-Century Abstract Pattern - Black Orange Pink";
  const seoDescription =
    "Bold mid-century modern seamless pattern with abstract pebble shapes in black, orange, and pink. Perfect for retro interiors and textiles. Shop this exclusive pattern.";
  const stripePriceId = "price_1SA9SUBB8R6OUfKV2Q1ewLS4"; // replace with live Stripe price id

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>{seoTitle} | PatternRipple</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content={`${seoTitle} | PatternRipple`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
          <ol className="flex gap-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="/c/abstract" className="hover:underline">
                Abstract
              </a>
              <span className="mx-2">/</span>
            </li>
            <li aria-current="page" className="text-gray-900">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 py-1 px-3 rounded-full">
            {product.subtitle}
          </span>
          {product.exclusive && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 py-1 px-3 rounded-full">
              Exclusive - {product.exclusivityStatus}
            </span>
          )}
        </div>

        {/* Product Layout */}
        <section className="grid md:grid-cols-2 gap-12 mt-6">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.altText || "Mid-century abstract pebble pattern"}
                width={900}
                height={900}
                className="w-full h-auto rounded-2xl shadow"
                priority
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  className={`rounded-lg border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.altText || "Mid-century abstract pebble pattern"} - view ${index + 1}`}
                    width={160}
                    height={160}
                    className="w-full h-auto rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-gray-600 mt-2">SKU: {product.sku}</p>
            <p className="text-3xl font-light my-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-800 leading-relaxed mb-6">{product.description}</p>

            <ul className="text-sm text-gray-700 mb-6">
              <li>
                Category: <span className="font-medium capitalize">{product.category}</span>
              </li>
              <li>
                Subcategory: <span className="font-medium capitalize">{product.subcategory}</span>
              </li>
            </ul>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">License Details</h3>
              <p className="text-gray-700 text-sm">Exclusive commercial license. You are the only owner.</p>
              <p className="text-gray-700 text-sm">Includes authenticity certificate PDF.</p>
            </div>

            <div className="mt-8">
              <BuyButton product={{ name: product.title, priceId: stripePriceId, sku: product.sku }} />
            </div>
          </div>
        </section>

        {/* Tag list */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-3">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full border"
              >
                {t}
              </span>
            ))}
          </div>
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
              url: product.url,
            },
            keywords: product.tags.join(", "),
          }),
        }}
      />
    </>
  );
}

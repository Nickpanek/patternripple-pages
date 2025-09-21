// file: app/p/japandi-brushstrokes-plum-mauve/page.tsx

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
    title: "Japandi Brushstrokes in Plum and Mauve",
    subtitle: "Abstract Collection",
    sku: "PR-abs-20250921-019",
    price: 125,
    url: "https://patternripple.com/p/japandi-brushstrokes-plum-mauve",
    brand: "PatternRipple",
    description: "A modern abstract pattern featuring painterly brushstrokes in a sophisticated palette of plum, mauve, and black. This Japandi-inspired seamless design offers a textured, artistic feel for contemporary interiors and textiles.",
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
      "upholstery design"
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
      "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-mockup11.jpg"
    ],
    altText: "Seamless abstract pattern with painterly plum and mauve brushstrokes on cream."
  };

  const stripePriceId = "price_1S9wwJBB8R6OUfKVmseB0xm4"; // REPLACE WITH YOUR STRIPE PRICE ID

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Japandi Brushstrokes Pattern - Plum and Mauve | PatternRipple</title>
        <meta name="description" content="Sophisticated seamless pattern with abstract Japandi brushstrokes in plum and mauve. Modern painterly design for luxury textiles and wallpaper. Shop this exclusive pattern." />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Japandi Brushstrokes Pattern - Plum and Mauve | PatternRipple" />
        <meta property="og:description" content="Sophisticated seamless pattern with abstract Japandi brushstrokes in plum and mauve. Modern painterly design for luxury textiles and wallpaper. Shop this exclusive pattern." />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Full component structure for the product page, including: */}
        {/* - Breadcrumbs (Home > Abstract > Painterly > ...) */}
        {/* - Two-column layout */}
        {/* - Left column: Main image viewer with thumbnail selector */}
        {/* - Right column: Product title, price, SKU, BuyButton, description, tags */}
        {/* - Full-width section below for additional details or related products */}
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

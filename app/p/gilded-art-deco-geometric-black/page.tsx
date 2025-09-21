"use client";

import NextDynamic from "next/dynamic";
import { useState } from "react";

// client-only BuyButton - no SSR
const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

// keep this - Next uses it - do not rename
export const dynamic = "force-static";

export default function ProductPage() {
  const product = {
    title: "Gilded Art Deco Geometric in Black",
    subtitle: "Art Deco Collection",
    sku: "PR-geo-20250921-002",
    stripePriceId: "price_1S9nUoBB8R6OUfKV75USAunw",
    images: [
      "https://files.patternripple.com/gilded-art-deco-geometric-black-preview.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup1.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup2.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup3.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup4.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup5.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup6.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup7.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup8.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup9.jpg",

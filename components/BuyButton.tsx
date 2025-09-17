"use client";

import { useState } from "react";

export default function BuyButton({ priceId, sku }: { priceId: string; sku: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: priceId,
          quantity: 1,
          metadata: { sku: sku }
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Stripe error");
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="space-y-3">
        <div className="text-red-600 text-sm">{error}</div>
        <button 
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-light tracking-wide"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 font-light tracking-wide text-lg"
    >
      {loading ? "Redirecting to checkout..." : "Buy Now - $125"}
    </button>
  );
}

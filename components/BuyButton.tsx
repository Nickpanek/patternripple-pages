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
      <div>
        <div className="text-red-600 mb-2">{error}</div>
        <button 
          onClick={handleClick}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
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
      className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
    >
      {loading ? "Redirecting..." : "Buy Now - $125"}
    </button>
  );
}

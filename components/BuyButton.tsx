"use client";
import { useState } from "react";

export default function BuyButton(props: { priceId: string; sku: string }) {
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: props.priceId,
        metadata: { sku: props.sku },
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Checkout failed");
    setLoading(false);
  };

  return (
    <button onClick={start} disabled={loading} className="px-4 py-2 rounded bg-black text-white">
      {loading ? "Redirecting..." : "Buy for $125"}
    </button>
  );
}

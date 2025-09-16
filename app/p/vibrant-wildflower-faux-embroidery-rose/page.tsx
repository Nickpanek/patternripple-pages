import BuyButton from "@/components/BuyButton";

export default function ProductPage() {
  const product = {
    title: "Vibrant Wildflower Faux Embroidery - Dusty Rose",
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S81Y5BB8R6OUfKVOsUaeULq",
  };

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-semibold">{product.title}</h1>
      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
      <BuyButton priceId={product.stripePriceId} sku={product.sku} />
      <p className="text-gray-700">
        Exclusive seamless faux embroidery floral pattern on dusty rose. Includes 6000px source and certificate.
      </p>
    </main>
  );
}

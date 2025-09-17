import BuyButton from "@/components/BuyButton";

export default function ProductPage() {
  const product = {
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T", // UPDATE THIS WITH YOUR LIVE PRICE ID
    previewImage: "https://files.patternripple.com/PR-flo-20250916-001-preview.jpg",
    description: "Exclusive seamless faux embroidery floral pattern on dusty rose. This intricate design features delicate wildflowers with embroidered texture effects, perfect for luxury fabric design, high-end fashion, or premium home decor applications.",
    details: [
      "6000px x 6000px source file",
      "Seamless repeat pattern",
      "Certificate of exclusivity",
      "Commercial usage rights",
      "Lifetime ownership"
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Image Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-2 shadow-[0_0_0_3px_rgba(251,191,36,0.5)]">
            <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden">
              <img 
                src={product.previewImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center font-light">
            Watermarked preview • Full resolution upon purchase
          </p>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-8">
          <div>
            <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
              EXCLUSIVE PATTERN
            </span>
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {product.subtitle}
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <p className="text-gray-700 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Included in Purchase
            </h3>
            <ul className="space-y-3">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-600 mr-3">✓</span>
                  <span className="text-gray-700 font-light">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-light text-gray-900">$125</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
            <BuyButton priceId={product.stripePriceId} sku={product.sku} />
            <p className="text-sm text-gray-500 font-light">
              Secure checkout via Stripe • Instant download after purchase
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

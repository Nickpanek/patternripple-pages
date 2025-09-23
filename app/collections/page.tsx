import Link from "next/link";

const collections = [
  {
    slug: "floral",
    title: "Floral Collection",
    description: "Elegant botanical and floral patterns featuring roses, wildflowers, and nature-inspired designs",
    count: 3,
    thumbnail: "https://files.patternripple.com/PR-flo-20250921-006-thumb.jpg",
    gradient: "from-pink-400 to-rose-600"
  },
  {
    slug: "geometric",
    title: "Geometric Collection",
    description: "Modern geometric patterns including Art Deco, Op Art, and contemporary abstract designs",
    count: 11,
    thumbnail: "https://files.patternripple.com/gilded-art-deco-geometric-black-thumb.jpg",
    gradient: "from-blue-400 to-purple-600"
  },
  {
    slug: "faux-embroidery",
    title: "Faux Embroidery Collection",
    description: "Patterns that mimic the texture and charm of hand-stitched embroidery work",
    count: 3,
    thumbnail: "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-thumb.jpg",
    gradient: "from-amber-400 to-orange-600"
  },
  {
    slug: "seasonal",
    title: "Seasonal Collection",
    description: "Holiday and seasonal patterns including Christmas, Easter, and autumn themes",
    count: 3,
    thumbnail: "https://files.patternripple.com/PR-sea-20250919-001-thumb.jpg",
    gradient: "from-green-400 to-teal-600"
  },
  {
    slug: "abstract",
    title: "Abstract Collection",
    description: "Contemporary abstract patterns featuring brushstrokes, organic shapes, and artistic expressions",
    count: 3,
    thumbnail: "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-thumb.jpg",
    gradient: "from-purple-400 to-pink-600"
  },
  {
    slug: "horror",
    title: "Horror Collection",
    description: "Dark and gothic patterns perfect for edgy designs and Halloween projects",
    count: 1,
    thumbnail: "https://files.patternripple.com/PR-hor-20250919-001-thumb.jpg",
    gradient: "from-red-600 to-gray-900"
  }
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            Pattern Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our exclusive patterns organized by style and theme. 
            Each pattern is one-of-a-kind and available only once.
          </p>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center gap-8 text-sm">
          <span>📦 {collections.length} Collections</span>
          <span>✨ {collections.reduce((sum, c) => sum + c.count, 0)} Exclusive Patterns</span>
          <span>🔐 Once sold, gone forever</span>
        </div>
      </div>

      {/* Collections Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group"
            >
              <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Collection Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-20`} />
                  <img
                    src={collection.thumbnail}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {collection.count} patterns
                  </div>
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <h2 className="text-xl font-light text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {collection.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {collection.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-purple-600 font-medium">
                    <span>View Collection</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* All Patterns Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            View All Patterns
          </Link>
        </div>
      </main>
    </div>
  );
}

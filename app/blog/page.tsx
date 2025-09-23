import Link from "next/link";

// Mock blog posts - you can later move this to a database or CMS
const blogPosts = [
  {
    slug: "why-exclusive-patterns-matter",
    title: "Why Exclusive Patterns Matter in Modern Design",
    excerpt: "In a world saturated with stock designs, standing out has never been more important. Discover why exclusive patterns are becoming the secret weapon of successful designers.",
    date: "January 15, 2025",
    category: "Design Insights",
    readTime: "5 min read"
  },
  {
    slug: "faux-embroidery-trend-2025",
    title: "The Faux Embroidery Trend: What's Hot in 2025",
    excerpt: "Faux embroidery patterns are taking the design world by storm. Learn how to incorporate these textured beauties into your next project.",
    date: "January 10, 2025",
    category: "Trends",
    readTime: "3 min read"
  },
  {
    slug: "commercial-rights-explained",
    title: "Understanding Commercial Rights for Digital Patterns",
    excerpt: "What can you actually do with your PatternRipple purchase? We break down commercial usage rights in simple terms.",
    date: "January 5, 2025",
    category: "Legal",
    readTime: "4 min read"
  },
  {
    slug: "geometric-patterns-interior-design",
    title: "Using Geometric Patterns in Interior Design",
    excerpt: "From wallpapers to textiles, geometric patterns are transforming spaces. Here's how to use them effectively.",
    date: "December 28, 2024",
    category: "Interior Design",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            PatternRipple Blog
          </h1>
          <p className="text-lg text-gray-600">
            Design insights, pattern trends, and creative inspiration
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-light text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-light text-gray-900 mb-3">
            More Articles Coming Soon
          </h3>
          <p className="text-gray-600">
            We're working on more in-depth guides and tutorials. Check back soon!
          </p>
        </div>
      </main>
    </div>
  );
}

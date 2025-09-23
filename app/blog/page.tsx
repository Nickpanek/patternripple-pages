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

      <main className="max-w-4xl mx-auto px-4 py-20">
        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-12 text-center shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Articles Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We're working on in-depth guides about pattern design, commercial usage tips, 
            and creative inspiration. Check back soon or follow us for updates!
          </p>
          
          <div className="flex gap-4 justify-center">
            <a 
              href="mailto:nick@patternripple.com" 
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Notified
            </a>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              Browse Patterns
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

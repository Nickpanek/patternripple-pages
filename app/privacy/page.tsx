export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-thin tracking-wide text-gray-100 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Effective Date: January 1, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 prose prose-invert prose-gray">
        <section>
          <h2>1. Introduction</h2>
          <p>
            At PatternRipple, your privacy matters. We build software tools—free and paid—that prioritize local-first functionality and avoid invasive tracking. This Privacy Policy outlines how we handle information.
          </p>
        </section>

        <section>
          <h2>2. No Account Required</h2>
          <p>
            PatternRipple does not require users to create an account to use software. Most tools run entirely in your browser and do not transmit data to external servers.
          </p>
        </section>

        <section>
          <h2>3. Payment Information</h2>
          <p>
            All payments are processed securely via Stripe. PatternRipple does not store any credit card or billing information. Stripe’s own privacy policy governs all transaction-related data.
          </p>
        </section>

        <section>
          <h2>4. Analytics</h2>
          <p>
            PatternRipple may use privacy-friendly analytics (e.g., Plausible or similar) to understand how tools are used in aggregate. These platforms do not use cookies, fingerprinting, or personal identifiers.
          </p>
        </section>

        <section>
          <h2>5. Emails and Support</h2>
          <p>
            If you contact us at <a href="mailto:nick@patternripple.com">nick@patternripple.com</a>, we will retain your email address and message only as long as needed to respond or provide support.
          </p>
        </section>

        <section>
          <h2>6. Data Storage and Security</h2>
          <p>
            Most data is processed locally in your browser. For tools that save preferences or data in your browser, we use localStorage—not remote servers. We take reasonable precautions to ensure any limited data we do collect is secure.
          </p>
        </section>

        <section>
          <h2>7. Children’s Privacy</h2>
          <p>
            PatternRipple tools are not intended for children under 13. We do not knowingly collect any personal information from minors.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact:
          </p>
          <address>
            PatternRipple<br />
            Email: <a href="mailto:nick@patternripple.com">nick@patternripple.com</a><br />
            Website: <a href="https://patternripple.com">https://patternripple.com</a>
          </address>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm border-t border-gray-800">
          <p>&copy; 2025 PatternRipple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

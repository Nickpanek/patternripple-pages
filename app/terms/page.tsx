export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-thin tracking-wide text-gray-100 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-400">Effective Date: January 1, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 prose prose-invert prose-gray">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using PatternRipple.com ("the Website") or downloading any free or paid software provided by PatternRipple ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Website or its software.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            PatternRipple provides browser-based creative software and utilities, available as both free and paid tools. All products are one-time purchase or free, with no subscriptions.
          </p>
        </section>

        <section>
          <h2>3. Payment Terms (Paid Tools Only)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All purchases are final and non-refundable, unless required by law.</li>
            <li>Payments are processed through Stripe; you agree to their terms.</li>
            <li>You are responsible for using a valid payment method.</li>
          </ul>
        </section>

        <section>
          <h2>4. Access and Download Issues</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upon purchase, download access is provided immediately or via email.</li>
            <li>PatternRipple is not responsible for issues due to internet or device failures.</li>
            <li>Contact <a href="mailto:nick@patternripple.com">nick@patternripple.com</a> if you experience issues.</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            All rights, title, and interest in the software remain the property of PatternRipple unless otherwise stated. You may use software as permitted in the <a href="/licenses">License Agreement</a>, but you do not own the software code or branding.
          </p>
        </section>

        <section>
          <h2>6. Prohibited Uses</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Do not reverse-engineer, resell, or share licensed software improperly.</li>
            <li>Do not use automation to extract or manipulate Website data.</li>
            <li>Do not misrepresent affiliation with PatternRipple.</li>
          </ul>
        </section>

        <section>
          <h2>7. Chargebacks and Disputes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact <a href="mailto:nick@patternripple.com">nick@patternripple.com</a> before initiating any dispute.</li>
            <li>Unjustified chargebacks may result in revoked software access and legal pursuit for damages.</li>
          </ul>
        </section>

        <section>
          <h2>8. Disclaimers and Limitation of Liability</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All software is provided "as is" without warranties of any kind.</li>
            <li>We are not liable for loss of data, interruption, or indirect damages.</li>
            <li>Total liability shall not exceed the amount paid for the software in question.</li>
          </ul>
        </section>

        <section>
          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless PatternRipple and its affiliates from any claims resulting from your use of the Website or its software, violation of these Terms, or misuse of licensed tools.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the United States and the State of Kansas.
          </p>
        </section>

        <section>
          <h2>11. Modifications</h2>
          <p>
            These Terms may be updated at any time. Continued use of the Website or software implies acceptance of any revised Terms.
          </p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>
            Questions about these Terms can be sent to:
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

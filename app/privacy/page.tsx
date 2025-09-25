export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last Updated: January 1, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          <section>
            <p className="text-gray-700 mb-6 text-lg">
              PatternRipple ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website patternripple.com and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Personal Information</h3>
            <p className="text-gray-700 mb-3">When you make a purchase, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing address</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>IP address</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">1.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-3">When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Pages viewed</li>
              <li>Referring website addresses</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and download links</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Prevent fraudulent transactions and protect against criminal activity</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <div className="space-y-3 text-gray-700">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:</p>
              
              <p><strong>3.1 Service Providers:</strong> We share information with trusted third-party service providers who assist us in operating our website and conducting our business, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Stripe (payment processing)</li>
                <li>Email service providers</li>
                <li>Web hosting services</li>
                <li>Analytics providers</li>
              </ul>

              <p><strong>3.2 Legal Requirements:</strong> We may disclose your information if required by law, court order, or other legal process, or if we believe disclosure is necessary to protect our rights, property, or safety.</p>

              <p><strong>3.3 Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Payment Information Security</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>4.1</strong> We do not directly collect or store your credit card information. All payment transactions are processed through Stripe, a PCI-compliant payment processor.</p>
              <p><strong>4.2</strong> Stripe uses industry-standard encryption and security measures to protect your payment information.</p>
              <p><strong>4.3</strong> For more information about how Stripe handles your payment information, please review Stripe's privacy policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>5.1</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.</p>
              <p><strong>5.2</strong> Order information is retained for our records and to comply with legal, accounting, and reporting requirements.</p>
              <p><strong>5.3</strong> You may request deletion of your personal information, subject to our legal obligations to retain certain data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise any of these rights, please contact us at <a href="mailto:nick@patternripple.com" className="text-purple-600 hover:underline">nick@patternripple.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>7.1</strong> We use cookies and similar tracking technologies to enhance your experience on our website.</p>
              <p><strong>7.2</strong> Essential cookies are necessary for the website to function properly.</p>
              <p><strong>7.3</strong> Analytics cookies help us understand how visitors use our website.</p>
              <p><strong>7.4</strong> You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States. By using our website and providing your information, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. California Privacy Rights</h2>
            <p className="text-gray-700 mb-4">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, the right to opt-out of the sale of personal information (we do not sell personal information), and the right to non-discrimination for exercising privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Security Measures</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>12.1</strong> We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              <p><strong>12.2</strong> We use SSL encryption for data transmission and secure servers for data storage.</p>
              <p><strong>12.3</strong> Despite our security measures, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our website after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>PatternRipple</strong><br />
                Email: <a href="mailto:nick@patternripple.com" className="text-purple-600 hover:underline">nick@patternripple.com</a><br />
                Website: <a href="https://patternripple.com" className="text-purple-600 hover:underline">https://patternripple.com</a><br /><br />
                For download assistance or technical support, please email: <a href="mailto:nick@patternripple.com" className="text-purple-600 hover:underline">nick@patternripple.com</a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-sm">
            <p>&copy; 2025 PatternRipple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

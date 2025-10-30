export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-thin tracking-wide text-gray-100 mb-2">
            License Agreement
          </h1>
          <p className="text-gray-400">Effective Date: January 1, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 prose prose-invert prose-gray">
        <section>
          <h2>1. Scope</h2>
          <p>
            This License Agreement applies to all software—free or paid—provided through PatternRipple. By downloading or using any software from PatternRipple, you agree to these terms.
          </p>
        </section>

        <section>
          <h2>2. License Grant</h2>
          <p>
            PatternRipple grants you a non-exclusive, non-transferable license to use the software for personal or commercial use, subject to the limitations outlined below.
          </p>
        </section>

        <section>
          <h2>3. Restrictions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may not resell or sublicense the software itself without written permission.</li>
            <li>You may not reverse engineer, decompile, or disassemble the software.</li>
            <li>You may not misrepresent the origin of the software or claim it as your own creation.</li>
          </ul>
        </section>

        <section>
          <h2>4. Ownership</h2>
          <p>
            All software remains the intellectual property of PatternRipple. Your use of the software does not grant you ownership or copyright.
          </p>
        </section>

        <section>
          <h2>5. Liability</h2>
          <p>
            All software is provided "as is" without warranty of any kind. PatternRipple shall not be held liable for any direct, indirect, or incidental damages resulting from the use or inability to use the software.
          </p>
        </section>

        <section>
          <h2>6. Updates and Termination</h2>
          <p>
            PatternRipple may update or discontinue any software at any time. This license may be terminated if you fail to comply with its terms. Upon termination, you must cease use and destroy all copies of the software.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Questions about this license can be directed to:
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// SEO
export const metadata: Metadata = {
  title: "LAZ-1011 & LAZ-1123 - Antimicrobial Lead Compounds | PatternRipple Lab",
  description: "First public domain release of in silico discovered antimicrobial compounds LAZ-1011 and LAZ-1123. High Fsp3 bis-dioxolane scaffolds for MDR pathogen treatment.",
  keywords: "LAZ-1011, LAZ-1123, antimicrobial resistance, in silico drug discovery, public domain drugs, MDR pathogens, efflux pump evasion, quorum sensing inhibition",
  alternates: { canonical: "https://www.patternripple.com/lab/lazarus-001" },
  openGraph: {
    title: "LAZ-1011 & LAZ-1123 - Public Domain Antimicrobial Leads",
    description: "First batch of in silico molecular discoveries. High-Fsp3 antimicrobial scaffolds released to public domain.",
    url: "https://www.patternripple.com/lab/lazarus-001",
    type: "article",
    siteName: "PatternRipple",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAZ-1011 & LAZ-1123 - Public Domain Antimicrobial Discovery",
    description: "First in silico discoveries released to public domain. Novel antimicrobial scaffolds for MDR pathogen treatment.",
  },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "LAZ-1011 & LAZ-1123: High-Fsp3 Bis-Dioxolane Antimicrobial Scaffolds",
  author: {
    "@type": "Person",
    name: "Nicholas Panek",
  },
  datePublished: "2026-01-07",
  publisher: {
    "@type": "Organization",
    name: "PatternRipple",
    url: "https://www.patternripple.com",
  },
  description: "Public domain antimicrobial lead candidates discovered through in silico methods",
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
};

export default function Lazarus001Page() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-4">
            <Link
              href="/lab"
              className="text-sm text-gray-400 hover:text-accent transition-colors"
            >
              ← Back to Lab
            </Link>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-thin tracking-wide text-gray-100 mb-2">
                Lazarus-001
              </h1>
              <p className="text-lg text-gray-400 mb-1">
                LAZ-1011 & LAZ-1123: High-Fsp3 Antimicrobial Scaffolds
              </p>
              <p className="text-sm text-gray-500">
                Published: January 7, 2026 • Nicholas Panek
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
              <p className="text-xs text-green-400 font-semibold">PUBLIC DOMAIN</p>
              <p className="text-xs text-gray-400">CC0 1.0 Universal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Disclosure Statement */}
        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-light text-amber-400 mb-3">Disclosure Statement</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            I am not a medical expert; I am a researcher who wanted to help tackle the problem of antibiotic resistance.
            If medical professionals or drug developers find this data useful, I hope they use it to create safe, effective,
            and affordable treatments for those who need them most.
          </p>
        </section>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-4 border-b border-gray-700 pb-2">
            Overview
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            These molecules feature a central imidazole core with bis-dioxolane &quot;wings,&quot; providing a high Fraction Csp3 (0.80)
            to facilitate evasion of the AcrAB-TolC efflux pump system in Gram-negative pathogens.
          </p>
        </section>

        {/* Lead Compounds */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-6 border-b border-gray-700 pb-2">
            Lead Compounds
          </h2>

          {/* LAZ-1011 */}
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-accent mb-2">LAZ-1011</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">SMILES</p>
                    <p className="font-mono text-sm text-gray-300 bg-[#111] p-2 rounded mt-1 break-all">
                      CC1(C)OCC(c2cn(C3COC(C)(C)OC3)cn2)CO1
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Properties</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Original discovery</li>
                      <li>• Best-in-class QED: <span className="text-accent">0.84</span></li>
                      <li>• Strong LasR/QscR binding</li>
                      <li>• Fraction Csp3: <span className="text-accent">0.80</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-4">
                <Image
                  src="/lab/Compound_1.svg"
                  alt="LAZ-1011 molecular structure"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* LAZ-1123 */}
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-accent mb-2">LAZ-1123</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">SMILES</p>
                    <p className="font-mono text-sm text-gray-300 bg-[#111] p-2 rounded mt-1 break-all">
                      COC1(C)OCC(n2cnc(C3COC(C)(C)OC3)c2)CO1
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Properties</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Optimized variant</li>
                      <li>• Aqueous solubility (LogS): <span className="text-accent">-0.94</span></li>
                      <li>• Improved TPSA: <span className="text-accent">63.97</span></li>
                      <li>• Fraction Csp3: <span className="text-accent">0.80</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-4">
                <Image
                  src="/lab/Compound_2.svg"
                  alt="LAZ-1123 molecular structure"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Markush Family */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-4 border-b border-gray-700 pb-2">
            Markush Family (Formula I)
          </h2>
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-center bg-white rounded-lg p-6 mb-4">
              <Image
                src="/lab/Figure_1_Markush_Core.svg"
                alt="Markush structure showing chemical family"
                width={400}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
            <div className="text-sm text-gray-300 space-y-2">
              <p className="font-semibold text-gray-100">Core — (X) — (Y)</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Core:</strong> 5-membered aromatic nitrogen heterocycle (Imidazole or Triazole)</li>
                <li>• <strong>X and Y:</strong> Independent 1,3-dioxolane rings</li>
                <li>• <strong>Substitution:</strong> At least one ring comprises R group where R is H, C1-C6 alkyl, or C1-C6 alkoxy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-4 border-b border-gray-700 pb-2">
            Technical Methodology
          </h2>
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6">
            <p className="text-sm text-gray-300 mb-4">
              These leads were discovered and validated using open-source computational tools:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>ChEMBL:</strong> Fragment retrieval and QS target data
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>BRICS:</strong> Fragment-based decomposition and recombination
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>RDKit:</strong> Molecular informatics and property calculation
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>Smina:</strong> Molecular docking and binding affinity
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>OpenBabel:</strong> Chemical format interconversion
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <div>
                  <strong>Pandas & Google Colab:</strong> Data management and workflow
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Defensive Disclosure */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-4 border-b border-gray-700 pb-2">
            The &quot;Troll Shield&quot;: Defensive Disclosure
          </h2>
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6">
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              To prevent this chemical space from being locked away by patent trolls, Nicholas Panek establishes
              comprehensive Prior Art for the Markush family defined above. This disclosure asserts that any future
              claim regarding 3D-globular (Fsp3 &gt; 0.75) scaffolds for MetAP or Quorum Sensing inhibition based on
              this genus is anticipated by this document.
            </p>
            <div className="bg-[#111] rounded-lg p-4 border-l-4 border-accent">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Key Technical Advantage</p>
              <p className="text-sm text-gray-300">
                <strong>Efflux Evasion:</strong> The high Fraction Csp3 (0.80) creates a non-planar geometry that limits
                recognition and ejection by the AcrAB-TolC efflux pump system in Gram-negative pathogens.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section className="mb-10">
          <h2 className="text-2xl font-light text-gray-100 mb-4 border-b border-gray-700 pb-2">
            Downloads
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="/lab/MDR_Lead_Candidates_Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6 hover:ring-accent transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-accent transition-colors">
                    MDR Lead Candidates Report
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Full technical report (PDF)</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </a>
            <a
              href="/lab/Panek_Defensive_Disclosure_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-xl p-6 hover:ring-accent transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-accent transition-colors">
                    Defensive Disclosure Document
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Legal prior art filing (PDF)</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </a>
          </div>
        </section>

        {/* Public Domain Declaration */}
        <section className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
          <h2 className="text-xl font-light text-green-400 mb-3">Public Domain Dedication (CC0 1.0)</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Nicholas Panek has dedicated this work to the public domain by waiving all rights worldwide under copyright law.
            You are free to copy, modify, and distribute this work, even for commercial purposes, without asking permission.
            I hope real experts use this to make good, safe medicine that is cheap for the end user.
          </p>
          <div className="mt-4">
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Learn more about CC0 1.0 Universal
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}

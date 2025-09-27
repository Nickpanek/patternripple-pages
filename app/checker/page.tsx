import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Free Seamless Pattern Checker - PatternRipple",
  description:
    "Upload an image and test if it tiles cleanly. 100 percent client-side. Great for fabric, wallpaper, and digital papers.",
  alternates: { canonical: "https://www.patternripple.com/checker" },
  openGraph: {
    title: "Free Seamless Pattern Checker - PatternRipple",
    description:
      "Upload an image and test if it tiles cleanly. 100 percent client-side. Great for fabric, wallpaper, and digital papers.",
    url: "https://www.patternripple.com/checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Seamless Pattern Checker - PatternRipple",
    description:
      "Upload an image and test if it tiles cleanly. 100 percent client-side.",
  },
};

export default function CheckerPage() {
  // Iframe keeps your existing HTML, JS, and styling intact
  // CTAs above and below the tool route traffic and donations with tracking
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Seamless Pattern Checker</h1>
          <div className="flex items-center gap-3">
            <a
              className="rounded-md bg-yellow-300 px-3 py-2 font-semibold text-black shadow"
              href="https://www.buymeacoffee.com/prompternick?utm_source=patternripple-checker&utm_medium=header&utm_campaign=donations"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy me a coffee
            </a>
            <Link
              className="rounded-md bg-black px-3 py-2 font-semibold text-white"
              href="/collections/faux-embroidery?utm_source=patternripple-checker&utm_medium=header&utm_campaign=collection-promo"
            >
              Shop faux-embroidery
            </Link>
          </div>
        </header>

        <div className="mb-4 rounded-lg border border-neutral-200 shadow-sm">
          <iframe
            src="/checker.html"
            title="PatternRipple Seamless Pattern Checker"
            style={{
              width: "100%",
              height: "80vh",
              border: 0,
              borderRadius: "0.5rem",
            }}
          />
        </div>

        <aside className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/collections/faux-embroidery?utm_source=patternripple-checker&utm_medium=footer&utm_campaign=collection-promo"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            <div className="text-sm text-neutral-600">Collection</div>
            <div className="font-semibold">Faux-Embroidery</div>
          </Link>
          <Link
            href="/collections/geometric?utm_source=patternripple-checker&utm_medium=footer&utm_campaign=collection-promo"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            <div className="text-sm text-neutral-600">Collection</div>
            <div className="font-semibold">Geometric</div>
          </Link>
          <Link
            href="/collections/seasonal?utm_source=patternripple-checker&utm_medium=footer&utm_campaign=collection-promo"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            <div className="text-sm text-neutral-600">Collection</div>
            <div className="font-semibold">Seasonal</div>
          </Link>
        </aside>

        <div className="mt-6 flex items-center justify-between">
          <a
            className="rounded-md bg-yellow-300 px-3 py-2 font-semibold text-black shadow"
            href="https://www.buymeacoffee.com/prompternick?utm_source=patternripple-checker&utm_medium=footer&utm_campaign=donations"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support free tools
          </a>
          <Link
            className="rounded-md border border-neutral-300 px-3 py-2 font-semibold"
            href="/collections?utm_source=patternripple-checker&utm_medium=footer&utm_campaign=all-collections"
          >
            Browse all collections
          </Link>
        </div>
      </section>
    </main>
  );
}

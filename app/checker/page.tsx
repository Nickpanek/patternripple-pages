import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Free Seamless Pattern Checker - PatternRipple",
  description:
    "Upload an image and test if it tiles cleanly. 100 percent client-side. Great for fabric, wallpaper, and digital papers.",
  alternates: { canonical: "https://www.patternripple.com/checker" },
};

export default function CheckerPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Seamless Pattern Checker</h1>
          <div className="flex gap-3">
            <a
              className="rounded-md bg-yellow-300 px-3 py-2 font-semibold text-black shadow"
              href="https://www.buymeacoffee.com/prompternick?utm_source=checker&utm_medium=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy me a coffee
            </a>
            <Link
              className="rounded-md bg-black px-3 py-2 font-semibold text-white"
              href="/collections/faux-embroidery?utm_source=checker&utm_medium=header"
            >
              Shop Faux-Embroidery
            </Link>
          </div>
        </header>

        <div className="mb-4 rounded-lg border border-neutral-200 shadow-sm">
          <iframe
            src="/checker.html"
            title="PatternRipple Seamless Pattern Checker"
            style={{ width: "100%", height: "80vh", border: 0, borderRadius: "0.5rem" }}
          />
        </div>

        <aside className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/collections/faux-embroidery?utm_source=checker&utm_medium=footer"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            Faux-Embroidery
          </Link>
          <Link
            href="/collections/geometric?utm_source=checker&utm_medium=footer"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            Geometric
          </Link>
          <Link
            href="/collections/seasonal?utm_source=checker&utm_medium=footer"
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-100"
          >
            Seasonal
          </Link>
        </aside>

        <div className="mt-6 flex justify-between">
          <a
            className="rounded-md bg-yellow-300 px-3 py-2 font-semibold text-black shadow"
            href="https://www.buymeacoffee.com/prompternick?utm_source=checker&utm_medium=footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support free tools
          </a>
          <Link
            className="rounded-md border border-neutral-300 px-3 py-2 font-semibold"
            href="/collections?utm_source=checker&utm_medium=footer"
          >
            Browse all collections
          </Link>
        </div>
      </section>
    </main>
  );
}

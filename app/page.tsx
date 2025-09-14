// app/page.tsx
export const runtime = 'edge';

export default function Home() {
  // Directly using your Stripe Payment Link
  const checkoutUrl = "https://buy.stripe.com/6oUeVc9hudLCetmb4h83C00";

  return (
    <main style={{ maxWidth: 900, margin: "4rem auto", padding: "0 1rem", lineHeight: 1.6 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 style={{ fontSize: "2.25rem", margin: 0 }}>PatternRipple</h1>
        </a>
        <a href="/studio" style={{ textDecoration: "underline" }}>Open Studio</a>
      </header>

      <p style={{ marginTop: "1rem", opacity: 0.85 }}>
        10 Floral Faux Embroidery patterns — launch bundle.
      </p>

      <p style={{ marginTop: "1rem" }}>
        <a
          href={checkoutUrl}
          style={{
            display: "inline-block",
            padding: "0.9rem 1.2rem",
            borderRadius: 12,
            border: "1px solid #222",
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          Buy the Bundle – $100
        </a>
      </p>

      <hr style={{ margin: "2rem 0" }} />
      <p style={{ opacity: 0.7 }}>
        Placeholder homepage — replace with product grid later.
      </p>
    </main>
  );
}

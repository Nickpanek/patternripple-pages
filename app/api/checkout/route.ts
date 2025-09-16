import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { priceId, quantity = 1, metadata = {} } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.patternripple.com";
    const sku = (metadata && metadata.sku) || "PR-flo-20250916-001";

    // Build Stripe form body
    const body = new URLSearchParams();
    body.append("mode", "payment");
    body.append("success_url", `${site}/thank-you?session_id={CHECKOUT_SESSION_ID}&sku=${sku}`);
    body.append("cancel_url", `${site}/checkout-cancelled`);
    body.append("allow_promotion_codes", "true");
    body.append("line_items[0][price]", priceId);
    body.append("line_items[0][quantity]", String(quantity));
    for (const [k, v] of Object.entries(metadata || {})) {
      body.append(`metadata[${k}]`, String(v));
    }

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY || ""}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: "Stripe error", detail: errText }, { status: 500 });
    }

    const data = await resp.json();
    return NextResponse.json({ url: data.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Stripe error" }, { status: 500 });
  }
}

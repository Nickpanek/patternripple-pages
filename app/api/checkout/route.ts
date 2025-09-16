import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// no apiVersion - simplest and fixes the type error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { priceId, quantity = 1, metadata = {} } = await req.json();
    if (!priceId) return NextResponse.json({ error: "Missing priceId" }, { status: 400 });

    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.patternripple.com";
    const sku = metadata.sku || "PR-flo-20250916-001";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity }],
      success_url: `${site}/thank-you?session_id={CHECKOUT_SESSION_ID}&sku=${sku}`,
      cancel_url: `${site}/checkout-cancelled`,
      allow_promotion_codes: true,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Stripe error" }, { status: 500 });
  }
}

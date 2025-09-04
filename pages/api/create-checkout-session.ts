import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const items = req.body.items;
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("❌ Items missing or invalid", items);
      return res.status(400).json({ error: "Items missing" });
    }

    const line_items = items.map((item: any) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
    }));

    const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.origin || "http://localhost:3000";

    console.log("✅ Creating session with origin:", origin);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/catalog`,
    });

    console.log("✅ Stripe session created:", session.id);

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe API error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Ajustamos la versión a la que tu SDK soporta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16", // Versión estable y compatible
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body as {
      items: { name: string; price: number; quantity?: number }[];
    };

    // Validación: asegurarse de que haya productos en la petición
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items missing" });
    }

    // Stripe maneja precios en centavos → $40 USD = 4000
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => ({
      quantity: i.quantity ?? 1,
      price_data: {
        currency: "usd",
        product_data: { name: i.name },
        unit_amount: Math.round(i.price * 100),
      },
    }));

    // Detecta automáticamente la URL base
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (req.headers.origin as string) ||
      "http://localhost:3000";

    // Crear sesión en Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
}

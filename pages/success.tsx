import Stripe from "stripe";
import type { GetServerSideProps } from "next";

type Line = { name: string; quantity: number; amountSubtotal: number };
type Props = {
  orderIdShort: string;
  amountTotal: number;
  currency: string;
  lines: Line[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, req }) => {
  const sessionId = typeof query.session_id === "string" ? query.session_id : null;

  if (!sessionId) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });

  // Traemos la sesión con detalle de line_items
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const currency = (session.currency || "usd").toUpperCase();
  const amountTotal = (session.amount_total ?? 0) / 100;

  const lines: Line[] =
    session.line_items?.data.map((li: any) => ({
      name: li.description as string,
      quantity: li.quantity ?? 1,
      amountSubtotal: (li.amount_subtotal ?? 0) / 100,
    })) || [];

  // Genera un id corto de pedido (ej: cs_abcd... -> ABCD1234)
  const last8 = sessionId.replace("cs_", "").slice(-8).toUpperCase();
  const orderIdShort = `SN-${last8}`;

  return {
    props: {
      orderIdShort,
      amountTotal,
      currency,
      lines,
    },
  };
};

export default function Success({ orderIdShort, amountTotal, currency, lines }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-400 mb-6">
          Gracias por tu compra en <span className="font-semibold">SANNATAN</span>.
          <br />
          <span className="text-sm opacity-80">Pedido: {orderIdShort}</span>
        </p>

        <div className="bg-white/5 rounded-xl p-4 text-left space-y-2 mb-4">
          <div className="flex items-center justify-between font-medium">
            <span>Resumen</span>
            <span>
              {amountTotal.toLocaleString(undefined, { style: "currency", currency })} {currency}
            </span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <ul className="space-y-1">
            {lines.map((l, i) => (
              <li key={i} className="flex items-center justify-between text-sm text-gray-300">
                <span>
                  {l.name} × {l.quantity}
                </span>
                <span>
                  {l.amountSubtotal.toLocaleString(undefined, {
                    style: "currency",
                    currency,
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a href="/catalog" className="btn-primary inline-block">
          Volver al catálogo
        </a>
      </div>
    </div>
  );
}


export default function Checkout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">Checkout (Demo)</h1>
      <p className="text-gray-400 max-w-xl text-center">
        Este es un flujo de compra en modo demo. Cuando activemos Stripe real,
        te llevaremos a Stripe Checkout para completar el pago.
      </p>
    </div>
  );
}

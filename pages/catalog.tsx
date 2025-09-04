import { motion } from "framer-motion";
import { useState } from "react";

type Product = { id: number; name: string; price: number; image: string };

const products: Product[] = [
  { id: 1, name: "Camiseta Gótica", price: 40, image: "https://picsum.photos/id/237/800/800" },
  { id: 2, name: "Hoodie Exclusivo", price: 80, image: "https://picsum.photos/id/1025/800/800" },
  { id: 3, name: "Cap SANNATAN", price: 35, image: "https://picsum.photos/id/1062/800/800" },
];

export default function Catalog() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleBuy = async (p: Product) => {
    try {
      setLoadingId(p.id);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ name: p.name, price: p.price, quantity: 1 }] }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url; // REDIRIGE A STRIPE
      else alert("No se pudo crear la sesión de pago.");
    } catch {
      alert("Error creando la sesión de pago.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Catálogo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="card">
            <img src={p.image} alt={p.name} className="rounded-xl w-full h-auto mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-gray-400">${p.price}</p>
              </div>
              {/* ⚠️ Asegúrate de que NO quede ningún <Link href="/checkout" /> */}
              <button
                onClick={() => handleBuy(p)}
                className="btn-primary"
                disabled={loadingId === p.id}
              >
                {loadingId === p.id ? "Redirigiendo..." : "Comprar"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        Tarjeta de prueba: <code>4242 4242 4242 4242</code>, fecha futura, CVC cualquiera

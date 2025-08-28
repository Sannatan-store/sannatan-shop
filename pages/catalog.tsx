import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  { id: 1, name: "Camiseta Gótica", price: 40, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Hoodie Exclusivo", price: 80, image: "https://via.placeholder.com/300" }
];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <motion.div 
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-xl shadow-lg"
          >
            <img src={product.image} alt={product.name} className="rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-400">${product.price}</p>
            <Link href="/checkout">
              <button className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition">
                Comprar
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

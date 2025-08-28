import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-5xl font-bold tracking-wide"
      >
        SANNATAN SHOP
      </motion.h1>
      <p className="mt-4 text-lg text-gray-400">Streetwear exclusivo con esencia urbana.</p>
      <Link href="/catalog">
        <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl shadow-lg hover:bg-gray-200 transition">
          Ver Catálogo
        </button>
      </Link>
    </div>
  );
}

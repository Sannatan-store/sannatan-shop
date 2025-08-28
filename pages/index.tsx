
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold tracking-tight"
      >
        SANNATAN
      </motion.h1>
      <p className="mt-4 text-gray-400 max-w-xl">
        Streetwear exclusivo con estética urbana y gótica. Colecciones limitadas.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/catalog" className="btn-primary">Ver Catálogo</Link>
        <Link href="/launches" className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">Lanzamientos</Link>
      </div>
    </main>
  );
}

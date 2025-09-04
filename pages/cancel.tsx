export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card text-center">
        <h1 className="text-3xl font-bold mb-2">Pago cancelado</h1>
        <p className="text-gray-400">No se realizó ningún cargo. Puedes intentar nuevamente.</p>
        <a href="/catalog" className="btn-primary mt-4 inline-block">Volver al catálogo</a>
      </div>
    </div>
  );
}

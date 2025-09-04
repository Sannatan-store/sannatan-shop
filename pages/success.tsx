import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const { query } = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof query.session_id === "string") {
      setSessionId(query.session_id);
    }
  }, [query.session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card text-center">
        <h1 className="text-3xl font-bold mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-400">
          Gracias por tu compra en SANNATAN
          {sessionId ? ` (Ref: ${sessionId})` : ""}.
        </p>
      </div>
    </div>
  );
}

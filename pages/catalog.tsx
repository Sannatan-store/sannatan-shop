const handleBuy = async (p: Product) => {
  try {
    setLoadingId(p.id);
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ name: p.name, price: p.price, quantity: 1 }] }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "API error");
    }
    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Respuesta inválida del servidor");
    }
  } catch (e: any) {
    alert(`No se pudo crear la sesión de pago: ${e.message}`);
  } finally {
    setLoadingId(null);
  }
};

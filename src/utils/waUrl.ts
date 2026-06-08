export function buildWaOrderUrl(
  number: string,
  name: string,
  phone: string,
  address: string,
  notes: string,
  itemsText: string,
  shippingMethod: string,
  shippingCost: number,
  total: number,
  pointsEarned: number,
  orderId: string,
  currencySymbol: string,
): string {
  const msg = encodeURIComponent(
    `🖤 *NEKO STORE — Nuevo Pedido*\nID: ${orderId}\n\n👤 *Cliente:* ${name}\n📱 *WhatsApp:* ${phone}\n🏠 *Dirección:* ${address || 'Recogida en tienda'}\n\n🛍️ *Productos:*\n${itemsText}\n\n🚚 *Envío:* ${shippingMethod} ${shippingCost === 0 ? '(Gratis)' : `— ${currencySymbol}${shippingCost}`}\n✦ *Total:* ${currencySymbol}${total.toFixed(2)}\n⭐ *Puntos ganados:* ${pointsEarned} pts${notes ? `\n\n📝 *Notas:* ${notes}` : ''}\n\n_Gracias por comprar en Neko Store 🐱_`,
  )
  return `https://wa.me/${number}?text=${msg}`
}

export function buildContactWaUrl(number: string): string {
  return `https://wa.me/${number}`
}

export function buildIntlMailtoUrl(
  to: string,
  name: string,
  email: string,
  country: string,
  message: string,
): string {
  const subject = encodeURIComponent(`[Neko Store] Consulta internacional de ${name} — ${country}`)
  const body = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${email}\nPaís: ${country}\n\nMensaje:\n${message}\n\n---\nEnviado desde nekostore.cr`,
  )
  return `mailto:${to}?subject=${subject}&body=${body}`
}

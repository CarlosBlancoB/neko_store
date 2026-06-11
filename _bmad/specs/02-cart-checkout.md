# Spec: Carrito + Checkout

## Description
Carrito de compras persistente con sidebar, calculo de subtotal/descuento/envio, reserva temporal de stock y envio de pedido por WhatsApp.

## Reglas de Negocio
- Al confirmar pedido se crea orden `pending_payment` y se reserva stock temporalmente.
- La reserva evita que otro cliente compre unidades que ya estan en proceso de pago.
- El stock se descuenta definitivamente solo cuando admin confirma comprobante SINPE.
- Si el comprobante se rechaza o la reserva expira, el stock reservado se libera.
- El flujo debe funcionar aunque no exista WhatsApp Business: la app genera alerta interna al admin.

## Acceptance Criteria
- [ ] Agregar items al carrito desde catálogo
- [ ] Incrementar/decrementar cantidad por item
- [ ] Eliminar items individualmente
- [ ] Seleccionar método de envío (recogida, estándar, express)
- [ ] Descuento por tier del cliente aplicado automáticamente
- [ ] Modal de checkout con formulario (nombre, teléfono, dirección)
- [ ] Envio del pedido como mensaje de WhatsApp
- [ ] Crear orden `pending_payment` antes de abrir WhatsApp
- [ ] Reservar stock por item con TTL configurable
- [ ] Mostrar productos sin stock disponible como no comprables
- [ ] Confirmacion manual admin convierte reserva en venta completada
- [ ] Rechazo/expiracion libera stock reservado
- [ ] Generar alerta interna al admin para seguimiento
- [ ] Carrito persistente en localStorage
- [ ] Limpiar carrito después de confirmar pedido

## Technical Notes
- Zustand store (cartStore.ts) con persist middleware
- Agregar `orderStore` e `inventoryStore` o extender `productStore` con `stock`, `reservedStock`, `reservationExpiresAt`
- CartSidebar en layout/, CheckoutModal + CheckoutForm en checkout/
- WhatsApp URL generado con encodeURIComponent
- getDiscount() usa TIERS para lookup según puntos del cliente
- shippingCost/shippingMethod en store, default Recogida
- Estados de orden: `pending_payment`, `paid_verified`, `payment_rejected`, `completed`, `expired`
- TTL inicial sugerido: 30 minutos; configurable desde admin cuando haya panel de operaciones

## Estado de checklist - 2026-06-10

- [x] Carrito persistente existe en `cartStore.ts`
- [x] CartSidebar, CheckoutModal, CheckoutForm y OrderSummary existen
- [x] Utilidad WhatsApp/deep link y templates existen
- [~] Crear orden antes de abrir WhatsApp existe como intencion/API; falta prueba e2e con backend
- [~] Mostrar stock/no comprable existe parcialmente en producto/catalogo; falta validar reservas concurrentes
- [ ] Reserva temporal de stock con TTL configurable cerrada end-to-end
- [ ] Confirmacion manual admin convierte reserva en venta completada
- [ ] Rechazo/expiracion libera stock reservado
- [ ] Alerta interna admin ligada a pedido pendiente

Prioridad activa: NEKO-107, NEKO-108 y NEKO-110 antes de seguir ampliando pagos.

## QA Notes
- Test unitario: addItem, updateQuantity, removeItem, getSubtotal, getTotal
- Test de integración: CartSidebar render + interacciones
- Verificar que descuento tier = 0 si customerPoints <= 0
- Test de concurrencia: dos clientes compiten por ultima unidad sin sobreventa
- Test de expiracion: reserva vencida libera stock y alerta al admin/cliente

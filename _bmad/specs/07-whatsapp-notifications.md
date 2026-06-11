# Spec: WhatsApp Notification System

## Description
Sistema de notificaciones de pedidos por WhatsApp con fallback obligatorio en app para que el flujo operativo funcione aun sin WhatsApp Business.

## Reglas Clave
- El cliente inicia pedido desde app y recibe/usa mensajes por WhatsApp.
- El admin debe poder dar seguimiento completo desde dashboard aunque no exista WhatsApp Business.
- El stock se reserva temporalmente cuando se inicia la compra y solo se descuenta definitivo al confirmar pago.
- Si se integra WhatsApp Business, la automatizacion es opcional y no reemplaza el flujo manual.

## Flujo de Pedido y Pago
1. Cliente confirma compra y se genera pedido en estado `pending_payment`.
2. Se reserva stock (`reserved`) para evitar sobreventa.
3. Se envia mensaje por WhatsApp con instrucciones de pago SINPE.
4. Cliente envia comprobante por WhatsApp.
5. Admin revisa comprobante en dashboard y marca:
   - `paid_verified` (valido) → venta completada y stock se descuenta definitivo
   - `payment_rejected` (invalido) → se libera reserva y se notifica al cliente

## Flujo Opcional con WhatsApp Business
- Parsear mensajes entrantes con patron/codigo de transferencia definido.
- Si coincide, crear alerta automatica al admin:
  - en WhatsApp (si habilitado)
  - en dashboard (siempre)
- El admin sigue teniendo confirmacion manual final antes de completar venta.

## Admin Dashboard Controls
- Configuracion en `/admin/notificaciones`:
  - toggles por tipo de notificacion
  - numero admin principal
  - habilitar/deshabilitar WhatsApp Business automation
  - patron de texto/codigo para detectar comprobantes
- Vista de alertas enlazada a ordenes para revision rapida.

## Acceptance Criteria
- [ ] Al crear pedido se genera reserva de stock temporal
- [ ] Existe flujo completo manual sin WhatsApp Business
- [ ] Confirmacion manual del admin descuenta stock de forma definitiva
- [ ] Rechazo de pago libera reserva de stock
- [ ] Alertas al admin se generan en dashboard en todos los casos
- [ ] Integracion WhatsApp Business (si activa) dispara alertas adicionales automaticamente
- [ ] Preferencias de notificacion persisten en localStorage/backend segun entorno

## Technical Notes
- Extender modelo de orden con estados: `pending_payment`, `paid_verified`, `payment_rejected`, `completed`
- Registrar `stockReservationExpiresAt` para evitar bloqueos indefinidos
- `waTemplates.ts` debe incluir templates para:
  - instrucciones de pago
  - confirmacion de pago recibido
  - rechazo de comprobante
- Enviar alertas internas via `notificationStore.pushAlert()` aun si falla WhatsApp

## QA Notes
- Probar dos clientes comprando ultimo item simultaneamente (sin sobreventa)
- Probar expiracion de reserva y liberacion de stock
- Probar flujo manual completo sin WhatsApp Business
- Probar modo hibrido con deteccion automatica + aprobacion manual admin

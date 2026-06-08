# NEKO STORE — Integración WhatsApp

## Arquitectura

```
[NEKO App] → encodeOrder() → deepLink() → wa.me ↗
                                              │
                 ┌────────────────────────────┘
                 ▼
          [WhatsApp Web/App]
                 │
          Usuario revisa mensaje
                 │
          Envía mensaje al negocio
                 │
                 ▼
          [NEKO Admin recibe pedido]
                 │
          Confirma manualmente
                 │
                 ▼
          [Flujo de confirmación]
```

**Principios:**
- Sin API key ni dependencias externas (usa deep links públicos `wa.me`)
- Sin backend — toda la lógica es frontend
- El pedido se genera como mensaje de texto estructurado
- El admin recibe el mensaje y confirma manualmente
- En el futuro: migrar a WhatsApp Business API

---

## WhatsApp Deep Links

### Formato Base
```
https://wa.me/{número}?text={mensaje_codificado}
```

### Reglas
- Número en formato internacional sin `+` ni espacios: `50688887777`
- Mensaje codificado con `encodeURIComponent()`
- Límite de 4096 caracteres para el mensaje
- Saltos de línea: `%0A`

### Utility Function
```typescript
// src/utils/whatsapp.ts

const STORE_PHONE = '50688887777'; // configurable via useConfigStore

export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const cleaned = phone.replace(/[\s\+\-\(\)]/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(phone: string, message: string): void {
  const link = generateWhatsAppLink(phone, message);
  window.open(link, '_blank');
}

export function isWhatsAppAvailable(): boolean {
  // Detectar si estamos en mobile (WA app) o desktop (WA Web)
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  // En mobile, wa.me abre la app; en desktop, abre WA Web
  return true; // wa.me funciona en todos lados
}
```

---

## Order Flow

### Step 1: Cart → Checkout
```
CartSidebar → "Pedir por WhatsApp" → CheckoutModal
```

### Step 2: CheckoutForm
Usuario llena:
- Nombre completo (required)
- Teléfono (+506 automático, readonly prefix, 8 dígitos)
- Provincia (select)
- Cantón (select, filtra por provincia)
- Distrito (select, filtra por cantón)
- Señas exactas (textarea, min 10 chars)
- Notas (textarea, opcional)

### Step 3: OrderSummary
Preview del mensaje que se va a enviar:
```
🦇 *NUEVO PEDIDO - NEKO STORE* 🦇
────────────────────
*Cliente:* {nombre}
*Tel:* {teléfono}
*Envío:* {provincia}, {cantón}, {distrito}
*Señas:* {señas}
────────────────────
*1x* Corset Vampiro (M)  — ₡18,500
*2x* Falda Terciopelo (S) — ₡22,000
────────────────────
*Subtotal:* ₡40,500
*Envío:* ₡3,500
*Total:* ₡44,000
*Método:* WhatsApp
────────────────────
*Notas:* {notas}
────────────────────
🦇 Gracias por tu compra 🦇
```

### Step 4: Confirm → Open WhatsApp
```
Usuario click "Confirmar y enviar"
  → generateWhatsAppLink(STORE_PHONE, encodedMessage)
  → window.open(link, '_blank')
  → useCartStore.clearCart()
  → useNotificationStore.addNotification('success', 'Pedido enviado')
```

---

## Template Messages

### Template: New Order
```typescript
export function encodeNewOrder(
  items: CartItem[],
  totals: CartTotals,
  customer: CustomerInfo,
  shipping: ShippingInfo
): string {
  const lines: string[] = [
    '🦇 *NUEVO PEDIDO - NEKO STORE* 🦇',
    '────────────────────',
    `*Cliente:* ${customer.name}`,
    `*Tel:* ${customer.phone}`,
    `*Envío:* ${shipping.address.province}, ${shipping.address.canton}, ${shipping.address.district}`,
    `*Señas:* ${shipping.address.details}`,
    `*Método envío:* ${shipping.method}`,
    '────────────────────',
  ];

  items.forEach(item => {
    lines.push(`*${item.quantity}x* ${item.name} (${item.size}) — ₡${(item.price * item.quantity).toLocaleString()}`);
  });

  lines.push(
    '────────────────────',
    `*Subtotal:* ₡${totals.subtotal.toLocaleString()}`,
    `*Envío:* ₡${totals.shipping.toLocaleString()}`,
    `*Total:* ₡${totals.total.toLocaleString()}`,
    '────────────────────',
  );

  if (customer.notes) {
    lines.push(`*Notas:* ${customer.notes}`);
    lines.push('────────────────────');
  }

  lines.push('🦇 Gracias por tu compra 🦇');

  return lines.join('\n');
}
```

### Template: Order Confirmation
```typescript
export function encodeOrderConfirmation(
  order: Order
): string {
  // Mensaje para que el negocio confirme al cliente
  return [
    '🦇 *CONFIRMACIÓN - NEKO STORE* 🦇',
    '────────────────────',
    `¡Hola ${order.customerName}!`,
    '',
    'Recibimos tu pedido correctamente ✅',
    `*Pedido:* #${order.id}`,
    `*Total:* ₡${order.totals.total.toLocaleString()}`,
    `*Estado:* Confirmado`,
    '',
    'Te escribimos pronto para coordinar la entrega.',
    '────────────────────',
    '📞 Cualquier consulta: 8888-7777',
    '🦇 Abrazos vampíricos 🦇',
  ].join('\n');
}
```

### Template: Shipping Update
```typescript
export function encodeShippingUpdate(
  order: Order,
  status: string
): string {
  return [
    '🦇 *ACTUALIZACIÓN DE ENVÍO - NEKO STORE* 🦇',
    '────────────────────',
    `¡Hola ${order.customerName}!`,
    '',
    `Tu pedido #${order.id} está: *${status}*`,
    status === 'shipped'
      ? `📦 Fue enviado hoy y llega en ${order.shipping.estimatedDelivery}.`
      : status === 'delivered'
        ? '✅ Ya fue entregado. ¡Disfrutalo!'
        : '',
    '',
    '────────────────────',
    '🦇 Gracias por comprar en NEKO',
  ].join('\n');
}
```

---

## Phone Number Formatting (CR +506)

```typescript
// src/utils/validators.ts

const CR_PHONE_REGEX = /^\+506[2-8]\d{7}$/;

export function formatCRPhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+506')) {
    const digits = cleaned.slice(4);
    if (digits.length === 8) {
      return `+506 ${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
  }
  if (/^\d{8}$/.test(cleaned)) {
    return `+506 ${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return cleaned;
}

export function validateCRPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return CR_PHONE_REGEX.test(cleaned);
}

// Input component behavior:
// - Prefix "+506" fijo y no editable
// - Input de 8 dígitos numéricos
// - Auto-formato: "+506 8888-7777"
// - Validación en tiempo real
```

### CR Phone Input Component
```typescript
interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  error?: string;
}

// Comportamiento:
// 1. Muestra "+506" como prefijo readonly
// 2. Input acepta solo 8 dígitos
// 3. Formatea automáticamente: "8888-7777"
// 4. Almacena como: "+50688887777"
// 5. Valida: primer dígito debe ser 2-8
```

---

## International Fallback (Email)

Si WhatsApp no está disponible o el usuario prefiere email:

```typescript
export function generateEmailLink(
  email: string,
  subject: string,
  body: string
): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Uso en CheckoutModal:
// - Botón principal: "Pedir por WhatsApp"
// - Botón secundario: "Enviar por correo"
// - Si detecta que wa.me no abre (timeout), sugerir email
```

### Email Fallback Template
```
Asunto: Nuevo Pedido - NEKO STORE - [Nombre Cliente]

Cuerpo: (mismo contenido que el template de WhatsApp)
```

---

## WhatsApp Business API (Future)

### Notas de Integración Futura

**Requisitos:**
1. Número de negocio registrado en WhatsApp Business API
2. Provedor: Twilio, MessageBird, o 360dialog
3. Aprobación de templates por Facebook
4. Webhook para recibir mensajes entrantes

**Cambios necesarios:**
- Reemplazar deep links por API calls
- Implementar webhook endpoint (backend)
- Base de datos para pedidos
- Sistema de notificaciones automáticas
- Confirmación de entrega automática

**Arquitectura futura:**
```
[NEKO Frontend] → API Gateway → [WhatsApp Business API]
                                      │
                            Webhook → [NEKO Backend]
                                      │
                              [Base de Datos]
```

**Costos estimados:**
- Template messages: ~$0.005 - $0.08 por mensaje (depende del país)
- Número de teléfono: ~$1/mes
- Provedor API: ~$0 - $50/mes

**Timeline sugerido:** Fase 5 del roadmap (post-MVP)

# Spec: Notificaciones + Alertas + UI State

## Description
Sistema unificado de notificaciones (toast + centro de alertas) y estado global de UI. Incluye alertas para cliente y admin con retencion de 7 dias y borrado manual.

## Acceptance Criteria
- [ ] Toast notifications con tipo (success, warning, error, info)
- [ ] Toast se auto-destruyen despues de 4 segundos
- [ ] Multiples notificaciones simultaneas con stacking
- [ ] Centro de alertas para cliente y para admin en sus dashboards
- [ ] Cada alerta tiene detalle y accion de navegacion contextual (ej. compras → ordenes)
- [ ] Alertas se conservan maximo 7 dias si no se borran manualmente
- [ ] Usuario/admin pueden borrar alertas individuales o limpiar lote
- [ ] Drop counter de navbar no deja margen residual al ocultarse
- [ ] Drop counter es gestionable desde dashboard (mostrar/ocultar/configurar)
- [ ] Persistencia de tema (dark/light) en localStorage
- [~] Push PWA para admin: suscripcion de dispositivo y alerta OTP pendiente sin WhatsApp Business

## Technical Notes
- `notificationStore.ts`: separar `toasts` de `alerts`
- `alerts` requieren: `id`, `roleScope`, `type`, `title`, `message`, `createdAt`, `expiresAt`, `ctaRoute`, `readAt`
- Politica TTL: purge automatico (`expiresAt = createdAt + 7 dias`)
- `uiStore.ts`: flags para cart, paneles, modales y estado de drop alert en layout
- Configuracion de drop counter en store dedicado (`dropConfigStore`) editable desde dashboard
- Web Push usa VAPID (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`) y tabla `push_subscriptions`.
- Flujo sin WhatsApp Business: OTP genera alerta admin + push PWA; admin envia el codigo por WhatsApp manual.

## QA Notes
- `pushToast()` y `pushAlert()` deben generar IDs estables y timestamp valido
- Verificar purge automatico de alertas expiradas al cargar app y en intervalos
- Verificar CTA de alerta de compra redirige a seccion de ordenes correspondiente
- Verificar navbar no conserva espacio cuando drop counter esta desactivado

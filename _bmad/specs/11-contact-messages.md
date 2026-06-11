# 11 - Mensajes de contacto

## Objetivo

La pagina `/contacto` debe permitir que una persona envie una consulta general a NEKO y que el admin la gestione desde `/admin`, sin depender de email manual ni de datos hardcoded.

## Fuente de verdad

- PostgreSQL es la fuente de verdad.
- Tabla: `contact_messages`.
- El frontend solo envia formularios y lista datos desde API.

## Flujo cliente

1. Cliente abre `/contacto`.
2. Completa nombre, asunto, mensaje y al menos WhatsApp o email.
3. Frontend envia `POST /api/contact`.
4. Backend guarda el mensaje y crea alerta admin `form_filled_admin`.
5. UI confirma que el mensaje fue enviado.

## Flujo admin

1. Admin abre tab `Mensajes`.
2. Ve mensajes ordenados por fecha, con filtros por estado.
3. Puede cambiar estado: `new`, `in_review`, `answered`, `archived`.
4. Puede guardar nota interna.

## Criterios de aceptacion

- [x] Formulario visible en `/contacto` junto al contacto por WhatsApp.
- [x] Mensajes persisten en PostgreSQL.
- [x] Admin puede listar, filtrar y actualizar mensajes.
- [x] Envio de formulario genera alerta para admin.
- [ ] Agregar tests de integracion backend para `POST /api/contact`.
- [ ] Agregar E2E de cliente envia mensaje y admin lo ve.

## No incluido

- Envio automatico de email.
- WhatsApp Business API.
- Mensajes internacionales separados.

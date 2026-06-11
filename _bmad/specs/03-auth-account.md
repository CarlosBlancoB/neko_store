# Spec: Autenticacion + Cuenta

## Description
Autenticacion basada en numero de telefono con verificacion OTP por WhatsApp. El registro solo pide datos minimos y el resto del perfil se completa en dashboard.

## Reglas de Negocio
- Registro obligatorio: nombre, apellidos, edad y telefono.
- Login: el usuario ingresa su numero, recibe codigo OTP por WhatsApp, verifica el codigo y luego se crea sesion.
- No existe acceso directo solo por numero sin verificar codigo.
- Datos opcionales en dashboard: correo, foto, direccion (formato compatible con Correos de Costa Rica), cedula y 2FA.

## Acceptance Criteria
- [ ] Registro crea cliente solo si nombre, apellidos, edad y telefono estan completos
- [ ] Al registrar/iniciar sesion, se envia OTP por WhatsApp al numero ingresado
- [ ] Solo al validar OTP correctamente se crea sesion activa
- [ ] Login falla con OTP expirado o invalido
- [ ] Dashboard permite editar campos opcionales del perfil
- [ ] Dashboard permite activar/desactivar 2FA opcional
- [ ] Cuenta demo (Valentina Neko, 1620 pts, tier ECLIPSE) se mantiene para QA
- [ ] Historial de pedidos y stats de cuenta se mantienen disponibles

## Technical Notes
- `authStore.ts` maneja estado de sesion + estado de desafio OTP (`pendingOtpChallenge`)
- `customers` persistidos por telefono normalizado
- `seedDemoAccount()` en store, no en componente
- Agregar `profile` con campos opcionales: `email`, `photoUrl`, `address`, `cedula`, `twoFactorEnabled`
- `address` debe modelarse con estructura reutilizable para integracion logistica tipo Correos CR

## Estado de checklist - 2026-06-10

- [x] `authStore.ts`, AccountLogin, CustomerOTPLogin, AccountDashboard, OrderHistory y StatsGrid existen
- [x] Cuenta demo Valentina Neko se mantiene como dato de QA
- [x] Historial/stats de cuenta existen a nivel UI/store/API
- [~] Registro/login OTP existe en frontend y rutas customer-auth; falta validar que no haya acceso alterno no deseado por password en flujo cliente
- [~] Perfil opcional/2FA existe parcialmente con dashboard/admin 2FA; falta cerrar modelo de perfil y QA
- [ ] OTP WhatsApp real/enviado al numero ingresado en todos los flujos
- [ ] Expiracion/reintentos OTP verificados con pruebas

Prioridad activa: NEKO-102 y NEKO-103. El backend conserva rutas `/api/auth` con password; deben quedar como admin/dev o migrarse para que el flujo cliente sea passwordless.

## QA Notes
- Tests unitarios: register, requestOtp, verifyOtp, login, logout, updateProfile, toggle2FA
- Verificar que no se puede crear sesion sin OTP valido
- Verificar expiracion de OTP y reintentos maximos

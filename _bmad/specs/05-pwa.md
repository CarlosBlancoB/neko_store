# Spec: PWA (Progressive Web App)

## Description
Aplicación instalable con Service Worker, offline fallback, y soporte para instalación.

## Acceptance Criteria
- [ ] Manifest con icons SVG, theme_color, display standalone
- [ ] Service Worker generado por Workbox con precaching
- [ ] Navegación offline con fallback page (offline.html)
- [ ] Runtime caching para imágenes de Unsplash (CacheFirst, 30 días)
- [ ] Botón de instalación (beforeinstallprompt)
- [ ] Detección de actualización del SW (nuevo contenido disponible)
- [ ] Auto-registro del SW al cargar la app

## Technical Notes
- vite-plugin-pwa con registerType: autoUpdate
- navigateFallback: '/offline.html' para SPA routing offline
- useInstallPrompt hook maneja beforeinstallprompt + appinstalled
- useSWUpdate hook usa useRegisterSW de virtual:pwa-register/react
- icons en public/icons/ como .svg

## Estado de checklist - 2026-06-10

- [x] vite-plugin-pwa esta instalado y configurado en el proyecto
- [x] `public/offline.html` existe
- [x] `useInstallPrompt` existe para `beforeinstallprompt` y `appinstalled`
- [x] `useSWUpdate` existe para flujo de actualizacion
- [~] Manifest/SW/offline fallback presentes a nivel implementacion; falta auditoria Lighthouse y prueba offline manual
- [ ] Runtime caching de imagenes externas verificado
- [ ] PWA score >= 90 verificado

## QA Notes
- Lighthouse audit: PWA badge, installable, offline
- Verificar offline.html se muestra sin conexión
- Verificar actualización detectada cuando cambia SW

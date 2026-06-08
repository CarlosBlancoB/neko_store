# NEKO STORE — Especificación PWA

## Manifest Configuration (`vite-plugin-pwa`)

### `vite.config.ts` (PWA section)
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'fonts/*'],
  manifest: {
    name: 'NEKO STORE',
    short_name: 'NEKO',
    description: 'Tienda gótica de moda alternativa — Costa Rica',
    lang: 'es-CR',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    categories: ['fashion', 'shopping', 'gothic'],
    icons: [
      {
        src: 'icons/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: 'screenshots/home.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Pantalla principal de NEKO STORE',
      },
      {
        src: 'screenshots/catalog.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Catálogo de productos',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/images\.neko\.cr\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'product-images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\/api\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60, // 1 hora
          },
          networkTimeoutSeconds: 5,
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
})
```

## Service Worker Strategy

### Caching Strategy Matrix
| Recurso | Estrategia | Cache Name | TTL | Prioridad |
|---------|-----------|------------|-----|-----------|
| HTML (shell) | NetworkFirst | shell-cache | sesión | Alta |
| CSS/JS bundles | CacheFirst | static-assets | 30 días | Alta |
| Imágenes de productos | CacheFirst | product-images | 7 días | Media |
| Google Fonts | CacheFirst | google-fonts | 30 días | Alta |
| Iconos PWA | CacheFirst | static-assets | ∞ | Alta |
| Datos de API | NetworkFirst | api-cache | 1 hora | Media |
| Catalog data | StaleWhileRevalidate | catalog-cache | 1 día | Media |
| Página offline | CacheFirst (precached) | offline-page | ∞ | Alta |

### Offline Fallback

```
[Usuario sin conexión navega a cualquier ruta]
  │
  ├── ¿Recurso en cache? → Servir desde cache
  │
  └── No en cache → Mostrar offline fallback page
        │
        ▼
    "Parece que no tenés conexión 🦇
     Pero no te preocupés, acá tenés lo último que viste:
     [Últimos productos vistos del cache]
     [Botón: Reintentar conexión]
     [Botón: Contactar por WhatsApp]"
```

### Offline Fallback HTML (sketch)
```html
<!DOCTYPE html>
<html lang="es-CR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sin conexión — NEKO STORE</title>
  <style>
    /* inline minimal styles para que funcione offline */
  </style>
</head>
<body>
  <div class="offline-container">
    <h1>🦇 Sin conexión</h1>
    <p>Parece que no tenés internet.</p>
    <p>Pero no te preocupés, tus productos favoritos te esperan.</p>
    <div id="cached-products">
      <!-- renderizado desde cache -->
    </div>
    <button onclick="window.location.reload()">Reintentar</button>
    <a href="https://wa.me/50688887777">Contactar por WhatsApp</a>
  </div>
  <script>
    // Service worker registration fallback logic
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        // check if we can go online
      });
    }
  </script>
</body>
</html>
```

## Install Prompt Handling

### Custom Install UI
```typescript
// src/hooks/useInstallPrompt.ts
interface InstallPromptState {
  isInstallable: boolean;
  prompt: BeforeInstallPromptEvent | null;
  install: () => Promise<void>;
  dismiss: () => void;
}

export function useInstallPrompt(): InstallPromptState {
  const [isInstallable, setIsInstallable] = useState(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const result = await prompt.userChoice;
    setPrompt(null);
    setIsInstallable(false);
    return result;
  };

  const dismiss = () => {
    setPrompt(null);
    setIsInstallable(false);
    // Guardar en localStorage para no mostrar por 30 días
    localStorage.setItem('neko-install-dismissed', Date.now().toString());
  };

  return { isInstallable, prompt, install, dismiss };
}
```

### Install Prompt UI Component
```typescript
// Aparece como banner inferior cuando:
// 1. isInstallable = true
// 2. No se ha dismissado en los últimos 30 días
// 3. El usuario no ha instalado aún

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}
```

### Criteria for Install Banner Display
- `beforeinstallprompt` event fired
- No está en standalone mode (`window.matchMedia('(display-mode: standalone)').matches === false`)
- No se ha dismissado en últimos 30 días
- Usuario ha visitado al menos 2 páginas
- Usuario ha pasado al menos 30 segundos en el sitio

## Update Flow

### Service Worker Update Detection
```typescript
// src/hooks/useSWUpdate.ts
export function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        setRegistration(reg);

        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          if (!newSW) return;

          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });
      });
    }
  }, []);

  const applyUpdate = () => {
    if (!registration?.waiting) return;
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  };

  return { updateAvailable, applyUpdate };
}
```

### Update Notification UI
```typescript
// Componente que se muestra cuando updateAvailable = true
// "Nueva versión disponible 🦇 ¿Actualizar?"
// Botones: [Actualizar ahora] [Más tarde]
```

## Push Notifications (Future — Firebase Cloud Messaging)

### Architecture (future)
```
[Admin panel] → [Firebase Cloud Messaging] → [SW Push Event]
  → Mostrar notificación nativa
  → Click → abrir NEKO en ruta específica
```

### Requirements (future)
- Firebase project setup
- VAPID keys
- `push` event listener in service worker
- Permission request flow
- Notification permission state in `useNotificationStore`
- Topic-based subscriptions (ofertas, pedidos, general)

### Permission Request Flow (future)
1. Usuario hace login o está en Account → NotifSettings
2. Toggle "Notificaciones push"
3. `Notification.requestPermission()` → "granted" | "denied"
4. Si granted → registrar subscription en Firebase
5. Guardar token en `useAuthStore.customer.preferences.push`
6. Enviar token a backend (future admin panel)

## Lighthouse PWA Audit Requirements
| Criterio | Target | Métrica |
|----------|--------|---------|
| Installable | ✅ | Manifest + SW registrado |
| Offline support | ✅ | 200 offline fallback |
| HTTPS | ✅ | Producción |
| Splash screen | ✅ | Manifest con icons + colors |
| Theme color | ✅ | `#0a0a0a` (dark), `#fafafa` (light) |
| Viewport | ✅ | `width=device-width` |
| Content sizing | ✅ | Viewport units |
| App icon | ✅ | 192px + 512px maskable |
| Fast reloads | ✅ | SW caching strategy |
| URL navigation | ✅ | SPA with client-side routing |

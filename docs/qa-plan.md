# NEKO STORE — Estrategia de QA

## Testing Strategy

### Niveles de Prueba

```
                    ┌──────────────┐
                    │    E2E       │  Playwright
                    │  (critico)   │  3 flujos
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ Integracion  │  Vitest + RTL
                    │  (stores)    │  6 stores
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   Unitaria   │  Vitest
                    │ (componentes)│  30+ tests
                    └──────────────┘
```

### Unit Testing (Vitest)
- **Framework:** Vitest + @testing-library/react
- **Coverage target:** 80% lines, 80% branches, 80% functions
- **Location:** `src/__tests__/` mirroring src structure
- **Run:** `npm run test` (watch), `npm run test:run` (CI), `npm run test:coverage`

### Integration Testing (Vitest)
- Test Zustand stores in isolation
- Test component + store integration
- Mock only browser APIs (localStorage, fetch, window.open)
- Test all actions and derived state

### E2E Testing (Playwright)
- **Framework:** Playwright
- **Location:** `e2e/`
- **Browsers:** Chromium, Firefox, WebKit
- **Run:** `npm run test:e2e` (headed), `npm run test:e2e:ci` (headless)

---

## Test Coverage Requirements

### Minimum Coverage: 80%

| Area | Target | Critical Paths |
|------|--------|----------------|
| Stores (all 6) | 95% | addItem, removeItem, addPoints, redeem, login |
| Catalog components | 85% | render, filter, add to cart |
| Cart components | 90% | quantity update, remove, totals |
| Checkout flow | 85% | form validation, encode, deep link |
| Auth components | 80% | login, logout, session |
| Loyalty components | 85% | points display, tier, redeem |
| Shared components | 75% | render, variants, click handlers |
| Utils | 95% | currency, validators, whatsapp, formatters |
| WhatsApp integration | 90% | encode, deep link, templates |

### Coverage Enforcement
- CI pipeline blocks merge if coverage drops below threshold
- `npm run test:coverage` generates HTML report in `coverage/`

---

## Critical User Flows (E2E)

### Flow 1: Product Browse → Add to Cart → Checkout → WhatsApp Order
```
1. Navegar a /
2. Ver catalogo de productos
3. Filtrar por categoria "vestidos"
4. Hacer click en producto → modal se abre
5. Seleccionar talla "M"
6. Click "Agregar al carrito"
7. Ver toast de confirmacion
8. Abrir carrito (click icono carrito)
9. Ver item en carrito con cantidad, precio correctos
10. Click "Pedir por WhatsApp"
11. Checkout modal se abre
12. Llenar formulario de envio:
    - Nombre: "Maria Perez"
    - Telefono: "88887777"
    - Provincia: "San Jose"
    - Canton: "Tibas"
    - Distrito: "Anselmo Llorente"
    - Senas: "De la iglesia 100m sur, casa roja"
13. Click "Siguiente"
14. Ver resumen de orden con items y totales correctos
15. Click "Confirmar y enviar por WhatsApp"
16. Verificar que se abre wa.me con URL correcta
17. Verificar mensaje contiene:
    - Nombre del producto
    - Talla M
    - Cantidad 1
    - Subtotal, envio, total
    - Datos de envio
18. Ver toast de "Pedido enviado"
19. Verificar carrito vacio
```

### Flow 2: Login → Loyalty Dashboard → Redeem Reward
```
1. Navegar a /cuenta
2. Ver pantalla de login
3. Ingresar numero: "88887777"
4. Click "Enviar codigo"
5. Ver campo OTP
6. Ingresar OTP "0000"
7. Click "Verificar"
8. Ver dashboard con:
    - Nombre de usuario
    - Stats (ordenes, gastado, puntos)
9. Click tab "Lealtad"
10. Ver LoyaltyCard con tier actual y puntos
11. Ver ProgressBar al siguiente tier
12. Scroll a RewardsGrid
13. Ver recompensas disponibles
14. Click "Canjear" en recompensa
15. Ver modal de confirmacion
16. Click "Canjear"
17. Ver toast de "Recompensa canjeada"
18. Ver puntos actualizados (disminuidos)
```

### Flow 3: Offline Behavior
```
1. Cargar la app con conexion
2. Navegar catalogo (productos se cachean)
3. Desconectar (Playwright offline mode)
4. Recargar pagina
5. Ver offline fallback page
6. Ver productos cacheados en la pagina offline
7. Click "Reintentar"
8. Reconectar
9. Pagina carga normalmente
```

---

## Loyalty Points Calculation Tests

### Unit Test Scenarios
```typescript
describe('calculatePointsEarned', () => {
  it('calculates base points for MORTAL tier', () => {
    expect(calculatePointsEarned(1000, 'MORTAL')).toBe(1);
    expect(calculatePointsEarned(25000, 'MORTAL')).toBe(25);
    expect(calculatePointsEarned(999, 'MORTAL')).toBe(0);
  });

  it('applies SOMBRA 1.5x multiplier', () => {
    expect(calculatePointsEarned(1000, 'SOMBRA')).toBe(1); // floor(1 * 1.5)
    expect(calculatePointsEarned(2000, 'SOMBRA')).toBe(3); // floor(2 * 1.5)
  });

  it('applies ECLIPSE 2x multiplier', () => {
    expect(calculatePointsEarned(1000, 'ECLIPSE')).toBe(2);
    expect(calculatePointsEarned(25000, 'ECLIPSE')).toBe(50);
  });

  it('applies NEKO NOIR 3x multiplier', () => {
    expect(calculatePointsEarned(1000, 'NEKO NOIR')).toBe(3);
    expect(calculatePointsEarned(25000, 'NEKO NOIR')).toBe(75);
  });

  it('handles zero and negative totals', () => {
    expect(calculatePointsEarned(0, 'MORTAL')).toBe(0);
    expect(calculatePointsEarned(-100, 'MORTAL')).toBe(0);
  });
});

describe('calculateTier', () => {
  it('returns MORTAL for points < 500', () => {
    expect(calculateTier(0).name).toBe('MORTAL');
    expect(calculateTier(499).name).toBe('MORTAL');
  });

  it('returns SOMBRA for 500-1499 points', () => {
    expect(calculateTier(500).name).toBe('SOMBRA');
    expect(calculateTier(1499).name).toBe('SOMBRA');
  });

  it('returns ECLIPSE for 1500-4999 points', () => {
    expect(calculateTier(1500).name).toBe('ECLIPSE');
    expect(calculateTier(4999).name).toBe('ECLIPSE');
  });

  it('returns NEKO NOIR for 5000+ points', () => {
    expect(calculateTier(5000).name).toBe('NEKO NOIR');
    expect(calculateTier(99999).name).toBe('NEKO NOIR');
  });

  it('calculates correct discount percent', () => {
    expect(calculateTier(0).discountPercent).toBe(0);
    expect(calculateTier(500).discountPercent).toBe(5);
    expect(calculateTier(1500).discountPercent).toBe(10);
    expect(calculateTier(5000).discountPercent).toBe(20);
  });

  it('returns correct freeShipping flag', () => {
    expect(calculateTier(0).freeShipping).toBe(false);
    expect(calculateTier(500).freeShipping).toBe(false);
    expect(calculateTier(1500).freeShipping).toBe(true);
    expect(calculateTier(5000).freeShipping).toBe(true);
  });
});

describe('getExpiringPoints', () => {
  it('returns sum of points expiring within threshold', () => {
    const history = [
      { amount: 100, expiresAt: futureDate(20), source: 'purchase' },
      { amount: 200, expiresAt: futureDate(40), source: 'purchase' },
    ];
    expect(getExpiringPoints(history, 30)).toBe(100);
  });

  it('excludes redeemed points from expiration', () => {
    const history = [
      { amount: 300, expiresAt: futureDate(10), source: 'redemption' },
    ];
    expect(getExpiringPoints(history, 30)).toBe(0);
  });
});
```

---

## PWA Audit (Lighthouse)

### Target Scores
| Categoria | Minimo | Ideal |
|-----------|--------|-------|
| Performance | 80 | 95+ |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |
| PWA | 90 | 100 |

### Performance Budgets
| Metric | Budget |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Total Blocking Time (TBT) | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Speed Index | < 3.0s |
| Time to Interactive (TTI) | < 3.5s |
| Bundle size (initial) | < 200KB gzip |
| Total bundle | < 500KB gzip |

### PWA Checklist
- [ ] Manifest valid with correct icons
- [ ] Service worker registered
- [ ] Offline fallback page loads
- [ ] HTTPS in production
- [ ] Splash screen configurado
- [ ] Theme color matches design
- [ ] App can be installed
- [ ] Fast page loads with caching
- [ ] URL navigation works offline
- [ ] Content is sized correctly for viewport

---

## Accessibility Audit (axe-core + WCAG 2.1 AA)

### Audit Process
1. **Automated:** axe-core via Playwright (`@axe-core/playwright`)
2. **Manual:** Keyboard navigation test
3. **Manual:** Screen reader test (NVDA + ChromeVox)
4. **Automated:** Color contrast ratio check

### WCAG 2.1 AA Criteria Checklist
- [ ] 1.1.1 Non-text Content: all images have alt text
- [ ] 1.3.1 Info and Relationships: headings, lists, landmarks
- [ ] 1.4.1 Use of Color: info not conveyed by color alone
- [ ] 1.4.3 Contrast Minimum: 4.5:1 for normal text, 3:1 for large
- [ ] 1.4.4 Resize Text: 200% zoom no loss of content
- [ ] 2.1.1 Keyboard: all functions operable via keyboard
- [ ] 2.1.2 No Keyboard Trap: focus can move away
- [ ] 2.4.1 Bypass Blocks: skip to content link
- [ ] 2.4.2 Page Titled: descriptive title per page
- [ ] 2.4.3 Focus Order: logical tab order
- [ ] 2.4.4 Link Purpose: meaningful link text
- [ ] 2.4.7 Focus Visible: visible focus indicator
- [ ] 2.5.3 Label in Name: accessible name matches visible label
- [ ] 3.2.1 On Focus: no unexpected context change
- [ ] 3.3.1 Error Identification: clear error messages
- [ ] 3.3.2 Labels or Instructions: form field labels
- [ ] 4.1.2 Name, Role, Value: ARIA attributes correct
- [ ] 4.1.3 Status Messages: toast/alert uses aria-live

### Accessibility Testing in CI
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---

## Cross-Browser Testing Matrix

| Browser | Versions | Notes |
|---------|----------|-------|
| Chrome | Latest 2 major | Primary development |
| Firefox | Latest 2 major | Full test suite |
| Safari | Latest 2 major | WebKit rendering, PWA on iOS |
| Edge | Latest 2 major | Chromium-based, but test anyway |
| Chrome Android | Latest | Mobile PWA test |
| Safari iOS | Latest 2 major | iOS PWA, safe area, notch |
| Samsung Internet | Latest | Popular in CR, test catalog |

### Mobile Devices to Test
| Device | Screen | Browser |
|--------|--------|---------|
| iPhone SE | 375x667 | Safari |
| iPhone 14 Pro | 390x844 | Safari |
| Galaxy S23 | 360x780 | Chrome + Samsung Internet |
| Galaxy Fold | 280x653 (folded) | Chrome |
| iPad Air | 820x1180 | Safari |
| Various Android | 320px+ | Chrome |

---

## Visual Regression Testing

### Playwright Screenshot Tests
```typescript
// e2e/visual.spec.ts
test('ProductGrid matches snapshot', async ({ page }) => {
  await page.goto('/');
  const grid = page.locator('[data-testid="product-grid"]');
  await expect(grid).toHaveScreenshot('product-grid.png');
});

test('CartSidebar matches snapshot with items', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="cart-icon"]');
  const sidebar = page.locator('[data-testid="cart-sidebar"]');
  await expect(sidebar).toHaveScreenshot('cart-sidebar.png');
});
```

### Snapshot Threshold
- Default threshold: 0.1 (10% pixel difference)
- Per-component threshold configurable
- CI: fail on visual regression, require manual approval

---

## QA Checklist per Component

### Layout Components
- [ ] Navbar renders on all pages
- [ ] Navbar links navigate correctly
- [ ] Footer renders on all pages
- [ ] Theme toggle switches dark/light
- [ ] Theme persists on reload
- [ ] Responsive: nav collapses on mobile
- [ ] Mobile bottom nav works

### Catalog Components
- [ ] ProductGrid renders products from store
- [ ] Empty state when no products match filter
- [ ] Loading state with skeleton cards
- [ ] FilterBar filters by category, price, size, search
- [ ] ProductCard shows correct info (image, name, price, badge)
- [ ] ProductCard hover effect works
- [ ] ProductModal opens with correct product
- [ ] SizePicker shows available sizes
- [ ] "Agregar al carrito" adds correct item
- [ ] Badge renders correct variant

### Cart Components
- [ ] CartSidebar opens/closes smoothly
- [ ] Empty state "Carrito vacio" message
- [ ] CartItem shows correct thumbnail, name, size, qty, price
- [ ] Quantity increment/decrement works (min 1, max stock)
- [ ] Remove item works
- [ ] CartFooter shows correct subtotal, tax, shipping, total
- [ ] ShippingOptions updates total correctly
- [ ] Cart persists on page reload

### Checkout Components
- [ ] CheckoutModal opens from cart
- [ ] Form validation shows errors
- [ ] Phone input formats +506 correctly
- [ ] Province/canton/district cascade works
- [ ] OrderSummary shows correct totals
- [ ] WhatsApp deep link generates correctly
- [ ] Email fallback works
- [ ] Cart clears after successful order
- [ ] Toast notification on success

### Account Components
- [ ] Login screen shows on /cuenta when not authenticated
- [ ] Phone input validation works
- [ ] OTP mock accepts "0000"
- [ ] Dashboard shows correct stats
- [ ] Tab navigation works
- [ ] OrderHistory shows correct list
- [ ] Empty state "No hay ordenes"
- [ ] Logout works

### Loyalty Components
- [ ] LoyaltyCard shows correct tier, points, progress
- [ ] TierGrid shows all 4 tiers correctly
- [ ] Current tier is highlighted
- [ ] RewardsGrid filters by tier
- [ ] RewardCard shows correct points and availability
- [ ] Redeem flow works end-to-end
- [ ] Points update correctly after redeem
- [ ] ProgressBar animates smoothly
- [ ] Empty state when no rewards

### Shared Components
- [ ] Toast variants render correct colors
- [ ] Toast auto-dismisses after duration
- [ ] Modal traps focus correctly
- [ ] Modal closes on Escape and backdrop click
- [ ] Button variants render correctly
- [ ] Button loading state shows spinner
- [ ] Button disabled state works
- [ ] Toggle toggles and updates visually
- [ ] Badge renders correct variant colors
- [ ] Skeleton animates and matches layout

---

## Bug Reporting Template

```markdown
## Bug Report

### Descripcion
[Que paso? Que se esperaba?]

### Pasos para reproducir
1. Ir a ...
2. Hacer click en ...
3. ...
4. Error: ...

### Evidencia
[Screenshots / video / logs]

### Entorno
- Dispositivo: [iPhone 14 / Galaxy S23 / Desktop]
- OS: [iOS 18 / Android 14 / Windows 11]
- Browser: [Chrome 125 / Safari 18]
- Tema: [Dark / Light]
- Conexion: [WiFi / 4G / Offline]

### Informacion adicional
- Store state (localStorage keys relevantes):
  - neko-cart: ...
  - neko-auth: ...
- User agent: ...
- Timestamp: ...

### Severidad
[Critical / Major / Minor / Cosmetic]

### Prioridad
[P0 / P1 / P2 / P3]

### Asignado a
[Opcional]

### Labels
bug, [componente-afectado], [fase]
```

---

## QA Runbook: Pre-Release Checklist

### Pre-Release QA Runbook

1. **Smoke Tests** (5 min)
   - [ ] App loads without errors
   - [ ] All pages render
   - [ ] Theme toggle works
   - [ ] Navigation works

2. **Functional Tests** (20 min)
   - [ ] E2E Flow 1: Browse → Cart → WhatsApp
   - [ ] E2E Flow 2: Login → Loyalty → Redeem
   - [ ] E2E Flow 3: Offline behavior
   - [ ] FilterBar functionality
   - [ ] Checkout form validation

3. **Accessibility** (10 min)
   - [ ] axe-core scan passes
   - [ ] Keyboard navigation full flow
   - [ ] Screen reader test (nav, catalog, cart)

4. **Performance** (5 min)
   - [ ] Lighthouse desktop ≥ 90
   - [ ] Lighthouse mobile ≥ 80
   - [ ] Bundle size within budget

5. **PWA** (5 min)
   - [ ] Manifest valid
   - [ ] Offline fallback loads
   - [ ] Install prompt works

6. **Cross-browser** (15 min)
   - [ ] Chrome (latest) — full pass
   - [ ] Firefox (latest) — full pass
   - [ ] Safari (latest) — full pass
   - [ ] Mobile Chrome — full pass
   - [ ] Mobile Safari — full pass

7. **Regression** (15 min)
   - [ ] Visual regression tests pass
   - [ ] All unit tests pass
   - [ ] All integration tests pass
   - [ ] Coverage ≥ 80%

### Sign-off
```
QA Approver: _______________
Date: _______________
Environment: _______________
Build: _______________
Result: [PASS / FAIL]
Notes: _______________
```

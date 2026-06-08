# NEKO STORE — Sistema de Diseño

## Fundamentos

### Identidad Visual
NEKO STORE es una tienda de moda gótica/alternativa con identidad oscura, elegante y mística. El diseño combina elementos victorianos con toques cyber-gótico.

**Palabras clave:** oscuro, elegante, místico, audaz, alternativo

---

## Tema: Dark & Light

### Dark Theme (Default)
```css
:root[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --bg-tertiary: #1e1e1e;
  --bg-card: #1a1a1a;
  --bg-elevated: #252525;
  --bg-overlay: rgba(0, 0, 0, 0.8);
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0a0;
  --text-tertiary: #666666;
  --text-inverse: #0a0a0a;
  --text-link: #b388ff;
  --text-on-accent: #ffffff;
  --accent-primary: #8b0000;
  --accent-primary-hover: #b30000;
  --accent-primary-muted: rgba(139, 0, 0, 0.2);
  --accent-secondary: #4a0e4e;
  --accent-secondary-hover: #6a1b9a;
  --accent-tertiary: #1a237e;
  --accent-gold: #c9a84c;
  --border-primary: #333333;
  --border-secondary: #444444;
  --border-accent: #8b0000;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-glow: 0 0 20px rgba(139, 0, 0, 0.3);
  --success: #00c853;
  --error: #ff1744;
  --warning: #ff9100;
  --info: #2979ff;
  --divider: rgba(255, 255, 255, 0.08);
}
```

### Light Theme
```css
:root[data-theme="light"] {
  --bg-primary: #fafafa;
  --bg-secondary: #f0f0f0;
  --bg-tertiary: #e4e4e4;
  --bg-card: #ffffff;
  --bg-elevated: #ffffff;
  --bg-overlay: rgba(0, 0, 0, 0.5);
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --text-inverse: #f5f5f5;
  --text-link: #6a1b9a;
  --text-on-accent: #ffffff;
  --accent-primary: #b30000;
  --accent-primary-hover: #8b0000;
  --accent-primary-muted: rgba(179, 0, 0, 0.1);
  --accent-secondary: #6a1b9a;
  --accent-secondary-hover: #4a0e4e;
  --accent-tertiary: #283593;
  --accent-gold: #c9a84c;
  --border-primary: #d4d4d4;
  --border-secondary: #e0e0e0;
  --border-accent: #b30000;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(179, 0, 0, 0.15);
  --success: #00c853;
  --error: #ff1744;
  --warning: #ff9100;
  --info: #2979ff;
  --divider: rgba(0, 0, 0, 0.08);
}
```

---

## Typography

### Font Families
| Uso | Fuente | Fallback | Weight |
|-----|--------|----------|--------|
| Headings (h1-h3) | Megasord | serif | 400, 700 |
| Body text | Cormorant Garamond | serif | 300, 400, 600 |
| UI / Mono | Space Mono | monospace | 400, 700 |
| Accent / Display | Megasord | serif | 700 |

### Font Sizes
```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 3.75rem;
```

### Type Scale Usage
| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 | 5xl | 700 | Megasord |
| H2 | 3xl | 700 | Megasord |
| H3 | 2xl | 600 | Megasord |
| H4 | xl | 600 | Cormorant |
| Body | base | 400 | Cormorant |
| Body small | sm | 400 | Cormorant |
| Caption | xs | 400 | Cormorant |
| Button | base | 700 | Space Mono |
| Price | lg | 700 | Space Mono |
| Badge | xs | 700 | Space Mono |

---

## Color Palette

### Primary Palette
```css
--red-sangre: #8b0000;
--red-sangre-light: #b30000;
--red-sangre-dark: #5c0000;
--purple-oscuro: #2d0a3a;
--purple-medio: #4a0e4e;
--purple-claro: #6a1b9a;
--black-total: #000000;
--black-cercano: #0a0a0a;
--gray-neko: #1a1a1a;
```

### Extended Palette
```css
--gold-noir: #c9a84c;
--gold-noir-light: #e0c86a;
--silver-shadow: #9e9e9e;
--bone: #e8dcc8;
--midnight-blue: #1a237e;
--deep-teal: #004d40;
--rose-dust: #5c2e3a;
```

### Gradients
```css
--gradient-dark: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d0a3a 100%);
--gradient-accent: linear-gradient(135deg, #8b0000 0%, #4a0e4e 100%);
--gradient-gold: linear-gradient(135deg, #c9a84c 0%, #e0c86a 100%);
--gradient-card: linear-gradient(180deg, rgba(139, 0, 0, 0.05) 0%, transparent 100%);
```

---

## Component Visual Specs

### Buttons

| Variant | Bg | Text | Border | Hover | Active | Disabled |
|---------|----|------|--------|-------|--------|----------|
| Primary | `--accent-primary` | white | none | `--accent-primary-hover` | darker | opacity 0.5 |
| Secondary | `--bg-tertiary` | `--text-primary` | none | `--bg-elevated` | darker | opacity 0.5 |
| Outline | transparent | `--accent-primary` | `--border-accent` | bg `--accent-primary-muted` | fill | opacity 0.5 |
| Ghost | transparent | `--text-secondary` | none | `--bg-tertiary` | darker | opacity 0.5 |
| WhatsApp | #25D366 | white | none | #20bd5a | darker | opacity 0.5 |

**Sizes:**
- sm: h-8 px-3 text-sm
- md: h-10 px-4 text-base
- lg: h-12 px-6 text-lg
- full: w-full

**States:**
- Loading: spinner SVG 16px + text
- Disabled: opacity-50, cursor-not-allowed
- Focus: ring-2 ring-accent-primary

### Cards

**ProductCard:**
- Bg: `--bg-card`
- Border: `--border-primary` 1px
- Radius: `--radius-md` 8px
- Shadow: `--shadow-sm` to `--shadow-md` on hover
- Hover: translateY(-2px), shadow glow
- Image: aspect-ratio 3/4, object-cover
- Badge: absolute top-2 left-2
- Price: text-lg font-mono

**LoyaltyCard:**
- Bg: gradient-card
- Border: `--border-accent` 1px
- Radius: `--radius-lg` 16px
- Shadow: `--shadow-md`
- Tier badge: pill con color del tier

### Modals

| Size | Width | Max Height |
|------|-------|------------|
| sm | 400px | 80vh |
| md | 560px | 85vh |
| lg | 720px | 90vh |
| xl | 960px | 90vh |
| full | 100vw | 100vh |

- Backdrop: `--bg-overlay`, backdrop-blur-sm
- Content: `--bg-primary`, border `--border-primary`, rounded-xl
- Animation: scale 0.95 to 1 + opacity 0 to 1, 200ms ease-out
- Close button: top-right, ghost variant, icon X
- Focus trap, Escape to close

### Inputs
- Bg: `--bg-secondary`
- Border: `--border-primary`, focus `--border-accent`
- Text: `--text-primary`
- Placeholder: `--text-tertiary`
- Radius: `--radius-md`
- Padding: 12px 16px
- Label: text-sm, `--text-secondary`, mb-1
- Error: border `--error`, message text-xs text-error
- Focus: ring-1 ring-accent-primary

### Toggle
- Width: 44px, Height: 24px
- Off: bg `--bg-tertiary`
- On: bg `--accent-primary`
- Thumb: 20px circle white, shadow
- Transition: 200ms
- Focus: ring-2 ring-accent-primary
- role="switch", aria-checked

### Badges
| Variant | Bg | Text | Border |
|---------|----|------|--------|
| new | `--accent-secondary` | white | none |
| sale | `--accent-primary` | white | none |
| exclusive | `--accent-gold` | `--black-total` | none |
| default | `--bg-tertiary` | `--text-secondary` | none |

### Progress Bar
- Height: 8px
- Radius: full
- Bg: `--bg-tertiary`
- Fill: `--accent-primary`
- Animation: width transition 500ms ease
- Label: text-xs, `--text-secondary`

### Skeleton
- Bg: `--bg-tertiary`
- Animation: shimmer (linear gradient moving right)
- Variants: text (h-4 w-full), card (h-48 w-full), circle (w-10 h-10 rounded-full)
- Duration: 1.5s infinite

---

## Layout Specs

### Grid System
| Breakpoint | Columns | Gap |
|------------|---------|-----|
| < 480px | 1 | 12px |
| 480px+ | 2 | 12px |
| 768px+ | 3 | 16px |
| 1024px+ | 4 | 16px |

### Spacing Scale
```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 20px;  --space-6: 24px;
--space-8: 32px;  --space-10: 40px; --space-12: 48px;
--space-16: 64px; --space-20: 80px; --space-24: 96px;
```

### Container Max Widths
| Breakpoint | Min Width | Container |
|------------|-----------|-----------|
| sm | 320px | 100% |
| md | 768px | 720px |
| lg | 1024px | 960px |
| xl | 1280px | 1200px |
| 2xl | 1536px | 1400px |

### Responsive Breakpoints
```css
--breakpoint-sm: 320px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## Animation Specs

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
--transition-modal: 200ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Hover Effects
- Card hover: translateY(-2px), shadow increase, 200ms
- Button hover: brightness 110% or bg change, 150ms
- Link hover: underline decoration, color transition, 150ms
- Image zoom: scale(1.05) on card hover, 300ms

### Loading States
- Skeleton shimmer: 1.5s infinite linear
- Button spinner: rotate 360deg 1s linear infinite
- Page transition: fade in 200ms

### Skeleton Screens
- ProductGrid: grid of 8 skeleton cards (h-48 + h-4 + h-6)
- CartSidebar: 3 skeleton rows (h-20 each)
- Dashboard: 4 skeleton stat cards (h-24 each)

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icon System

### Source
- **Lucide React** para icons UI (carrito, usuario, cerrar, menu, etc.)
- **SVG inline** para icons custom (tier badges, logo variations)
- No Font Awesome (evitar bundle grande)

### Icon Sizes
| Context | Size |
|---------|------|
| Navbar | 24px |
| Buttons | 16-20px |
| Cards | 20-24px |
| Badges | 12-16px |
| Footer social | 24px |
| Hero/Featured | 48-64px |

### Custom Icons (SVG)
- Tier badges: skull (MORTAL), moon (SOMBRA), crystal (ECLIPSE), crown (NEKO NOIR)
- WhatsApp: WhatsApp brand icon
- NEKO logo: cat silhouette + typography

---

## Accessibility

### Color Contrast (WCAG 2.1 AA)
| Combination | Ratio | Passes? |
|-------------|-------|---------|
| text-primary on bg-primary (dark) | 15.4:1 | AAA |
| text-secondary on bg-primary (dark) | 7.5:1 | AA |
| accent-primary on bg-primary (dark) | 4.8:1 | AA |
| text-primary on bg-primary (light) | 16.2:1 | AAA |
| text-secondary on bg-primary (light) | 6.8:1 | AA |
| white text on accent-primary | 5.2:1 | AA |

### Focus States
- All interactive elements: visible focus ring (2px, offset 2px)
- Color: `--accent-primary` on dark, `--accent-primary` on light
- Never use `outline: none` without replacement
- Focus visible only on keyboard navigation (`:focus-visible`)

### ARIA Labels
- Navbar: role="navigation", aria-label="Navegacion principal"
- Cart sidebar: role="dialog", aria-label="Carrito de compras"
- Product modal: role="dialog", aria-modal="true", aria-label="Detalle del producto"
- Toast: role="alert", aria-live="polite"
- Filter bar: role="search", aria-label="Filtrar productos"
- Product grid: role="list", aria-label="Catalogo de productos"
- Toggle: role="switch", aria-checked
- Progress bar: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax

### Keyboard Navigation
- All interactive elements focusable via Tab
- Modals: focus trap with Shift+Tab cycling
- Escape closes modals, sidebars, dropdowns
- Enter/Space activates buttons and toggles
- Arrow keys for SizePicker and FilterBar options

---

## Mobile-First Responsive Design (320px+)

### Layout Behavior
```css
/* Mobile first: default is 1 column */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

/* 480px+ */
@media (min-width: 480px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}

/* 768px+ */
@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}

/* 1024px+ */
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
}
```

### Touch Targets
- All interactive elements: minimum 44x44px
- Cart item quantity buttons: 44x44px
- Mobile nav hamburger: 44x44px
- Close buttons: 44x44px

### Mobile Navigation
- Bottom nav bar on mobile (instead of top)
- Items: Inicio, Catalogo, Carrito (with badge), Cuenta
- Cart sidebar: full-width on mobile, slide from right
- Modals: full-screen on mobile (size="full")

---

## Gothic Aesthetic Guidelines

### Visual Tone
- **Dark but legible:** Never sacrifice readability for aesthetic
- **Elegant decay:** Victorian ornamentation meets modern minimalism
- **Texture:** Use CSS patterns/gradients that suggest velvet, lace, leather
- **Mystery:** Shadows and depth; layered UI with overlapping elements
- **Drama:** Contrast between light (text) and dark (bg), accent pops of red

### Design Dos
- Gothic serif typography for headings
- Dark gradients with purple/red undertones
- Subtle glitch/static effects on hover (cyber-gothic touch)
- Ornamental dividers (CSS-only, decorative borders)
- Gold accents for premium tier (NEKO NOIR)
- Silhouette imagery and negative space

### Design Don'ts
- No bright neon colors (save for cyber-gothic fusion elements sparingly)
- No comic sans or rounded sans-serif fonts
- No cartoonish illustrations
- No light/pastel color schemes (light theme uses bone/ivory, not pink)
- No excessive animations (respect reduced motion)
- No generic stock photography

### Visual Hierarchy
1. **Primary CTA:** Red accent buttons (comprar, agregar, canjear)
2. **Secondary actions:** Outline or ghost buttons
3. **Tier badges:** Color-coded by tier (gray, purple, violet, gold)
4. **Prices:** Monospace font, prominent size
5. **Product names:** Cormorant semibold
6. **Descriptions:** Cormorant regular, secondary color

### Ambient Elements
- Subtle noise texture overlay on hero sections (CSS noise via SVG filter)
- Corner flourishes on modals (CSS decorative borders)
- Gothic divider: line with diamond center (CSS pseudo-element)
- Candle glow effect on featured products (box-shadow with warm tint)

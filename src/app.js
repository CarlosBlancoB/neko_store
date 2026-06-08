// =============================================
//   NEKO STORE — App Logic v3
//   CR phone • Intl contact form • Store dashboard • Demo account
// =============================================
// ---- PICSUM ----
const GOTHIC_IMAGES = {
  gothic1:
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=900&fit=crop&q=80',
  velvet2:
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&h=900&fit=crop&q=80',
  dark3: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&h=900&fit=crop&q=80',
  aboutneko: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop&q=80',
  shadowbloom:
    'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&h=667&fit=crop&q=80',
  shadowbloom2:
    'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&h=800&fit=crop&q=80',
  velvet99:
    'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=500&h=667&fit=crop&q=80',
  velvet100:
    'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=600&h=800&fit=crop&q=80',
  darkritual:
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=667&fit=crop&q=80',
  ritual2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
  moonphase:
    'https://images.unsplash.com/photo-1615562536704-94e7f1c38a06?w=500&h=667&fit=crop&q=80',
  midnight55:
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=667&fit=crop&q=80',
  phantom88:
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=667&fit=crop&q=80',
  eclipse77:
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=667&fit=crop&q=80',
  serpent33:
    'https://images.unsplash.com/photo-1573408301185-9519f94815b0?w=500&h=667&fit=crop&q=80',
  raven44: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=667&fit=crop&q=80',
  coven11: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&h=667&fit=crop&q=80',
  gloves22:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=667&fit=crop&q=80',
  witch66: 'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=500&h=667&fit=crop&q=80',
}
function picsumUrl(seed, w, h) {
  if (GOTHIC_IMAGES[seed]) return GOTHIC_IMAGES[seed]
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}
// ---- PRODUCTS ----
const PRODUCTS = [
  {
    id: 1,
    name: 'Vestido Shadow Bloom',
    category: 'vestidos',
    price: 89,
    imgSeed: 'shadowbloom',
    imgSeedAlt: 'shadowbloom2',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Tul negro en capas que susurra con el viento. Bordados florales plateados en el corpiño. Una obra de arte oscura que florece en la noche.',
    badge: 'DROP NUEVO',
    points: 89,
    featured: true,
  },
  {
    id: 2,
    name: 'Corset Velvet Requiem',
    category: 'tops',
    price: 65,
    imgSeed: 'velvet99',
    imgSeedAlt: 'velvet100',
    sizes: ['S', 'M', 'L'],
    description:
      'Terciopelo negro intenso con encaje de seda. Cierres de gancho en acero oxidado. Solo 12 unidades disponibles.',
    badge: 'LIMITADO',
    points: 65,
    featured: true,
  },
  {
    id: 3,
    name: 'Conjunto Dark Ritual',
    category: 'conjuntos',
    price: 120,
    imgSeed: 'darkritual',
    imgSeedAlt: 'ritual2',
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Falda midi plisada y top asimétrico. La combinación que redefinió el gótico moderno. Satén y organza en negro profundo.',
    points: 120,
    featured: true,
  },
  {
    id: 4,
    name: 'Collar Moon Phase',
    category: 'accesorios',
    price: 28,
    imgSeed: 'moonphase',
    sizes: ['Único'],
    description: 'Cadena de plata oxidada con fases de la luna. Cada pieza es envejecida a mano.',
    isNew: true,
    points: 28,
    featured: true,
  },
  {
    id: 5,
    name: 'Vestido Midnight Lace',
    category: 'vestidos',
    price: 98,
    imgSeed: 'midnight55',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Encaje negro importado sobre forro de seda. Manga larga con abertura en el hombro. Elegancia oscura en cada costura.',
    points: 98,
  },
  {
    id: 6,
    name: 'Blusa Phantom Sleeve',
    category: 'tops',
    price: 48,
    imgSeed: 'phantom88',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Mangas globo en gasa negra translúcida. Frente de seda mate. El balance perfecto entre misterio y feminidad.',
    isNew: true,
    points: 48,
  },
  {
    id: 7,
    name: 'Falda Eclipse',
    category: 'conjuntos',
    price: 72,
    imgSeed: 'eclipse77',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Satén negro con destellos cósmicos bordados. Midi asimétrica con cauda trasera.',
    points: 72,
  },
  {
    id: 8,
    name: 'Anillo Serpent',
    category: 'accesorios',
    price: 22,
    imgSeed: 'serpent33',
    sizes: ['6', '7', '8', '9'],
    description: 'Plata 925 con patina oscura. Serpiente enroscada con ojo de obsidiana.',
    points: 22,
  },
  {
    id: 9,
    name: 'Top Raven Lace',
    category: 'tops',
    price: 55,
    imgSeed: 'raven44',
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Encaje crochet negro hecho a mano. Crop top con tirantes ajustables de terciopelo.',
    points: 55,
  },
  {
    id: 10,
    name: 'Vestido Coven',
    category: 'vestidos',
    price: 135,
    imgSeed: 'coven11',
    sizes: ['S', 'M', 'L'],
    description:
      'Maxi vestido de punto negro con abertura frontal. Manga larga acampanada. Para quien no teme ocupar espacio.',
    badge: 'BESTSELLER',
    points: 135,
  },
  {
    id: 11,
    name: 'Guantes Dark Lace',
    category: 'accesorios',
    price: 35,
    imgSeed: 'gloves22',
    sizes: ['S/M', 'L/XL'],
    description: 'Encaje elástico negro hasta el codo. Detalles florales victorianos.',
    points: 35,
  },
  {
    id: 12,
    name: 'Conjunto Witch Court',
    category: 'conjuntos',
    price: 145,
    imgSeed: 'witch66',
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Corset estructurado y falda de gasa en capas. La reina de la noche que siempre fuiste.',
    badge: 'EXCLUSIVO',
    points: 145,
  },
]
const REWARDS = [
  { id: 1, title: '5% Descuento', icon: '🏷️', cost: 100, type: 'discount', value: 5 },
  { id: 2, title: '10% Descuento', icon: '🖤', cost: 200, type: 'discount', value: 10 },
  { id: 3, title: 'Envío Gratis', icon: '📦', cost: 150, type: 'shipping', value: 0 },
  { id: 4, title: '15% Descuento', icon: '⭐', cost: 350, type: 'discount', value: 15 },
  { id: 5, title: 'Collar Moon Phase', icon: '🌙', cost: 500, type: 'product', value: 28 },
  { id: 6, title: '25% VIP Drop', icon: '✦', cost: 800, type: 'discount', value: 25 },
]
const TIERS = [
  { name: 'MORTAL', min: 0, max: 499, discount: 0.05 },
  { name: 'SOMBRA', min: 500, max: 1499, discount: 0.08 },
  { name: 'ECLIPSE', min: 1500, max: 3999, discount: 0.12 },
  { name: 'NEKO NOIR', min: 4000, max: Infinity, discount: 0.18 },
]
// ---- DEFAULT STORE CONFIG (Costa Rica) ----
const DEFAULT_CONFIG = {
  whatsappNumber: '50624247171',
  storeEmail: 'hola@nekostore.cr',
  instagramHandle: '@nekostore.goth',
  intlShippingEnabled: true,
  intlContactEmail: 'international@nekostore.cr',
  storeName: 'NEKO STORE',
  storeTagline: 'Moda gótica. Alma oscura.',
  currencySymbol: '$',
  dropActive: true,
  dropTitle: 'Shadow Bloom',
}
// ---- STATE ----
let cart = []
let customers = {}
let currentCustomer = null
let notifications = []
let storeConfig = Object.assign({}, DEFAULT_CONFIG)
let shippingCost = 0
let shippingMethod = 'Recogida en tienda'
let carouselIdx = 0
let carouselInterval
const selectedSizes = {}
let dropTimeLeft = 2 * 3600 + 47 * 60 + 33
let isDark = true
// ---- STORAGE ----
function save(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (_a) {}
}
function load(key, def) {
  try {
    const d = localStorage.getItem(key)
    return d ? JSON.parse(d) : def
  } catch (_a) {
    return def
  }
}
// ---- DEMO ACCOUNT SEED ----
function seedDemoAccount() {
  const demoPhone = '24247171'
  if (customers[demoPhone]) return
  const demo = {
    name: 'Valentina Neko',
    phone: demoPhone,
    points: 1620,
    tier: 'ECLIPSE',
    totalSpent: 487,
    isDemo: true,
    joinedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
    orders: [
      {
        id: 'NK-DEMO001',
        items: [
          { product: PRODUCTS[0], quantity: 1, size: 'M' },
          { product: PRODUCTS[3], quantity: 1, size: 'Único' },
        ],
        total: 117,
        shipping: 0,
        shippingMethod: 'Recogida en tienda',
        address: 'San José, Costa Rica',
        notes: '',
        date: new Date(Date.now() - 60 * 86400000).toISOString(),
        pointsEarned: 117,
        status: 'confirmado',
      },
      {
        id: 'NK-DEMO002',
        items: [
          { product: PRODUCTS[1], quantity: 1, size: 'S' },
          { product: PRODUCTS[6], quantity: 1, size: 'M' },
        ],
        total: 137,
        shipping: 5,
        shippingMethod: 'Envío estándar',
        address: 'Heredia, Costa Rica',
        notes: 'Empaque especial por favor',
        date: new Date(Date.now() - 30 * 86400000).toISOString(),
        pointsEarned: 130,
        status: 'confirmado',
      },
      {
        id: 'NK-DEMO003',
        items: [{ product: PRODUCTS[9], quantity: 1, size: 'M' }],
        total: 135,
        shipping: 0,
        shippingMethod: 'Recogida en tienda',
        address: '',
        notes: '',
        date: new Date(Date.now() - 5 * 86400000).toISOString(),
        pointsEarned: 135,
        status: 'pendiente',
      },
    ],
  }
  customers[demoPhone] = demo
  save('nekoCustomers', customers)
}
// ---- THEME ----
function toggleTheme() {
  isDark = !isDark
  applyTheme()
  save('nekoTheme', isDark ? 'dark' : 'light')
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  const moon = document.querySelector('.icon-moon')
  const sun = document.querySelector('.icon-sun')
  if (moon) moon.style.display = isDark ? 'block' : 'none'
  if (sun) sun.style.display = isDark ? 'none' : 'block'
}
// ---- NAVIGATION ----
function showSection(id) {
  document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'))
  document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'))
  const sec = document.getElementById(`section-${id}`)
  if (sec) sec.classList.add('active')
  const link = document.querySelector(`[data-section="${id}"]`)
  if (link) link.classList.add('active')
  if (id === 'account') renderAccountSection()
  if (id === 'contact') renderContactSection()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
// ---- CAROUSEL ----
function initCarousel() {
  const track = document.getElementById('carouselTrack')
  const dotsEl = document.getElementById('carouselDots')
  const slides = Array.from(track.children)
  slides.forEach((s, i) => {
    if (i === 0) s.classList.add('active')
  })
  slides.forEach((_, i) => {
    const d = document.createElement('button')
    d.className = `carousel__dot${i === 0 ? ' active' : ''}`
    d.onclick = () => {
      clearInterval(carouselInterval)
      goToSlide(i)
      startCarousel()
    }
    dotsEl.appendChild(d)
  })
  startCarousel()
}
function startCarousel() {
  carouselInterval = setInterval(() => moveCarousel(1), 5500)
}
function goToSlide(idx) {
  const track = document.getElementById('carouselTrack')
  const slides = Array.from(track.children)
  slides.forEach((s) => s.classList.remove('active'))
  carouselIdx = (idx + slides.length) % slides.length
  track.style.transform = `translateX(-${carouselIdx * 100}%)`
  slides[carouselIdx].classList.add('active')
  document
    .querySelectorAll('.carousel__dot')
    .forEach((d, i) => d.classList.toggle('active', i === carouselIdx))
}
function moveCarousel(dir) {
  clearInterval(carouselInterval)
  goToSlide(carouselIdx + dir)
  startCarousel()
}
// ---- PRODUCTS ----
function picsumImg(seed, w, h, alt, styles = '') {
  return `<img src="${picsumUrl(seed, w, h)}" alt="${alt}" loading="lazy" style="${styles}" onerror="this.src='${picsumUrl(`fallback${seed}`, w, h)}'" />`
}
function renderProductCard(p) {
  const badge = p.badge
    ? `<div class="product-card__badge">${p.badge}</div>`
    : p.isNew
      ? `<div class="product-card__badge product-card__badge--new">NUEVO</div>`
      : ''
  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      <div class="product-card__img">
        ${picsumImg(p.imgSeed, 500, 667, p.name, 'width:100%;height:100%;object-fit:cover')}
        ${badge}
        <button class="product-card__wishlist" onclick="event.stopPropagation();toggleWishlist(this)">♡</button>
        <div class="product-card__overlay">
          <button class="btn-primary" onclick="event.stopPropagation();quickAddToCart(${p.id})">+ Agregar</button>
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__category">${p.category}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__bottom">
          <span class="product-card__price">${storeConfig.currencySymbol}${p.price}</span>
          <span class="product-card__pts">+${p.points} pts</span>
        </div>
      </div>
    </div>`
}
function renderFeatured() {
  document.getElementById('featuredGrid').innerHTML = PRODUCTS.filter((p) => p.featured)
    .map(renderProductCard)
    .join('')
}
function renderShop() {
  document.getElementById('shopGrid').innerHTML = PRODUCTS.map(renderProductCard).join('')
}
function filterProducts(btn) {
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'))
  btn.classList.add('active')
  const filter = btn.dataset.filter
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)
  const g = document.getElementById('shopGrid')
  g.style.opacity = '0'
  setTimeout(() => {
    g.innerHTML = list.map(renderProductCard).join('')
    g.style.opacity = '1'
    g.style.transition = 'opacity 0.3s'
  }, 150)
}
// ---- PRODUCT MODAL ----
function openProductModal(id) {
  const p = PRODUCTS.find((x) => x.id === id)
  selectedSizes[id] = selectedSizes[id] || ''
  const sizes = p.sizes
    .map(
      (s) =>
        `<button class="size-opt ${selectedSizes[id] === s ? 'selected' : ''}" onclick="selectSize(${id},'${s}',this)">${s}</button>`,
    )
    .join('')
  document.getElementById('productModalContent').innerHTML = `
    <div class="product-modal__img">${picsumImg(p.imgSeed, 600, 800, p.name, 'width:100%;height:100%;object-fit:cover')}</div>
    <div class="product-modal__details">
      <div class="product-modal__cat">${p.category}</div>
      <h2 class="product-modal__name">${p.name}</h2>
      <div class="product-modal__price">${storeConfig.currencySymbol}${p.price}</div>
      <div class="product-modal__pts">+${p.points} puntos oscuros al comprar</div>
      <p class="product-modal__desc">${p.description}</p>
      <div class="size-picker"><label>TALLA</label><div class="size-options">${sizes}</div></div>
      <button class="btn-primary btn-full" onclick="addToCart(${id})">Agregar al Carrito</button>
    </div>`
  document.getElementById('productOverlay').classList.add('active')
  document.getElementById('productModal').classList.add('active')
  document.body.style.overflow = 'hidden'
}
function closeProductModal() {
  document.getElementById('productOverlay').classList.remove('active')
  document.getElementById('productModal').classList.remove('active')
  document.body.style.overflow = ''
}
function selectSize(productId, size, el) {
  el.closest('.size-options')
    .querySelectorAll('.size-opt')
    .forEach((b) => b.classList.remove('selected'))
  el.classList.add('selected')
  selectedSizes[productId] = size
}
// ---- CART ----
function addToCart(productId) {
  const p = PRODUCTS.find((x) => x.id === productId)
  const size = selectedSizes[productId]
  if (!size) {
    showToast('Por favor selecciona una talla ✦')
    return
  }
  const ex = cart.find((c) => c.product.id === productId && c.size === size)
  if (ex) ex.quantity++
  else cart.push({ product: p, quantity: 1, size })
  updateCartUI()
  save('nekoCart', cart)
  closeProductModal()
  showToast(`${p.name} agregado 🖤`)
  openCartSidebar()
}
function quickAddToCart(id) {
  const p = PRODUCTS.find((x) => x.id === id)
  selectedSizes[id] = p.sizes[Math.floor(p.sizes.length / 2)]
  addToCart(id)
}
function removeFromCart(i) {
  cart.splice(i, 1)
  updateCartUI()
  save('nekoCart', cart)
}
function changeQty(i, d) {
  cart[i].quantity += d
  if (cart[i].quantity <= 0) removeFromCart(i)
  else {
    updateCartUI()
    save('nekoCart', cart)
  }
}
function getDiscount() {
  var _a
  if (!currentCustomer) return 0
  return (
    ((_a = TIERS.slice()
      .reverse()
      .find((t) => currentCustomer.points >= t.min)) === null || _a === void 0
      ? void 0
      : _a.discount) || 0
  )
}
function getSubtotal() {
  return cart.reduce((s, c) => s + c.product.price * c.quantity, 0)
}
function getTotal() {
  return getSubtotal() * (1 - getDiscount()) + shippingCost
}
function updateShipping(cost, method) {
  shippingCost = cost
  shippingMethod = method
  updateCartUI()
}
function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.quantity, 0)
  document.getElementById('cartBadge').textContent = String(total)
  const items = document.getElementById('cartItems')
  const footer = document.getElementById('cartFooter')
  if (!cart.length) {
    items.innerHTML = `<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>El vacío aguarda...</p></div>`
    footer.style.display = 'none'
    return
  }
  items.innerHTML = cart
    .map(
      (item, i) => `
    <div class="cart-item">
      <div class="cart-item__img">${picsumImg(item.product.imgSeed, 144, 176, item.product.name, 'width:100%;height:100%;object-fit:cover')}</div>
      <div class="cart-item__details">
        <div class="cart-item__name">${item.product.name}</div>
        <div class="cart-item__size">Talla: ${item.size}</div>
        <div class="cart-item__controls">
          <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
      <span class="cart-item__price">${storeConfig.currencySymbol}${(item.product.price * item.quantity).toFixed(0)}</span>
      <button class="cart-item__remove" onclick="removeFromCart(${i})">✕</button>
    </div>`,
    )
    .join('')
  footer.style.display = 'block'
  const sub = getSubtotal()
  const disc = getDiscount()
  document.getElementById('cartSubtotal').textContent =
    `${storeConfig.currencySymbol}${sub.toFixed(2)}`
  document.getElementById('cartTotal').textContent =
    `${storeConfig.currencySymbol}${getTotal().toFixed(2)}`
  const dr = document.getElementById('discountRow')
  if (disc > 0) {
    dr.style.display = 'flex'
    document.getElementById('discountAmt').textContent =
      `-${storeConfig.currencySymbol}${(sub * disc).toFixed(2)}`
  } else dr.style.display = 'none'
}
function toggleCart() {
  const sb = document.getElementById('cartSidebar')
  const ov = document.getElementById('cartOverlay')
  if (sb.classList.contains('open')) {
    sb.classList.remove('open')
    ov.classList.remove('active')
    document.body.style.overflow = ''
  } else openCartSidebar()
}
function openCartSidebar() {
  document.getElementById('cartSidebar').classList.add('open')
  document.getElementById('cartOverlay').classList.add('active')
  document.body.style.overflow = 'hidden'
}
function toggleWishlist(btn) {
  btn.classList.toggle('wished')
  btn.textContent = btn.classList.contains('wished') ? '♥' : '♡'
}
// ---- CHECKOUT ----
function showCheckout() {
  if (!cart.length) return
  toggleCart()
  if (currentCustomer) {
    setTimeout(() => {
      document.getElementById('checkoutName').value = currentCustomer.name
      document.getElementById('checkoutPhone').value = currentCustomer.phone
    }, 350)
  }
  setTimeout(() => {
    const s = document.getElementById('checkoutSummary')
    s.innerHTML =
      cart
        .map(
          (item) =>
            `<div class="order-summary-item"><span>${item.product.name} (${item.size}) ×${item.quantity}</span><strong>${storeConfig.currencySymbol}${(item.product.price * item.quantity).toFixed(2)}</strong></div>`,
        )
        .join('') +
      `<div class="order-summary-item"><span>${shippingMethod}</span><strong>${shippingCost === 0 ? 'Gratis' : storeConfig.currencySymbol + shippingCost}</strong></div>
       <div class="order-summary-total"><span>TOTAL</span><strong>${storeConfig.currencySymbol}${getTotal().toFixed(2)}</strong></div>`
    document.getElementById('checkoutOverlay').classList.add('active')
    document.getElementById('checkoutModal').classList.add('active')
    document.body.style.overflow = 'hidden'
  }, 300)
}
function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('active')
  document.getElementById('checkoutModal').classList.remove('active')
  document.body.style.overflow = ''
}
function confirmOrder() {
  var _a
  const name = document.getElementById('checkoutName').value.trim()
  const phone = document.getElementById('checkoutPhone').value.trim()
  const address = document.getElementById('checkoutAddress').value.trim()
  const notes = document.getElementById('checkoutNotes').value.trim()
  if (!name) {
    showToast('Por favor ingresa tu nombre ✦')
    return
  }
  if (!phone || phone.replace(/\D/g, '').length < 8) {
    showToast('Número de WhatsApp inválido ✦')
    return
  }
  const cleanPhone = phone.replace(/\D/g, '')
  const pointsEarned = Math.floor(getSubtotal())
  if (!customers[cleanPhone]) {
    customers[cleanPhone] = {
      name,
      phone: cleanPhone,
      points: 0,
      tier: 'MORTAL',
      totalSpent: 0,
      orders: [],
      joinedAt: new Date().toISOString(),
      notifSettings: { order: true, drop: true, points: true, rewards: false, offers: false },
    }
  }
  const c = customers[cleanPhone]
  c.name = name
  c.points += pointsEarned
  c.totalSpent += getTotal()
  const newTier = TIERS.slice()
    .reverse()
    .find((t) => c.points >= t.min)
  if (newTier) c.tier = newTier.name
  const orderId = `NK-${Date.now().toString(36).toUpperCase()}`
  const order = {
    id: orderId,
    items: [...cart],
    total: getTotal(),
    shipping: shippingCost,
    shippingMethod,
    address,
    notes,
    date: new Date().toISOString(),
    pointsEarned,
    status: 'pendiente',
  }
  c.orders.push(order)
  customers[cleanPhone] = c
  save('nekoCustomers', customers)
  currentCustomer = c
  save('nekoCurrent', cleanPhone)
  updateLoyaltyUI()
  pushNotification({
    icon: '🛍️',
    title: 'Pedido Recibido',
    msg: `Tu pedido ${orderId} por ${storeConfig.currencySymbol}${getTotal().toFixed(2)} fue enviado. Te contactaremos pronto.`,
    type: 'order',
  })
  if ((_a = c.notifSettings) === null || _a === void 0 ? void 0 : _a.points)
    pushNotification({
      icon: '⭐',
      title: 'Puntos Acumulados',
      msg: `Ganaste ${pointsEarned} puntos oscuros. Total: ${c.points} pts (${c.tier})`,
      type: 'points',
    })
  const itemTxt = cart
    .map(
      (item) =>
        `• ${item.product.name} (${item.size}) ×${item.quantity} — ${storeConfig.currencySymbol}${(item.product.price * item.quantity).toFixed(2)}`,
    )
    .join('\n')
  const msg = encodeURIComponent(
    `🖤 *NEKO STORE — Nuevo Pedido*\nID: ${orderId}\n\n👤 *Cliente:* ${name}\n📱 *WhatsApp:* ${phone}\n🏠 *Dirección:* ${address || 'Recogida en tienda'}\n\n🛍️ *Productos:*\n${itemTxt}\n\n🚚 *Envío:* ${shippingMethod} ${shippingCost === 0 ? '(Gratis)' : `— ${storeConfig.currencySymbol}${shippingCost}`}\n✦ *Total:* ${storeConfig.currencySymbol}${getTotal().toFixed(2)}\n⭐ *Puntos ganados:* ${pointsEarned} pts\n${notes ? `\n📝 *Notas:* ${notes}` : ''}\n\n_Gracias por comprar en Neko Store 🐱_`,
  )
  const waUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${msg}`
  closeCheckout()
  cart = []
  updateCartUI()
  save('nekoCart', cart)
  showToast(`¡Pedido ${orderId} enviado! Abriendo WhatsApp... 🖤`)
  setTimeout(() => window.open(waUrl, '_blank'), 800)
  const navPts = document.getElementById('navPoints')
  if (navPts) {
    navPts.textContent = c.points > 999 ? '✦' : String(c.points)
    navPts.style.display = 'flex'
  }
}
// ---- NOTIFICATIONS ----
function pushNotification(data) {
  const n = Object.assign(Object.assign({ id: Date.now().toString() }, data), {
    time: 'Ahora mismo',
    read: false,
  })
  notifications.unshift(n)
  if (notifications.length > 20) notifications.pop()
  save('nekoNotifs', notifications)
  renderNotifications()
}
function renderNotifications() {
  const list = document.getElementById('notifList')
  const badge = document.getElementById('notifBadge')
  const unread = notifications.filter((n) => !n.read).length
  if (unread > 0) {
    badge.style.display = 'flex'
    badge.textContent = String(unread)
  } else badge.style.display = 'none'
  if (!notifications.length) {
    list.innerHTML = `<div class="notif-empty"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg><p>Sin notificaciones</p></div>`
    return
  }
  list.innerHTML = notifications
    .map(
      (n, i) => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markRead(${i})">
      <div class="notif-item__icon">${n.icon}</div>
      <div class="notif-item__body">
        <div class="notif-item__title">${n.title}</div>
        <div class="notif-item__msg">${n.msg}</div>
        <div class="notif-item__time">${n.time}</div>
      </div>
      <button class="notif-item__dismiss" onclick="event.stopPropagation();dismissNotif(${i})">✕</button>
    </div>`,
    )
    .join('')
}
function markRead(i) {
  notifications[i].read = true
  save('nekoNotifs', notifications)
  renderNotifications()
}
function dismissNotif(i) {
  notifications.splice(i, 1)
  save('nekoNotifs', notifications)
  renderNotifications()
}
function clearNotifications() {
  notifications = []
  save('nekoNotifs', notifications)
  renderNotifications()
}
function toggleNotifications() {
  const panel = document.getElementById('notifPanel')
  const overlay = document.getElementById('notifOverlay')
  const open = panel.classList.contains('open')
  if (open) {
    panel.classList.remove('open')
    overlay.classList.remove('active')
  } else {
    panel.classList.add('open')
    overlay.classList.add('active')
    notifications.forEach((n) => (n.read = true))
    save('nekoNotifs', notifications)
    setTimeout(() => renderNotifications(), 50)
  }
}
// ---- LOYALTY ----
function renderRewards() {
  const pts =
    (currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.points) || 0
  document.getElementById('rewardsGrid').innerHTML = REWARDS.map((r) => {
    const can = pts >= r.cost
    return `<div class="reward-card ${can ? '' : 'locked'}">
      ${!can ? '<span class="reward-lock">🔒</span>' : ''}
      <div class="reward-icon">${r.icon}</div>
      <div class="reward-title">${r.title}</div>
      <div class="reward-cost">${r.cost} pts</div>
      ${can ? `<button class="btn-primary" onclick="redeemReward(${r.id})">Canjear</button>` : ''}
    </div>`
  }).join('')
}
function redeemReward(id) {
  if (!currentCustomer) {
    showToast('Debes registrarte primero ✦')
    return
  }
  const r = REWARDS.find((x) => x.id === id)
  if (!r || currentCustomer.points < r.cost) {
    showToast('Puntos insuficientes ✦')
    return
  }
  currentCustomer.points -= r.cost
  customers[currentCustomer.phone] = currentCustomer
  save('nekoCustomers', customers)
  updateLoyaltyUI()
  showToast(`🎁 ¡${r.title} canjeado!`)
  pushNotification({
    icon: '🎁',
    title: 'Recompensa Canjeada',
    msg: `Canjeaste: ${r.title} por ${r.cost} puntos.`,
    type: 'reward',
  })
}
function updateLoyaltyUI() {
  if (!currentCustomer) return
  const pts = currentCustomer.points
  const tier =
    TIERS.slice()
      .reverse()
      .find((t) => pts >= t.min) || TIERS[0]
  const nextTier = TIERS[TIERS.findIndex((t) => t.name === tier.name) + 1]
  const el = (id) => document.getElementById(id)
  if (el('totalPoints')) el('totalPoints').textContent = String(pts)
  if (el('tierBadge')) el('tierBadge').textContent = tier.name
  if (el('loyaltyPhone')) el('loyaltyPhone').textContent = `📱 ${currentCustomer.phone}`
  if (el('navPoints')) {
    const pts = currentCustomer.points
    el('navPoints').textContent = pts > 999 ? '✦' : String(pts)
    el('navPoints').style.display = pts > 0 ? 'flex' : 'none'
  }
  if (nextTier) {
    const pct = Math.min(((pts - tier.min) / (nextTier.min - tier.min)) * 100, 100)
    if (el('progressFill')) el('progressFill').style.width = `${pct}%`
    if (el('progressLabel'))
      el('progressLabel').textContent = `${pts} / ${nextTier.min} pts para ${nextTier.name}`
  } else {
    if (el('progressFill')) el('progressFill').style.width = '100%'
    if (el('progressLabel')) el('progressLabel').textContent = '🖤 Nivel máximo — NEKO NOIR'
  }
  renderRewards()
}
// ---- CONTACT / INTERNATIONAL ----
function renderContactSection() {
  const waLink = document.getElementById('contactWaLink')
  const emailLink = document.getElementById('contactEmailLink')
  if (waLink) waLink.setAttribute('href', `https://wa.me/${storeConfig.whatsappNumber}`)
  if (emailLink) {
    emailLink.setAttribute('href', `mailto:${storeConfig.intlContactEmail}`)
    emailLink.textContent = storeConfig.intlContactEmail
  }
  const waDisplay = document.getElementById('contactWaDisplay')
  if (waDisplay) {
    const num = storeConfig.whatsappNumber
    const formatted = num.startsWith('506') ? `+506 ${num.slice(3, 7)}-${num.slice(7)}` : `+${num}`
    waDisplay.textContent = formatted
  }
}
function submitContactForm() {
  const name = document.getElementById('contactFormName').value.trim()
  const email = document.getElementById('contactFormEmail').value.trim()
  const country = document.getElementById('contactFormCountry').value.trim()
  const msg = document.getElementById('contactFormMsg').value.trim()
  if (!name || !email || !msg) {
    showToast('Por favor completa todos los campos requeridos ✦')
    return
  }
  if (!email.includes('@')) {
    showToast('Email inválido ✦')
    return
  }
  const subject = encodeURIComponent(`[Neko Store] Consulta internacional de ${name} — ${country}`)
  const body = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${email}\nPaís: ${country}\n\nMensaje:\n${msg}\n\n---\nEnviado desde nekostore.cr`,
  )
  const mailtoUrl = `mailto:${storeConfig.intlContactEmail}?subject=${subject}&body=${body}`
  window.location.href = mailtoUrl
  showToast('Abriendo tu cliente de correo... 🖤')
  pushNotification({
    icon: '✉️',
    title: 'Formulario enviado',
    msg: `Gracias ${name}, revisaremos tu mensaje pronto.`,
    type: 'contact',
  })
  setTimeout(() => {
    document.getElementById('contactFormName').value = ''
    document.getElementById('contactFormEmail').value = ''
    document.getElementById('contactFormCountry').value = ''
    document.getElementById('contactFormMsg').value = ''
  }, 500)
}
// ---- ACCOUNT ----
function renderAccountSection() {
  const loginDiv = document.getElementById('accountLogin')
  const dashDiv = document.getElementById('accountDashboard')
  if (!currentCustomer) {
    loginDiv.style.display = 'block'
    dashDiv.style.display = 'none'
  } else {
    loginDiv.style.display = 'none'
    dashDiv.style.display = 'block'
    renderAccountDashboard()
  }
}
function loginAccount() {
  const raw = document.getElementById('loginPhone').value.trim().replace(/\D/g, '')
  if (raw.length < 8) {
    showToast('Número inválido ✦')
    return
  }
  if (customers[raw]) {
    currentCustomer = customers[raw]
    save('nekoCurrent', raw)
    updateLoyaltyUI()
    renderAccountSection()
    showToast(`¡Bienvenida de vuelta, ${currentCustomer.name}! 🖤`)
    pushNotification({
      icon: '🐱',
      title: 'Sesión Iniciada',
      msg: `Hola ${currentCustomer.name}, bienvenida de vuelta.`,
      type: 'login',
    })
  } else {
    showToast('Cuenta no encontrada. Se creará con tu primera compra.')
  }
}
function logoutAccount() {
  currentCustomer = null
  save('nekoCurrent', null)
  renderAccountSection()
  showToast('Sesión cerrada 🖤')
}
function renderAccountDashboard() {
  if (!currentCustomer) return
  const c = currentCustomer
  const tier =
    TIERS.slice()
      .reverse()
      .find((t) => c.points >= t.min) || TIERS[0]
  const el = (id) => document.getElementById(id)
  if (el('accountName')) el('accountName').textContent = c.name
  if (el('accountPhone2')) el('accountPhone2').textContent = formatCRPhone(c.phone)
  if (el('accountTier')) el('accountTier').textContent = tier.name
  if (el('accPoints')) el('accPoints').textContent = String(c.points)
  if (el('accOrders')) el('accOrders').textContent = String(c.orders.length)
  if (el('accSpent'))
    el('accSpent').textContent = `${storeConfig.currencySymbol}${c.totalSpent.toFixed(0)}`
  if (el('accDiscount')) el('accDiscount').textContent = `${Math.round(tier.discount * 100)}%`
  const initials = c.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  if (el('accountAvatar')) el('accountAvatar').textContent = initials
  if (el('accJoined'))
    el('accJoined').textContent = new Date(c.joinedAt).toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
    })
  if (c.isDemo && el('demoBadge')) el('demoBadge').style.display = 'flex'
  const oh = el('orderHistory')
  if (!c.orders.length) {
    oh.innerHTML = '<div class="no-orders">Aún no tienes pedidos. ¡Explora la tienda! 🖤</div>'
  } else {
    oh.innerHTML = [...c.orders]
      .reverse()
      .map((o) => {
        const date = new Date(o.date).toLocaleDateString('es', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        const items = o.items.map((i) => `${i.product.name} (${i.size}) ×${i.quantity}`).join(', ')
        const statusClass =
          o.status === 'confirmado' ? 'order-status--confirmed' : 'order-status--pending'
        return `<div class="order-history-item">
        <div>
          <div class="order-id">${o.id}</div>
          <div class="order-date">${date} · ${o.shippingMethod}</div>
          <div class="order-items-list">${items}</div>
          <div class="order-total-row">
            <span class="order-total-val">${storeConfig.currencySymbol}${o.total.toFixed(2)}</span>
            <span class="order-points-earned">+${o.pointsEarned} pts oscuros</span>
          </div>
        </div>
        <span class="order-status ${statusClass}">${o.status}</span>
      </div>`
      })
      .join('')
  }
  const ns = c.notifSettings || {}
  ;['order', 'drop', 'points', 'rewards', 'offers'].forEach((key) => {
    const inp = el(`notif${key.charAt(0).toUpperCase()}${key.slice(1)}`)
    if (inp) inp.checked = ns[key] !== false
  })
  const storePanel = el('storeConfigPanel')
  if (storePanel) {
    storePanel.style.display = c.isDemo ? 'block' : 'none'
  }
  const storeTabBtn = el('storeTabBtn')
  if (storeTabBtn) {
    storeTabBtn.style.display = c.isDemo ? '' : 'none'
  }
  if (c.isDemo) renderStoreConfigForm()
}
function saveNotifSettings() {
  if (!currentCustomer) return
  currentCustomer.notifSettings = {
    order: document.getElementById('notifOrder').checked,
    drop: document.getElementById('notifDrop').checked,
    points: document.getElementById('notifPoints').checked,
    rewards: document.getElementById('notifRewards').checked,
    offers: document.getElementById('notifOffers').checked,
  }
  customers[currentCustomer.phone] = currentCustomer
  save('nekoCustomers', customers)
  showToast('Preferencias guardadas ✦')
}
// ---- STORE CONFIG DASHBOARD ----
function renderStoreConfigForm() {
  const f = (id) => document.getElementById(id)
  if (!f('cfgWaNumber')) return
  f('cfgWaNumber').value = storeConfig.whatsappNumber
  f('cfgEmail').value = storeConfig.storeEmail
  f('cfgIntlEmail').value = storeConfig.intlContactEmail
  f('cfgInstagram').value = storeConfig.instagramHandle
  f('cfgStoreName').value = storeConfig.storeName
  f('cfgTagline').value = storeConfig.storeTagline
  f('cfgCurrency').value = storeConfig.currencySymbol
  f('cfgDropTitle').value = storeConfig.dropTitle
  f('cfgIntlEnabled').checked = storeConfig.intlShippingEnabled
  f('cfgDropActive').checked = storeConfig.dropActive
}
function saveStoreConfig() {
  const f = (id) => document.getElementById(id).value.trim()
  const fc = (id) => document.getElementById(id).checked
  const newConfig = {
    whatsappNumber: f('cfgWaNumber').replace(/\D/g, ''),
    storeEmail: f('cfgEmail'),
    intlContactEmail: f('cfgIntlEmail'),
    instagramHandle: f('cfgInstagram'),
    storeName: f('cfgStoreName'),
    storeTagline: f('cfgTagline'),
    currencySymbol: f('cfgCurrency') || '$',
    dropTitle: f('cfgDropTitle'),
    intlShippingEnabled: fc('cfgIntlEnabled'),
    dropActive: fc('cfgDropActive'),
  }
  if (!newConfig.whatsappNumber || newConfig.whatsappNumber.length < 8) {
    showToast('Número de WhatsApp inválido ✦')
    return
  }
  storeConfig = newConfig
  save('nekoConfig', storeConfig)
  applyStoreConfig()
  showToast('Configuración guardada ✦')
  pushNotification({
    icon: '⚙️',
    title: 'Config Actualizada',
    msg: 'Los cambios de la tienda han sido guardados.',
    type: 'config',
  })
}
function resetStoreConfig() {
  storeConfig = Object.assign({}, DEFAULT_CONFIG)
  save('nekoConfig', storeConfig)
  renderStoreConfigForm()
  applyStoreConfig()
  showToast('Configuración restaurada ✦')
}
function applyStoreConfig() {
  const dropTitle = document.getElementById('dropAlertTitle')
  if (dropTitle) dropTitle.textContent = storeConfig.dropTitle
  const dropAlert = document.getElementById('dropAlert')
  if (dropAlert) dropAlert.style.display = storeConfig.dropActive ? 'block' : 'none'
  const footerInsta = document.getElementById('footerInstagram')
  if (footerInsta) footerInsta.textContent = storeConfig.instagramHandle
  const footerTagline = document.getElementById('footerTagline')
  if (footerTagline) footerTagline.textContent = storeConfig.storeTagline
  const intlBanner = document.getElementById('intlBanner')
  if (intlBanner) intlBanner.style.display = storeConfig.intlShippingEnabled ? 'block' : 'none'
  renderContactSection()
}
// ---- HELPERS ----
function formatCRPhone(phone) {
  const clean = phone.replace(/\D/g, '')
  if (clean.startsWith('506') && clean.length === 11)
    return `+506 ${clean.slice(3, 7)}-${clean.slice(7)}`
  if (clean.length === 8) return `+506 ${clean.slice(0, 4)}-${clean.slice(4)}`
  return `+${clean}`
}
// ---- DROP TIMER ----
function initDropTimer() {
  const el = document.getElementById('dropTimer')
  if (!el) return
  setInterval(() => {
    if (dropTimeLeft <= 0) {
      el.textContent = 'EXPIRADO'
      return
    }
    dropTimeLeft--
    const h = Math.floor(dropTimeLeft / 3600),
      m = Math.floor((dropTimeLeft % 3600) / 60),
      s = dropTimeLeft % 60
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, 1000)
}
// ---- SEED NOTIFICATIONS ----
function seedDemoNotifications() {
  if (notifications.length > 0) return
  ;[
    {
      icon: '🌑',
      title: 'Bienvenida a Neko Store',
      msg: 'Gracias por unirte. Acumula puntos oscuros y desbloquea recompensas exclusivas.',
      type: 'welcome',
    },
    {
      icon: '✦',
      title: 'Nuevo Drop — Shadow Bloom',
      msg: 'La colección Shadow Bloom está disponible. Edición limitada, solo 30 piezas.',
      type: 'drop',
    },
    {
      icon: '🇨🇷',
      title: 'Envíos en Costa Rica',
      msg: 'Hacemos envíos a todo el país. Recogida en tienda siempre gratis.',
      type: 'info',
    },
  ].forEach((d, i) =>
    notifications.push(
      Object.assign(Object.assign({ id: String(i) }, d), { time: 'Hoy', read: false }),
    ),
  )
  save('nekoNotifs', notifications)
  renderNotifications()
}
// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast')
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 3200)
}
// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  isDark = load('nekoTheme', 'dark') !== 'light'
  applyTheme()
  storeConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), load('nekoConfig', {}))
  customers = load('nekoCustomers', {})
  cart = load('nekoCart', [])
  notifications = load('nekoNotifs', [])
  seedDemoAccount()
  const savedPhone = load('nekoCurrent', null)
  if (savedPhone && customers[savedPhone]) {
    currentCustomer = customers[savedPhone]
    updateLoyaltyUI()
  }
  updateCartUI()
  renderFeatured()
  renderShop()
  renderRewards()
  initCarousel()
  initDropTimer()
  seedDemoNotifications()
  renderNotifications()
  applyStoreConfig()
})
const w = window
w.showSection = showSection
w.moveCarousel = moveCarousel
w.filterProducts = filterProducts
w.openProductModal = openProductModal
w.closeProductModal = closeProductModal
w.selectSize = selectSize
w.addToCart = addToCart
w.quickAddToCart = quickAddToCart
w.removeFromCart = removeFromCart
w.changeQty = changeQty
w.toggleCart = toggleCart
w.updateShipping = updateShipping
w.showCheckout = showCheckout
w.closeCheckout = closeCheckout
w.confirmOrder = confirmOrder
w.toggleWishlist = toggleWishlist
w.redeemReward = redeemReward
w.goToSlide = goToSlide
w.toggleTheme = toggleTheme
w.toggleNotifications = toggleNotifications
w.clearNotifications = clearNotifications
w.dismissNotif = dismissNotif
w.markRead = markRead
w.loginAccount = loginAccount
w.logoutAccount = logoutAccount
w.saveNotifSettings = saveNotifSettings
w.saveStoreConfig = saveStoreConfig
w.resetStoreConfig = resetStoreConfig
w.submitContactForm = submitContactForm
w.renderContactSection = renderContactSection

function _switchAccTab(tab, btn) {
  document.querySelectorAll('.acc-tab').forEach((b) => b.classList.remove('active'))
  document.querySelectorAll('.acc-tab-panel').forEach((p) => {
    p.classList.remove('active')
    p.style.display = 'none'
  })
  btn.classList.add('active')
  const panel = document.getElementById(`accTab${tab.charAt(0).toUpperCase()}${tab.slice(1)}`)
  if (panel) {
    panel.classList.add('active')
    panel.style.display = 'block'
  }
}

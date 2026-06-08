import type { Product } from '@/types/product'

export const PRODUCTS: Product[] = [
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

export const GOTHIC_IMAGES: Record<string, string> = {
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

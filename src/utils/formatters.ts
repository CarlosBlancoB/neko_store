export function picsumUrl(seed: string, w: number, h: number): string {
  const GOTHIC_IMAGES: Record<string, string> = {
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
    ritual2:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
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
    coven11:
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&h=667&fit=crop&q=80',
    gloves22:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=667&fit=crop&q=80',
    witch66:
      'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=500&h=667&fit=crop&q=80',
  }
  if (GOTHIC_IMAGES[seed])
    return GOTHIC_IMAGES[seed] ?? `https://picsum.photos/seed/${seed}/${w}/${h}`
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export function formatCRPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  if (clean.startsWith('506') && clean.length === 11)
    return `+506 ${clean.slice(3, 7)}-${clean.slice(7)}`
  if (clean.length === 8) return `+506 ${clean.slice(0, 4)}-${clean.slice(4)}`
  return `+${clean}`
}

export function formatDate(iso: string, locale = 'es'): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getDiscount(points: number, tiermin: number, nextMin: number): number {
  return Math.min(((points - tiermin) / (nextMin - tiermin)) * 100, 100)
}

export function picsumUrl(seed: string, w: number, h: number): string {
  const GOTHIC_IMAGES: Record<string, string> = {
    shadowbloom:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=667&fit=crop&q=80',
    shadowbloom2:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    velvet99:
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&h=667&fit=crop&q=80',
    velvet100:
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&h=800&fit=crop&q=80',
    darkritual:
      'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=500&h=667&fit=crop&q=80',
    ritual2:
      'https://images.unsplash.com/photo-1621784562877-7e18e06e0e4b?w=600&h=800&fit=crop&q=80',
    moonphase:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=667&fit=crop&q=80',
    midnight55:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=667&fit=crop&q=80',
    phantom88:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=667&fit=crop&q=80',
    eclipse77:
      'https://images.unsplash.com/photo-1573408301185-9519f94815b0?w=500&h=667&fit=crop&q=80',
    serpent33:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=667&fit=crop&q=80',
    raven44:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=667&fit=crop&q=80',
    coven11:
      'https://images.unsplash.com/photo-1595777457583-95e48daf36cb?w=500&h=667&fit=crop&q=80',
    gloves22: 'https://images.unsplash.com/photo-1556909175-8b8f0c98a3c1?w=500&h=667&fit=crop&q=80',
    witch66:
      'https://images.unsplash.com/photo-1581044777550-4269f07f6d99?w=500&h=667&fit=crop&q=80',
    nocturna:
      'https://images.unsplash.com/photo-1618359052046-1fcf2642c861?w=500&h=667&fit=crop&q=80',
    crimson:
      'https://images.unsplash.com/photo-1593032465173-557d25d71941?w=500&h=667&fit=crop&q=80',
    shadowqueen:
      'https://images.unsplash.com/photo-1616636967038-529124f01ae0?w=500&h=667&fit=crop&q=80',
    obsidian:
      'https://images.unsplash.com/photo-1583746786735-4551b28c975c?w=500&h=667&fit=crop&q=80',
    bloodrose:
      'https://images.unsplash.com/photo-1609504372952-d2a275098cc5?w=500&h=667&fit=crop&q=80',
    void66: 'https://images.unsplash.com/photo-1544410886-3ad4b107a712?w=500&h=667&fit=crop&q=80',
    batwing:
      'https://images.unsplash.com/photo-1595349860193-4351c4a716a2?w=500&h=667&fit=crop&q=80',
    funeral99:
      'https://images.unsplash.com/photo-1571693707882-2c3aad85656e?w=500&h=667&fit=crop&q=80',
    chainbelt:
      'https://images.unsplash.com/photo-1608198895059-7ac0cabb35f8?w=500&h=667&fit=crop&q=80',
    duskcorset:
      'https://images.unsplash.com/photo-1591489418713-65e17abfde0e?w=500&h=667&fit=crop&q=80',
    dusk2: 'https://images.unsplash.com/photo-1591489418713-65e17abfde0e?w=600&h=800&fit=crop&q=80',
    poison55:
      'https://images.unsplash.com/photo-1617898813249-c7230d9e35cb?w=500&h=667&fit=crop&q=80',
    cathedral:
      'https://images.unsplash.com/photo-1574442486383-127431d0215c?w=500&h=667&fit=crop&q=80',
    thorn66:
      'https://images.unsplash.com/photo-1604596500718-c1e163c9efb3?w=500&h=667&fit=crop&q=80',
    ashen44:
      'https://images.unsplash.com/photo-1615562536704-94e7f1c38a06?w=500&h=667&fit=crop&q=80',
    hexagram:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=667&fit=crop&q=80',
    phantom99:
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&h=667&fit=crop&q=80',
    nekro99:
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&h=667&fit=crop&q=80',
    crowskull:
      'https://images.unsplash.com/photo-1606768666853-403c90c981ad?w=500&h=667&fit=crop&q=80',
    velvetnoir:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=667&fit=crop&q=80',
    sacrifice:
      'https://images.unsplash.com/photo-1534528741775-53994a69daac?w=500&h=667&fit=crop&q=80',
    midnightsuit:
      'https://images.unsplash.com/photo-1544004080-043f2157f6ce?w=500&h=667&fit=crop&q=80',
    batcollar:
      'https://images.unsplash.com/photo-1512317266244-e53f6d5c5e3a?w=500&h=667&fit=crop&q=80',
    storm88:
      'https://images.unsplash.com/photo-1529736026572-2ee4e16eea5c?w=500&h=667&fit=crop&q=80',
    baphomet:
      'https://images.unsplash.com/photo-1522934496736-792c3cee60f1?w=500&h=667&fit=crop&q=80',
    crimson77:
      'https://images.unsplash.com/photo-1491349175236-16434615b2e0?w=500&h=667&fit=crop&q=80',
    crimsonlayer:
      'https://images.unsplash.com/photo-1491349175236-16434615b2e0?w=600&h=800&fit=crop&q=80',
    crownnoir:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=667&fit=crop&q=80',
    widow33: 'https://images.unsplash.com/photo-1560114125-5bf9f44ffd51?w=500&h=667&fit=crop&q=80',
    crowfeather:
      'https://images.unsplash.com/photo-1557042185-5e29a2e94d35?w=500&h=667&fit=crop&q=80',
    vampire99:
      'https://images.unsplash.com/photo-1562254002-c6a7d1a748c4?w=500&h=667&fit=crop&q=80',
    onyxgate:
      'https://images.unsplash.com/photo-1602275116687-d19f4f56efe9?w=500&h=667&fit=crop&q=80',
    sable55:
      'https://images.unsplash.com/photo-1602538987885-56f63b07e27c?w=500&h=667&fit=crop&q=80',
    weblace:
      'https://images.unsplash.com/photo-1589682994934-c3815e4e34b8?w=500&h=667&fit=crop&q=80',
    mourning:
      'https://images.unsplash.com/photo-1583002068726-653a3ce89983?w=500&h=667&fit=crop&q=80',
    spike44:
      'https://images.unsplash.com/photo-1534008897995-27a23e2aee40?w=500&h=667&fit=crop&q=80',
    abyss22:
      'https://images.unsplash.com/photo-1599932463435-f72d91b116b7?w=500&h=667&fit=crop&q=80',
    enigma77:
      'https://images.unsplash.com/photo-1609098345213-81678cb0d1ef?w=500&h=667&fit=crop&q=80',
    raventail:
      'https://images.unsplash.com/photo-1605168715730-a501634e6421?w=500&h=667&fit=crop&q=80',
    choker33:
      'https://images.unsplash.com/photo-1590650802541-4fa3a1e65998?w=500&h=667&fit=crop&q=80',
    dagger55:
      'https://images.unsplash.com/photo-1578632820790-7073a07e9ad9?w=500&h=667&fit=crop&q=80',
    bellnoir:
      'https://images.unsplash.com/photo-1606246531691-53282eb3cc1b?w=500&h=667&fit=crop&q=80',
    warlock99:
      'https://images.unsplash.com/photo-1555823661-6c9de82dc4be?w=500&h=667&fit=crop&q=80',
    warlock2: 'https://images.unsplash.com/photo-1555823661-6c9de82dc4be?w=600&h=800&fit=crop&q=80',
    satinnoc:
      'https://images.unsplash.com/photo-1591134295191-0b3c4232b09a?w=500&h=667&fit=crop&q=80',
    obsidiandream:
      'https://images.unsplash.com/photo-1603832139990-dd5a021e2f7f?w=500&h=667&fit=crop&q=80',
    obsidian2:
      'https://images.unsplash.com/photo-1603832139990-dd5a021e2f7f?w=600&h=800&fit=crop&q=80',
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

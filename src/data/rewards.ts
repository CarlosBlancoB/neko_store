import type { Reward } from '@/types/loyalty'

export const REWARDS: Reward[] = [
  { id: 1, title: '5% Descuento', icon: '🏷️', cost: 100, type: 'discount', value: 5 },
  { id: 2, title: '10% Descuento', icon: '🖤', cost: 200, type: 'discount', value: 10 },
  { id: 3, title: 'Envío Gratis', icon: '📦', cost: 150, type: 'shipping', value: 0 },
  { id: 4, title: '15% Descuento', icon: '⭐', cost: 350, type: 'discount', value: 15 },
  { id: 5, title: 'Collar Moon Phase', icon: '🌙', cost: 500, type: 'product', value: 28 },
  { id: 6, title: '25% VIP Drop', icon: '✦', cost: 800, type: 'discount', value: 25 },
]

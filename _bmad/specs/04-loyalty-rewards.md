# Spec: Lealtad + Recompensas

## Description
Sistema de tiers (MORTAL → NEKO NOIR) con descuentos progresivos y recompensas canjeables por puntos.

## Acceptance Criteria
- [ ] 4 tiers con min/max points y discount: MORTAL 5%, SOMBRA 8%, ECLIPSE 12%, NEKO NOIR 18%
- [ ] getTier(points) devuelve el tier actual + nextTier
- [ ] getProgress(points) devuelve % y label para barra de progreso
- [ ] 6 recompensas canjeables (100-800 pts)
- [ ] redeemReward valida puntos suficientes y registra canje
- [ ] RewardsGrid muestra rewards disponibles
- [ ] LoyaltyCard muestra tier actual y puntos

## Technical Notes
- Zustand store (loyaltyStore.ts) con persist para redeemedRewards
- TIERS en src/data/tiers.ts, REWARDS en src/data/rewards.ts
- redeemReward retorna { success, points } — no modifica customer points
- RewardsGrid filtra rewards ya canjeados

## QA Notes
- Test unitario: getTier para cada rango, getProgress, redeemReward
- redeemReward falla si puntos < cost
- getTier con 0 puntos devuelve MORTAL sin nextTier

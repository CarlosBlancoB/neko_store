import { useCallback } from 'react'
import { useConfigStore } from '@/stores/configStore'
import type { CartItem } from '@/types/cart'
import type { Customer } from '@/types/customer'
import { buildContactWaUrl, buildWaOrderUrl } from '@/utils/waUrl'

export function useWhatsApp() {
  const whatsappNumber = useConfigStore((s) => s.config.whatsappNumber)
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)

  const openContact = useCallback(() => {
    window.open(buildContactWaUrl(whatsappNumber), '_blank')
  }, [whatsappNumber])

  const sendOrder = useCallback(
    (
      customer: Customer,
      address: string,
      notes: string,
      items: CartItem[],
      shippingMethod: string,
      shippingCost: number,
      total: number,
      pointsEarned: number,
      orderId: string,
    ) => {
      const itemsText = items.map((i) => `${i.quantity}x ${i.product.name} (${i.size})`).join('\n')

      window.open(
        buildWaOrderUrl(
          whatsappNumber,
          customer.name,
          customer.phone,
          address,
          notes,
          itemsText,
          shippingMethod,
          shippingCost,
          total,
          pointsEarned,
          orderId,
          currencySymbol,
        ),
        '_blank',
      )
    },
    [whatsappNumber, currencySymbol],
  )

  return { whatsappNumber, openContact, sendOrder }
}

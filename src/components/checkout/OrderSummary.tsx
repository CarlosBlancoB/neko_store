import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useConfigStore } from '@/stores/configStore'

export default function OrderSummary() {
  const items = useCartStore((s) => s.items)
  const shippingCost = useCartStore((s) => s.shippingCost)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getDiscount = useCartStore((s) => s.getDiscount)
  const getTotal = useCartStore((s) => s.getTotal)
  const customer = useAuthStore((s) => s.getCurrentCustomer())
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)

  const subtotal = getSubtotal()
  const discount = getDiscount(customer?.points ?? 0)
  const total = getTotal(customer?.points ?? 0)

  return (
    <div className='order-summary'>
      {items.map((item) => (
        <div key={`${item.product.id}-${item.size}`} className='order-summary-item'>
          <span>
            <strong>{item.quantity}x</strong> {item.product.name} ({item.size})
          </span>
          <span>
            {currencySymbol}
            {(item.product.price * item.quantity).toFixed(0)}
          </span>
        </div>
      ))}
      <div style={{ marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
        <div className='order-summary-item'>
          <span>Subtotal</span>
          <span>
            {currencySymbol}
            {subtotal.toFixed(2)}
          </span>
        </div>
        {discount > 0 && (
          <div className='order-summary-item'>
            <span>Descuento</span>
            <span>-{(discount * 100).toFixed(0)}%</span>
          </div>
        )}
        <div className='order-summary-item'>
          <span>Envío</span>
          <span>
            {shippingCost === 0 ? 'Gratis' : `${currencySymbol}${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className='order-summary-total'>
          <span>Total</span>
          <span>
            {currencySymbol}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

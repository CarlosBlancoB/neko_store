import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useConfigStore } from '@/stores/configStore'
import { useUIStore } from '@/stores/uiStore'
import { picsumUrl } from '@/utils/formatters'

export default function CartSidebar() {
  const {
    items,
    shippingCost,
    removeItem,
    updateQuantity,
    setShipping,
    getSubtotal,
    getDiscount,
    getTotal,
    getItemCount,
  } = useCartStore()
  const isOpen = useUIStore((s) => s.isCartOpen)
  const toggleCart = useUIStore((s) => s.toggleCart)
  const openCheckout = useUIStore((s) => s.openCheckoutModal)
  const getCurrentCustomer = useAuthStore((s) => s.getCurrentCustomer)
  const customer = getCurrentCustomer()
  const config = useConfigStore((s) => s.config)

  const subtotal = getSubtotal()
  const discount = getDiscount(customer?.points ?? 0)
  const total = getTotal(customer?.points ?? 0)
  const _count = getItemCount()

  return (
    <>
      <button
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={toggleCart}
        type='button'
        aria-label='Cerrar carrito'
      />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className='cart-header'>
          <h3>Tu Armario Oscuro</h3>
          <button onClick={toggleCart} type='button'>
            ✕
          </button>
        </div>

        <div className='cart-items'>
          {items.length === 0 ? (
            <div className='cart-empty'>
              <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                opacity='0.3'
                aria-hidden='true'
              >
                <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
                <line x1='3' y1='6' x2='21' y2='6' />
                <path d='M16 10a4 4 0 01-8 0' />
              </svg>
              <p>El vacío aguarda...</p>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={`${item.product.id}-${item.size}`} className='cart-item'>
                <div className='cart-item__img'>
                  <img
                    src={picsumUrl(item.product.imgSeed, 144, 176)}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className='cart-item__details'>
                  <div className='cart-item__name'>{item.product.name}</div>
                  <div className='cart-item__size'>Talla: {item.size}</div>
                  <div className='cart-item__controls'>
                    <button className='qty-btn' onClick={() => updateQuantity(i, -1)} type='button'>
                      −
                    </button>
                    <span className='qty-val'>{item.quantity}</span>
                    <button className='qty-btn' onClick={() => updateQuantity(i, 1)} type='button'>
                      +
                    </button>
                  </div>
                </div>
                <span className='cart-item__price'>
                  {config.currencySymbol}
                  {(item.product.price * item.quantity).toFixed(0)}
                </span>
                <button className='cart-item__remove' onClick={() => removeItem(i)} type='button'>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className='cart-footer'>
            <div className='cart-summary'>
              <div className='cart-row'>
                <span>Subtotal</span>
                <span>
                  {config.currencySymbol}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className='cart-row cart-row--ship'>
                <span>Envío</span>
                <div className='shipping-options'>
                  <label>
                    <input
                      type='radio'
                      name='shipping'
                      value='0'
                      checked={shippingCost === 0}
                      onChange={() => setShipping(0, 'Recogida en tienda')}
                    />{' '}
                    Recogida <strong>Gratis</strong>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='shipping'
                      value='5'
                      checked={shippingCost === 5}
                      onChange={() => setShipping(5, 'Envío estándar')}
                    />{' '}
                    Estándar <strong>$5</strong>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='shipping'
                      value='12'
                      checked={shippingCost === 12}
                      onChange={() => setShipping(12, 'Envío express')}
                    />{' '}
                    Express <strong>$12</strong>
                  </label>
                </div>
              </div>
              {discount > 0 && (
                <div className='cart-row'>
                  <span>Descuento tier</span>
                  <span>
                    -{config.currencySymbol}
                    {(subtotal * discount).toFixed(2)}
                  </span>
                </div>
              )}
              <div className='cart-row cart-row--total'>
                <span>Total</span>
                <span>
                  {config.currencySymbol}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
            <button className='btn-primary btn-full' onClick={openCheckout} type='button'>
              Confirmar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}

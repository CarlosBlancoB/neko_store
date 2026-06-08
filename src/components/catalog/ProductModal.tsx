import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import SizePicker from '@/components/shared/SizePicker'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'
import { useConfigStore } from '@/stores/configStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useUIStore } from '@/stores/uiStore'
import { picsumUrl } from '@/utils/formatters'

export default function ProductModal() {
  const isOpen = useUIStore((s) => s.isProductModalOpen)
  const closeProductModal = useUIStore((s) => s.closeProductModal)
  const activeSection = useUIStore((s) => s.activeSection)
  const addItem = useCartStore((s) => s.addItem)
  const pushNotif = useNotificationStore((s) => s.push)
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const _product = PRODUCTS.find((_p) => {
    if (activeSection === 'shop') return true
    return false
  })
  const current = PRODUCTS[0]

  if (!current) return null

  const handleAddToCart = () => {
    if (!selectedSize) {
      pushNotif({
        icon: '⚠️',
        title: 'Selecciona una talla',
        msg: 'Elige una talla antes de agregar al carrito',
        type: 'warning',
      })
      return
    }
    addItem(current, selectedSize)
    pushNotif({
      icon: '🖤',
      title: `Agregado: ${current.name}`,
      msg: `Talla ${selectedSize} — ${currencySymbol}${current.price}`,
      type: 'cart',
    })
    closeProductModal()
    setSelectedSize(null)
  }

  return (
    <Modal isOpen={isOpen} onClose={closeProductModal} className='product-modal'>
      <div className='product-modal__inner'>
        <div className='product-modal__img'>
          <img src={picsumUrl(current.imgSeed, 500, 667)} alt={current.name} />
        </div>
        <div className='product-modal__details'>
          <div className='product-modal__cat'>{current.category}</div>
          <div className='product-modal__name'>{current.name}</div>
          <div className='product-modal__price'>
            {currencySymbol}
            {current.price}
          </div>
          <div className='product-modal__pts'>{current.points} puntos de lealtad</div>
          <div className='product-modal__desc'>{current.description}</div>
          <SizePicker sizes={current.sizes} selected={selectedSize} onSelect={setSelectedSize} />
          <button className='btn-primary btn-full' onClick={handleAddToCart} type='button'>
            Agregar al carrito
          </button>
        </div>
      </div>
    </Modal>
  )
}

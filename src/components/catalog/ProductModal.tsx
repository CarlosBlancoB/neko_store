import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import ProductImage from '@/components/shared/ProductImage'
import SizePicker from '@/components/shared/SizePicker'
import { useCartStore } from '@/stores/cartStore'
import { useConfigStore } from '@/stores/configStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useProductStore } from '@/stores/productStore'
import { useUIStore } from '@/stores/uiStore'

export default function ProductModal() {
  const isOpen = useUIStore((s) => s.isProductModalOpen)
  const closeProductModal = useUIStore((s) => s.closeProductModal)
  const activeProductId = useUIStore((s) => s.activeProductId)
  const products = useProductStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const pushNotif = useNotificationStore((s) => s.push)
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const current = products.find((p) => p.id === activeProductId) ?? null

  const handleAddToCart = () => {
    if (!current || !selectedSize) {
      if (!selectedSize) {
        pushNotif({
          icon: '⚠️',
          title: 'Selecciona una talla',
          msg: 'Elige una talla antes de agregar al carrito',
          type: 'warning',
        })
      }
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

  if (!current) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeProductModal}
      className='product-modal'
      key={activeProductId}
    >
      <div className='product-modal__inner'>
        <div className='product-modal__img'>
          <ProductImage
            seed={current.imgSeed}
            alt={current.name}
            className='product-modal__img-tag'
          />
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

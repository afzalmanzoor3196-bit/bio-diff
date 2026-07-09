import { createContext, useContext, useEffect, useState } from 'react'
import { PRODUCT_IMAGE_MAP } from '../data/products.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'biodiff_cart'

function parsePriceValue(price) {
  if (typeof price === 'number' && Number.isFinite(price)) return price
  if (typeof price === 'string') {
    const numeric = Number(price.replace(/[^\d.-]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
  }
  return 0
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return []
      const parsed = JSON.parse(saved)
      // Re-hydrate images: Vite asset hashes change on every deploy,
      // so we replace stored image paths with current imported assets for known products.
      return parsed.map((item) => {
        const freshImage = PRODUCT_IMAGE_MAP[item.id]
        if (freshImage) return { ...item, image: freshImage }
        return item // admin-added products keep their base64 image
      })
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable, ignore
    }
  }, [items])

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...product, qty: 1, priceValue: parsePriceValue(product.priceValue ?? product.price) }]
    })
    setToast(`${product.name} added to cart`)
    window.clearTimeout(addToCart._t)
    addToCart._t = window.setTimeout(() => setToast(null), 2200)
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.qty * parsePriceValue(i.priceValue ?? i.price), 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, cartCount, cartTotal, toast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

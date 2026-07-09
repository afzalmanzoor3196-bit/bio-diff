import { useEffect, useMemo, useState } from 'react'
import { CartProvider, useCart } from './context/CartContext.jsx'
import AnnouncementBar from './components/jsx/AnnouncementBar.jsx'
import Header from './components/jsx/Header.jsx'
import HeroBanner from './components/jsx/HeroBanner.jsx'
import ShopCategories from './components/jsx/ShopCategories.jsx'
import RealResults from './components/jsx/RealResults.jsx'
import FeatureGrid from './components/jsx/FeatureGrid.jsx'
import Philosophy from './components/jsx/Philosophy.jsx'
import SkinNeeds from './components/jsx/SkinNeeds.jsx'
import HerStories from './components/jsx/HerStories.jsx'
import Influencers from './components/jsx/Influencers.jsx'
import defaultStories from './data/stories.js'
import Footer from './components/jsx/Footer.jsx'
import WhatsAppButton from './components/jsx/WhatsAppButton.jsx'
import CartDrawer from './components/jsx/CartDrawer.jsx'
import AdminLogin from './components/jsx/AdminLogin.jsx'
import AdminDashboard from './components/jsx/AdminDashboard.jsx'
import initialProducts, { PRODUCT_IMAGE_MAP } from './data/products.js'
import ProductDetails from './components/jsx/ProductDetails.jsx'

const normalizeStory = (story, fallbackId = `story-${Date.now()}`) => {
  const id = story?.id ?? story?._id ?? fallbackId
  return {
    ...story,
    id,
    title: story?.title || story?.name || `Story ${id}`,
    poster: story?.poster || story?.posterUrl || story?.image || '/images/stories/story-1.jpg',
    video: story?.video || story?.videoUrl || story?.url || null,
  }
}

function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return <div className="toast">{toast}</div>
}

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home'
    return window.location.hash.replace('#', '') || 'home'
  })
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('biodiff_admin_authenticated') === 'true'
  })
  const [adminError, setAdminError] = useState('')
  const [products, setProducts] = useState(() => {
    if (typeof window === 'undefined') return initialProducts
    const saved = window.localStorage.getItem('biodiff_products')
    if (!saved) return initialProducts
    try {
      const parsed = JSON.parse(saved)
      // Re-hydrate images for default products: Vite changes hashed asset filenames
      // on every build/deploy, so stored paths (e.g. /assets/Product 1-Cvdb2kt2.jpeg)
      // become 404. We always use the current imported asset for known product IDs.
      return parsed.map((p) => {
        const freshImage = PRODUCT_IMAGE_MAP[p.id]
        if (freshImage) return { ...p, image: freshImage }
        return p // admin-added products keep their base64 image
      })
    } catch {
      return initialProducts
    }
  })

  const [stories, setStories] = useState(() => {
    // Always start with the fresh default stories (Story 1, Story 2 from assets)
    const baseStories = defaultStories.map((story) => normalizeStory(story))

    if (typeof window === 'undefined') return baseStories

    // Load only ADMIN-ADDED stories (saved separately)
    const saved = window.localStorage.getItem('biodiff_extra_stories')
    if (!saved) return baseStories

    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const adminStories = parsed.map((story) => normalizeStory(story))
        // Prepend admin stories before default stories
        return [...adminStories, ...baseStories]
      }
    } catch {
      // ignore parse errors
    }
    return baseStories
  })

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace('#', '') || 'home')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('biodiff_products', JSON.stringify(products))
      } catch (error) {
        console.warn('Unable to persist products to localStorage:', error)
      }

      try {
        // Save ONLY admin-added stories (not the default bundled ones)
        // Default stories always load fresh from the import
        const defaultIds = new Set(defaultStories.map((s) => String(s.id)))
        const adminStories = stories.filter((s) => !defaultIds.has(String(s.id)))
        const persistable = adminStories.map((story) => {
          const normalized = normalizeStory(story)
          return {
            ...normalized,
            // blob: URLs are session-only — strip them so they don't break on reload
            video: normalized.video && !normalized.video.startsWith('blob:') ? normalized.video : null,
          }
        })
        window.localStorage.setItem('biodiff_extra_stories', JSON.stringify(persistable))
        // Clear old key if present
        window.localStorage.removeItem('biodiff_stories')
      } catch (error) {
        console.warn('Unable to persist story data to localStorage:', error)
      }
    }
  }, [products, stories])

  const handleAdminLogin = ({ id, password }) => {
    if (id === 'admin' && password === 'admin123') {
      setAdminAuthenticated(true)
      setAdminError('')
      window.localStorage.setItem('biodiff_admin_authenticated', 'true')
      window.location.hash = 'admin'
      return
    }
    setAdminAuthenticated(false)
    setAdminError('Wrong admin ID or password. Use admin / admin123.')
  }

  const handleAdminLogout = () => {
    setAdminAuthenticated(false)
    window.localStorage.removeItem('biodiff_admin_authenticated')
    window.location.hash = ''
  }

  const handleAddProduct = (product) => {
    setProducts((currentProducts) => [product, ...currentProducts])
  }

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== id) return product
        return { ...product, ...updatedProduct, id: updatedProduct.id || id }
      })
    )
  }

  const handleDeleteProduct = (id) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id))
  }

  const handleAddStory = (story) => {
    setStories((currentStories) => [normalizeStory(story), ...currentStories.map((item) => normalizeStory(item))])
  }

  const handleUpdateStory = (id, updatedStory) => {
    setStories((currentStories) =>
      currentStories.map((story) => {
        if (story.id !== id) return normalizeStory(story)
        return normalizeStory({ ...story, ...updatedStory, id: updatedStory.id || id })
      })
    )
  }

  const handleDeleteStory = (id) => {
    setStories((currentStories) => currentStories.filter((story) => story.id !== id))
  }

  const isAdminRoute = route === 'admin'

  return (
    <div className="site">
      {isAdminRoute ? (
        adminAuthenticated ? (
          <AdminDashboard
            products={products}
            stories={stories}
            onAddProduct={handleAddProduct}
            onAddStory={handleAddStory}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateStory={handleUpdateStory}
            onDeleteStory={handleDeleteStory}
            onLogout={handleAdminLogout}
          />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} error={adminError} />
        )
      ) : (
        <>
          <AnnouncementBar />
          <Header onCartClick={() => setCartOpen(true)} />
          {route.startsWith('product/') ? (
            <ProductDetails
              productId={route.replace('product/', '')}
              products={products}
              onBack={() => {
                window.location.hash = ''
              }}
            />
          ) : (
            <>
              <HeroBanner />
              <ShopCategories />
              <RealResults />
              <FeatureGrid />
              <Philosophy />
              <SkinNeeds products={products} />
              <HerStories stories={stories} />
              <Influencers />
            </>
          )}
          <Footer />
          <WhatsAppButton />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          <Toast />
        </>
      )}
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

export default App

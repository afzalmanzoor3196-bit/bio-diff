import { useState } from 'react'
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
import Newsletter from './components/jsx/Newsletter.jsx'
import Footer from './components/jsx/Footer.jsx'
import WhatsAppButton from './components/jsx/WhatsAppButton.jsx'
import CartDrawer from './components/jsx/CartDrawer.jsx'

function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return <div className="toast">{toast}</div>
}

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="site">
      <AnnouncementBar />
      <Header onCartClick={() => setCartOpen(true)} />
      <HeroBanner />
      <ShopCategories />
      <RealResults />
      <FeatureGrid />
      <Philosophy />
      <SkinNeeds />
      <HerStories />
      <Influencers />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast />
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

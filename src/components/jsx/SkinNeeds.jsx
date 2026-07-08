import { useMemo, useState, useRef, useEffect } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/SkinNeeds.css'
import img11 from '../../assets/11.jpeg'
import img12 from '../../assets/12.jpeg'
import img13 from '../../assets/13.jpeg'
import img14 from '../../assets/14.jpeg'

const filters = ['ACNE & BREAKOUTS', 'HYPERPIGMENTATION', 'DRY & DEHYDRATED SKIN', 'KOREAN GLASS SKIN']

const defaultProducts = [
  {
    id: 'tea-tree-face-wash',
    category: 'ACNE & BREAKOUTS',
    badge: 'TRENDING NOW 🔥',
    image: img11,
    name: 'Tea Tree & Salicylic Acid Face Wash',
    price: 'Rs.1,099',
    priceValue: 1099,
  },
  {
    id: 'tinted-sunscreen-spf60',
    category: 'HYPERPIGMENTATION',
    badge: 'TOP RATED 🌍',
    image: img12,
    name: 'Tinted Sunscreen SPF 60',
    price: 'Rs.1,599',
    priceValue: 1599,
  },
  {
    id: 'anti-acne-serum',
    category: 'DRY & DEHYDRATED SKIN',
    badge: null,
    image: img13,
    name: 'Anti-Acne Face Serum (Clear Skin)',
    price: 'Rs.2,099',
    priceValue: 2099,
  },
  {
    id: 'vitamin-c-serum',
    category: 'KOREAN GLASS SKIN',
    badge: 'KOREAN GLOW 💗',
    image: img14,
    name: 'Vitamin C Face Serum (Glow)',
    price: 'Rs.2,099',
    priceValue: 2099,
  },
]

function SkinNeeds({ products = defaultProducts }) {
  const [active, setActive] = useState(filters[0])
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef(null)

  const visibleProducts = useMemo(() => {
    const getPriority = (p) => {
      const name = (p.name || '').toLowerCase()
      if (name.includes('cream')) return 1
      if (name.includes('facewash') || name.includes('face wash') || name.includes('wash')) return 2
      if (name.includes('sunscreen') || name.includes('sunblock') || name.includes('spf')) return 3
      return 4
    }
    return [...products].sort((a, b) => getPriority(a) - getPriority(b))
  }, [products])

  const handleAdd = (product) => {
    addToCart(product)
    setJustAdded(product.id)
    window.setTimeout(() => setJustAdded(null), 1200)
  }

  // Track scroll position to update active dot
  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.offsetWidth
      const idx = Math.round(el.scrollLeft / cardWidth)
      setSlideIndex(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to dot index
  const goToSlide = (idx) => {
    const el = sliderRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
    setSlideIndex(idx)
  }

  return (
    <section id="skin-needs" className="skin-needs">
      <div className="container">
        <div className="sn-head">
          <div>
            <p className="sn-eyebrow">LISTEN TO YOUR SKIN</p>
            <h2 className="sn-title">
              Find What
              <br />
              Your Skin
              <br />
              Needs?
            </h2>
            <p className="sn-subtitle">
              Your skin is smart and if you listen, it'll tell you exactly what it's craving
            </p>
          </div>

          <div className="sn-filters">
            <span className="sn-filter-label">FILTER BY CONCERN</span>
            <div className="sn-filter-pills">
              {filters.map((f) => (
                <button
                  type="button"
                  key={f}
                  className={`sn-pill ${active === f ? 'active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sn-cards-wrapper">
          <div className="sn-cards" ref={sliderRef}>
            {visibleProducts.map((p) => (
              <div
                className="sn-card"
                key={p.id}
                onClick={() => {
                  window.location.hash = `product/${p.id}`
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="sn-card-media">
                  {p.badge && <span className="sn-badge">{p.badge}</span>}
                  <img src={p.image} alt={p.name} />
                  <button
                    type="button"
                    className={`sn-add ${justAdded === p.id ? 'added' : ''}`}
                    aria-label={`Add ${p.name} to cart`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAdd(p)
                    }}
                  >
                    {justAdded === p.id ? '✓' : '+'}
                  </button>
                </div>
                <h4>{p.name}</h4>
                <span className="sn-price">{p.price}</span>
              </div>
            ))}
          </div>

          {/* Dots - only visible on mobile */}
          <div className="sn-dots">
            {visibleProducts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`sn-dot ${slideIndex === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkinNeeds

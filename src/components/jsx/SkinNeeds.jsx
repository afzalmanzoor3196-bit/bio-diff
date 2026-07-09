import { useMemo, useState, useRef, useEffect } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/SkinNeeds.css'
import product1 from '../../assets/Product 1.jpeg'
import product2 from '../../assets/Product 2.jpeg'
import product3 from '../../assets/Product 3.jpeg'
import product4 from '../../assets/Product 4.jpeg'
import product5 from '../../assets/Product 5.jpeg'
import product6 from '../../assets/Product 6.jpeg'
import product7 from '../../assets/Product 7.jpeg'

const filters = ['ACNE & BREAKOUTS', 'HYPERPIGMENTATION', 'DRY & DEHYDRATED SKIN', 'KOREAN GLASS SKIN']

const defaultProducts = [
  {
    id: 'biodiff-glutathione-vitamin-c-intensive-skin-brightening-cream',
    category: 'HYPERPIGMENTATION',
    badge: 'GLOW FORMULA 🪄',
    image: product1,
    name: 'BioDiff Glutathione + Vitamin C Intensive Skin Brightening Cream',
    price: 'Rs.1,880',
    priceValue: 1880,
  },
  {
    id: 'biodiff-glutathione-vit-c-intensive-skin-brightening-cream-(3in1)',
    category: 'DRY & DEHYDRATED SKIN',
    badge: 'BEST SELLER 🔥',
    image: product2,
    name: 'BioDiff Glutathione + Vit-C Intensive Skin Brightening Cream (3in1)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'biodiff-glutathion-brightening-facewash',
    category: 'HYPERPIGMENTATION',
    badge: 'NEW LAUNCH 💎',
    image: product3,
    name: 'BioDiff Glutathion Brightening Facewash (2 Minutes Instant Whitening)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'mandelic-acid-pro-(exfoliating-cream-&-spotless-treatment-set)',
    category: 'ACNE & BREAKOUTS',
    badge: 'NEW LAUNCH 💎',
    image: product4,
    name: 'Mandelic Acid Pro (Exfoliating Cream & Spotless Treatment Set)',
    price: 'Rs.2,000',
    priceValue: 2000,
  },
  {
    id: 'biodiff-mandelac-retinol-10%-facewash-(exfoliates-&-smoothes)',
    category: 'KOREAN GLASS SKIN',
    badge: 'HOT SELLING 🔥',
    image: product5,
    name: 'BioDiff Mandelac Retinol 10% Facewash (Exfoliates & Smoothes)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'spectra-block-spf60-sunblock',
    category: 'HYPERPIGMENTATION',
    badge: 'TOP RATED 🌍',
    image: product6,
    name: 'Spectra Block SPF 60 Broad Spectrum Sunblock',
    price: 'Rs.1,599',
    priceValue: 1599,
  },
  {
    id: 'spectra-block-mega-block-3in1-spf100',
    category: 'HYPERPIGMENTATION',
    badge: 'ULTRA SHIELD ☀️',
    image: product7,
    name: 'Spectra Block Mega Block 3in1 SPF 100 Intense Sunblock Cream',
    price: 'Rs.1,899',
    priceValue: 1899,
  },
]

function SkinNeeds({ products = defaultProducts }) {
  const [active, setActive] = useState(filters[0])
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef(null)

  const visibleProducts = useMemo(() => {
    // Show products in the exact order they are defined (Product 1 → 7)
    return [...products]
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

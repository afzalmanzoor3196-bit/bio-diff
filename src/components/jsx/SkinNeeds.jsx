import { useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/SkinNeeds.css'
import img11 from '../../assets/11.jpeg'
import img12 from '../../assets/12.jpeg'
import img13 from '../../assets/13.jpeg'
import img14 from '../../assets/14.jpeg'

const filters = ['ACNE & BREAKOUTS', 'HYPERPIGMENTATION', 'DRY & DEHYDRATED SKIN', 'KOREAN GLASS SKIN']

const products = [
  {
    id: 'tea-tree-face-wash',
    category: 'ACNE & BREAKOUTS',
    badge: 'TRENDING NOW 🔥',
    image: img11,
    name: 'Tea Tree & Salicylic Acid Face Wash',
    price: 'Rs.1,099',
  },
  {
    id: 'tinted-sunscreen-spf60',
    category: 'HYPERPIGMENTATION',
    badge: 'TOP RATED 🌍',
    image: img12,
    name: 'Tinted Sunscreen SPF 60',
    price: 'Rs.1,599',
  },
  {
    id: 'anti-acne-serum',
    category: 'DRY & DEHYDRATED SKIN',
    badge: null,
    image: img13,
    name: 'Anti-Acne Face Serum (Clear Skin)',
    price: 'Rs.2,099',
  },
  {
    id: 'vitamin-c-serum',
    category: 'KOREAN GLASS SKIN',
    badge: 'KOREAN GLOW 💗',
    image: img14,
    name: 'Vitamin C Face Serum (Glow)',
    price: 'Rs.2,099',
  },
]

function SkinNeeds() {
  const [active, setActive] = useState(filters[0])
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(null)

  const visibleProducts = useMemo(() => products, [])

  const handleAdd = (product) => {
    addToCart(product)
    setJustAdded(product.id)
    window.setTimeout(() => setJustAdded(null), 1200)
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

        <div className="sn-cards">
          {visibleProducts.map((p) => (
            <div className="sn-card" key={p.id}>
              <div className="sn-card-media">
                {p.badge && <span className="sn-badge">{p.badge}</span>}
                <img src={p.image} alt={p.name} />
                <button
                  type="button"
                  className={`sn-add ${justAdded === p.id ? 'added' : ''}`}
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => handleAdd(p)}
                >
                  {justAdded === p.id ? '✓' : '+'}
                </button>
              </div>
              <h4>{p.name}</h4>
              <span className="sn-price">{p.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkinNeeds

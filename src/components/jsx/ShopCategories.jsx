import '../css/ShopCategories.css'
import img1 from '../../assets/asdf.jpeg'
import img2 from '../../assets/Slide 1.jpeg'
import img3 from '../../assets/Slide 2.jpeg'
import img4 from '../../assets/WhatsApp Image 2026-07-07 at 8.22.50 PM (1).jpeg'

const categories = [
  { eyebrow: 'GREAT BARRIER RELIEF', title: 'Fan Fave', image: img1 },
  { eyebrow: 'DAILY ESSENTIAL', title: 'Radiant Care', image: img2 },
  { eyebrow: 'NATURAL GLOW', title: 'Anti-Aging', image: img3 },
  { eyebrow: 'BETTER TOGETHER', title: 'Duos & Kits', image: img4 },
]

function ShopCategories() {
  return (
    <section id="shop" className="shop-categories-grid-section">
      <div className="container">
        <div className="shop-grid">
          {categories.map((cat) => (
            <div className="shop-grid-row" key={cat.title}>
              <div className="shop-grid-image">
                <img src={cat.image} alt={cat.title} />
              </div>
              <div className="shop-grid-text">
                <span className="shop-cat-eyebrow">{cat.eyebrow}</span>
                <span className="shop-cat-title">{cat.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopCategories

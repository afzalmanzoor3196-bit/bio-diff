import '../css/ShopCategories.css'

const categories = [
  { eyebrow: 'GREAT BARRIER RELIEF', title: 'Fan Fave' },
  { eyebrow: 'DAILY ESSENTIAL', title: 'Radiant Care' },
  { eyebrow: 'NATURAL GLOW', title: 'Anti-Aging' },
  { eyebrow: 'BETTER TOGETHER', title: 'Duos & Kits' },
]

function ShopCategories() {
  return (
    <section id="shop" className="shop-categories">
      <div className="container shop-categories-inner">
        <h2 className="shop-title">Shop</h2>
        <div className="shop-cats">
          {categories.map((cat) => (
            <a href="#" className="shop-cat" key={cat.title}>
              <span className="shop-cat-eyebrow">{cat.eyebrow}</span>
              <span className="shop-cat-title">{cat.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopCategories

import '../css/RealResults.css'

import img119 from '../../assets/119.png'
import img120 from '../../assets/120.png'
import img121 from '../../assets/121.png'
import img122 from '../../assets/122.png'

const results = [
  {
    id: 1,
    image: img119,
    tag: 'MELA BIMA',
    title: 'Dark Patches',
    desc: 'Soothe Sensitive Skin',
  },
  {
    id: 2,
    image: img120,
    tag: 'ACNE-PRONE SKIN',
    title: 'Redness Pores',
    desc: 'Balances Breakout-Prone Skin',
  },
  {
    id: 3,
    image: img121,
    tag: 'ANTI PIGMENTATION',
    title: 'Sun Damage',
    desc: 'Gently Cleanses While Hydrating',
  },
  {
    id: 4,
    image: img122,
    tag: 'CLEAN & BRIGHT SKIN',
    title: 'Rough Texture',
    desc: 'Healthy Glow',
  },
]

function RealResults() {
  const goToProducts = () => {
    const target = document.getElementById('skin-needs')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="real-results">
      <div className="container rr-head">
        <p className="rr-eyebrow">PIONEER OF BARRIER-FIRST SKINCARE</p>
        <h2 className="rr-title">Real Results, Real Confidence</h2>
        <p className="rr-subtitle">Press Reset on your skin &amp; planet</p>
      </div>

      <div className="rr-grid">
        {results.map((r) => (
          <div className="rr-card" key={r.id}>
            <img className="rr-image" src={r.image} alt={r.title} loading="lazy" />
            <div className="rr-card-content">
              <span className="rr-tag">{r.tag}</span>
              <h3 className="rr-card-title">{r.title}</h3>
              <p className="rr-card-desc">{r.desc}</p>
              <button className="rr-buy" onClick={goToProducts}>
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RealResults

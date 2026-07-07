import { useRef, useState } from 'react'
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
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToProducts = () => {
    const target = document.getElementById('skin-needs')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const childWidth = scrollRef.current.children[0].offsetWidth
    const gap = 16 // gap between cards in mobile
    const index = Math.round(scrollLeft / (childWidth + gap))
    setActiveIndex(index)
  }

  const scrollTo = (index) => {
    if (!scrollRef.current) return
    const child = scrollRef.current.children[index]
    if (child) {
      // Get the padding of the scroll container to accurately scroll to the child
      const containerPaddingLeft = parseInt(window.getComputedStyle(scrollRef.current).paddingLeft, 10) || 0
      const scrollPosition = child.offsetLeft - scrollRef.current.offsetLeft - containerPaddingLeft
      
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setActiveIndex(index)
    }
  }

  return (
    <section className="real-results">
      <div className="container rr-head">
        <p className="rr-eyebrow">PIONEER OF BARRIER-FIRST SKINCARE</p>
        <h2 className="rr-title">Real Results, Real Confidence</h2>
        <p className="rr-subtitle">Press Reset on your skin &amp; planet</p>
      </div>

      <div className="rr-grid" ref={scrollRef} onScroll={handleScroll}>
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

      <div className="rr-dots">
        {results.map((_, index) => (
          <button
            key={index}
            className={`rr-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default RealResults

import { useState, useEffect } from 'react'
import '../css/HeroBanner.css'

import brighteningFacialImg from '../../assets/asdf.jpeg'

const slides = [
  {
    id: 1,
    image: '/images/marketing/influencers-banner.jpeg',
    theme: 'blue',
    position: 'center center',
    alt: 'Recommended by your favourite influencers',
  },
  {
    id: 2,
    image: brighteningFacialImg,
    theme: 'yellow',
    position: 'center center',
    alt: 'Brightening Facial',
  },
]

function HeroBanner() {
  const [active, setActive] = useState(0)

  // Auto-play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <section className={`hero hero-${slide.theme}`}>
      <div className="hero-media">
        <img
          className="hero-image"
          src={slide.image}
          alt={slide.alt}
          key={slide.id}
          style={{ objectPosition: slide.position }}
        />
      </div>

      <div className="hero-dots" style={{ display: 'flex', position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, gap: '10px' }}>
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActive(idx)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: active === idx ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroBanner

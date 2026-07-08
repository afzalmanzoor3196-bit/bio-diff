import { useState, useEffect } from 'react'
import '../css/HeroBanner.css'

import brighteningFacialImg from '../../assets/Slide 1.jpeg'

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

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[active]

  return (
    <section className={`hero hero-${slide.theme}`} style={{ position: 'relative' }}>
      <div className="hero-media">
        <img
          className="hero-image"
          src={slide.image}
          alt={slide.alt}
          key={slide.id}
          style={{ objectPosition: slide.position }}
        />
      </div>

      {/* Left Navigation Button */}
      <button 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(128, 133, 120, 0.7)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          color: 'white',
          transition: 'background-color 0.3s'
        }}
        aria-label="Previous Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Right Navigation Button */}
      <button 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(128, 133, 120, 0.7)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          color: 'white',
          transition: 'background-color 0.3s'
        }}
        aria-label="Next Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

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

import { useState } from 'react'
import '../css/HeroBanner.css'

const slides = [
  {
    id: 1,
    image: '/images/marketing/influencers-banner.jpeg',
    theme: 'blue',
    position: 'center center',
    alt: 'Recommended by your favourite influencers',
  },
]

function HeroBanner() {
  const [active] = useState(0)
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
    </section>
  )
}

export default HeroBanner

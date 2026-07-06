import { useState } from 'react'
import '../css/Philosophy.css'

function Philosophy() {
  const [leftVote, setLeftVote] = useState('')
  const [rightVote, setRightVote] = useState('')
  const [activePanel, setActivePanel] = useState('philosophy')

  const panelText = {
    philosophy:
      'We believe skincare should be simple, effective, and joyful — designed to support your skin barrier with ingredients that work together, every day.',
    planet:
      'Our commitment to people and planet means clean ingredients, conscious packaging, and sustainable choices that help skin and earth thrive together.',
  }

  return (
    <section className="philosophy" id="philosophy">
      <div className="phil-note phil-note-left">
        <span className="phil-note-label">ALERT</span>
        <p>WANT INSTANT RESULTS? ✨</p>
        <div className="phil-note-actions">
          <button
            type="button"
            className={leftVote === 'no' ? 'vote-btn active' : 'vote-btn'}
            onClick={() => setLeftVote('no')}
            aria-label="No, I don't want instant results"
          >
            👎
          </button>
          <button
            type="button"
            className={leftVote === 'yes' ? 'vote-btn active' : 'vote-btn'}
            onClick={() => setLeftVote('yes')}
            aria-label="Yes, I want instant results"
          >
            👍
          </button>
        </div>
      </div>

      <div className="phil-note phil-note-right">
        <span className="phil-note-label">ALERT</span>
        <p>READY FOR PERFECT IG-WORTHY SKIN? 🍀🍀🍀</p>
        <div className="phil-note-actions">
          <button
            type="button"
            className={rightVote === 'no' ? 'vote-btn active' : 'vote-btn'}
            onClick={() => setRightVote('no')}
            aria-label="No, not ready for IG-worthy skin"
          >
            👎
          </button>
          <button
            type="button"
            className={rightVote === 'yes' ? 'vote-btn active' : 'vote-btn'}
            onClick={() => setRightVote('yes')}
            aria-label="Yes, ready for IG-worthy skin"
          >
            👍
          </button>
        </div>
      </div>

      <div className="container phil-content">
        <h2>
          BioDiff is Pakistan’s premium organic skincare brand, created with naturally inspired ingredients to nourish, protect, and enhance your skin’s natural radiance. Our luxurious, gentle formulas bring together purity, performance, and everyday self-care—so your skin feels healthy, glowing, and beautifully refreshed.
        </h2>

        <div className="phil-buttons">
          <button
            type="button"
            className={
              activePanel === 'philosophy'
                ? 'phil-btn phil-btn-yellow active'
                : 'phil-btn phil-btn-yellow'
            }
            onClick={() => setActivePanel('philosophy')}
          >
            <span>😊</span> OUR PHILOSOPHY
          </button>
          <button
            type="button"
            className={
              activePanel === 'planet'
                ? 'phil-btn phil-btn-blue active'
                : 'phil-btn phil-btn-blue'
            }
            onClick={() => setActivePanel('planet')}
          >
            <span>🌍</span> PEOPLE &amp; PLANET FIRST
          </button>
        </div>

        <div className="phil-panel">
          <p>{panelText[activePanel]}</p>
        </div>
      </div>
    </section>
  )
}

export default Philosophy

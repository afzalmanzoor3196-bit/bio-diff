import { useEffect, useRef, useState } from 'react'
import '../css/HerStories.css'
import story1Video from '../../assets/Story 1.mp4'

const posters = ['/images/stories/story-1.jpg', '/images/stories/story-2.jpg', '/images/stories/story-3.jpg']
const defaultStories = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  poster: posters[index % posters.length],
  video: index === 0 ? story1Video : null,
}))

function HerStories({ stories = defaultStories }) {
  const [muted, setMuted] = useState([])
  const [playing, setPlaying] = useState([])
  const [selectedStory, setSelectedStory] = useState(null)
  const videoRefs = useRef([])
  const trackRef = useRef(null)

  const toggleMute = (i) => {
    setMuted((prev) => {
      const value = !prev[i]
      const updated = prev.map((v, idx) => (idx === i ? value : v))
      const video = videoRefs.current[i]
      if (video) video.muted = value
      return updated
    })
  }

  const togglePlay = (i) => {
    const video = videoRefs.current[i]
    if (!video) return

    if (video.paused) {
      video.muted = muted[i]
      video.play()
      setPlaying((p) => p.map((_, idx) => idx === i))
      videoRefs.current.forEach((other, idx) => {
        if (other && idx !== i) {
          other.pause()
        }
      })
    } else {
      video.pause()
      setPlaying((p) => p.map((v, idx) => (idx === i ? false : v)))
    }
  }

  const scrollByCards = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.hs-video')
    const width = card ? card.offsetWidth + 24 : 300
    track.scrollBy({ left: dir * width, behavior: 'smooth' })
  }

  useEffect(() => {
    setMuted(stories.map(() => true))
    setPlaying(stories.map(() => false))
    videoRefs.current = []
  }, [stories])

  useEffect(() => {
    document.body.style.overflow = selectedStory ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedStory])

  const openStoryModal = (story) => {
    setSelectedStory(story)
  }

  const closeStoryModal = () => {
    setSelectedStory(null)
  }

  const goToProducts = () => {
    const target = document.getElementById('skin-needs')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="her-stories">
      <div className="container hs-head">
        <div>
          <h2>HER STORIES</h2>
          <p>See what our customers are saying about their experience with our products.</p>
        </div>
        <button className="hs-shop-btn" onClick={goToProducts}>
          Shop Now
        </button>
      </div>

      <div className="hs-carousel">
        <button className="hs-arrow hs-arrow-left" onClick={() => scrollByCards(-1)} aria-label="Previous story">
          ‹
        </button>

        <div className="hs-track" ref={trackRef}>
          {stories.map((s, i) => {
            const storyVideo = s.video || s.videoUrl || null
            const storyPoster = s.poster || s.posterUrl || '/images/stories/story-1.jpg'

            return (
              <div
                className="hs-video"
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => openStoryModal(s)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openStoryModal(s)
                  }
                }}
              >
                {storyVideo ? (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className="hs-video-element"
                    src={storyVideo}
                    muted={muted[i]}
                    loop
                    playsInline
                    controls={false}
                  />
                ) : (
                  <img src={storyPoster} alt={`Customer story ${s.id}`} loading="lazy" />
                )}
                {s.title && <div className="hs-story-title">{s.title}</div>}
                <button
                  className="hs-play"
                  aria-label="Play video"
                  onClick={(event) => {
                    event.stopPropagation()
                    togglePlay(i)
                  }}
                >
                  {playing[i] ? '❚❚' : '▶'}
                </button>
                <button
                  className="hs-mute"
                  aria-label="Toggle mute"
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleMute(i)
                  }}
                >
                  {muted[i] ? '🔇' : '🔊'}
                </button>
              </div>
            )
          })}
        </div>

        <button className="hs-arrow hs-arrow-right" onClick={() => scrollByCards(1)} aria-label="Next story">
          ›
        </button>
      </div>

      <div className="hs-bottom-btn">
        <button className="hs-shop-btn" onClick={goToProducts}>
          Shop Now
        </button>
      </div>

      {selectedStory && (
        <div className="hs-modal-backdrop" onClick={closeStoryModal}>
          <div className="hs-modal" onClick={(event) => event.stopPropagation()}>
            <button className="hs-modal-close" aria-label="Close story" onClick={closeStoryModal}>
              ×
            </button>
            <div className="hs-modal-media">
              {selectedStory.video || selectedStory.videoUrl ? (
                <video src={selectedStory.video || selectedStory.videoUrl} controls autoPlay playsInline />
              ) : (
                <img src={selectedStory.poster || selectedStory.posterUrl || '/images/stories/story-1.jpg'} alt={selectedStory.title || `Story ${selectedStory.id}`} />
              )}
            </div>
            <div className="hs-modal-content">
              <h3>{selectedStory.title || `Story ${selectedStory.id}`}</h3>
              <p>Explore this customer story in full view.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HerStories

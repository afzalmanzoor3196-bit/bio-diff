import '../css/AnnouncementBar.css'

const announcements = [
  'FREE SHIPPING ON ALL ORDERS OVER Rs. 3,000',
  '100% CRUELTY-FREE & VEGAN FORMULAS',
  'FLAT 15% OFF ON ALL SKINCARE BUNDLES',
  'DERMATOLOGICALLY TESTED PRODUCTS',
  'REVIVE YOUR NATURAL GLOW WITH REVIVAL NATURALS',
]

function AnnouncementBar() {
  // Double the array to make the infinite marquee seamless
  const items = [...announcements, ...announcements]

  return (
    <div className="announcement-bar" id="announcement-bar">
      <div className="announcement-track">
        {items.map((text, idx) => (
          <div className="announcement-item" key={idx}>
            <svg
              className="announcement-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar

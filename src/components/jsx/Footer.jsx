import { useState } from 'react'
import '../css/Footer.css'

const aboutLinks = [
  { label: 'Contact', href: '#contact' },
  { label: 'Shipping & Return', href: '#shop' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Privacy Policy', href: '#privacy' },
]

const collectionLinks = [
  { label: 'Bundle', href: '#bundle' },
  { label: 'Hair Care', href: '#hair-care' },
  { label: 'Skin Care', href: '#skin-care' },
  { label: 'Shop All', href: '#shop' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
        <path d="M13.5 22V13.5h3.5l.5-3.5h-4V7.5c0-1 .25-1.5 1.5-1.5h2V2.5h-2.5C11.5 2.5 10 4 10 6.75V10H7.5v3.5H10V22h3.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
        <rect x="3" y="3" width="18" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.5a8.16 8.16 0 004.78 1.52V7.57a4.85 4.85 0 01-1.01-.88z" fill="currentColor" />
      </svg>
    ),
  },
]

const badges = [
  {
    label: 'Certified B Corp',
    icon: (
      <svg viewBox="0 0 80 80" width="48" height="48" fill="currentColor">
        <text x="40" y="15" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">Certified</text>
        <circle cx="40" cy="38" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="40" y="44" fontFamily="'Times New Roman', Times, serif" fontSize="19" fontWeight="bold" textAnchor="middle">B</text>
        <line x1="22" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="69" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle">Corporation</text>
      </svg>
    ),
  },
  {
    label: '1% For The Planet',
    icon: (
      <svg viewBox="0 0 80 80" width="48" height="48" fill="currentColor">
        <circle cx="40" cy="30" r="17" fill="currentColor" />
        <text x="35" y="37" fontFamily="Helvetica, Arial, sans-serif" fontSize="21" fontWeight="900" fill="#edf3db" textAnchor="middle">1</text>
        <text x="48" y="27" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#edf3db" textAnchor="middle">%</text>
        <text x="40" y="58" fontFamily="sans-serif" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">FOR THE</text>
        <text x="40" y="68" fontFamily="sans-serif" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="1">PLANET</text>
      </svg>
    ),
  },
  {
    label: 'Plastic Neutral',
    icon: (
      <svg viewBox="0 0 80 80" width="48" height="48" fill="currentColor">
        <circle cx="40" cy="30" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="40" cy="30" r="13" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,2" />
        <path d="M29 34c3-2 6-2 9 0s6 2 9 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M27 30c4-2 7-2 11 0s7 2 11 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="40" y="58" fontFamily="sans-serif" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">PLASTIC</text>
        <text x="40" y="68" fontFamily="sans-serif" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">NEUTRAL</text>
      </svg>
    ),
  },
  {
    label: 'Climate Neutral',
    icon: (
      <svg viewBox="0 0 80 80" width="48" height="48" fill="currentColor">
        <g transform="translate(40, 30)">
          <circle cx="0" cy="0" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="0" y1="9" x2="0" y2="14" stroke="currentColor" strokeWidth="1.8" />
          <line x1="0" y1="-9" x2="0" y2="-14" stroke="currentColor" strokeWidth="1.8" />
          <line x1="9" y1="0" x2="14" y2="0" stroke="currentColor" strokeWidth="1.8" />
          <line x1="-9" y1="0" x2="-14" y2="0" stroke="currentColor" strokeWidth="1.8" />
          <line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1.8" />
          <line x1="-6" y1="-6" x2="-10" y2="-10" stroke="currentColor" strokeWidth="1.8" />
          <line x1="6" y1="-6" x2="10" y2="-10" stroke="currentColor" strokeWidth="1.8" />
          <line x1="-6" y1="6" x2="-10" y2="10" stroke="currentColor" strokeWidth="1.8" />
        </g>
        <text x="40" y="58" fontFamily="sans-serif" fontSize="7.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">CLIMATE</text>
        <text x="40" y="68" fontFamily="sans-serif" fontSize="7.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">NEUTRAL</text>
      </svg>
    ),
  },
  {
    label: 'Animal Cruelty Free & Vegan',
    icon: (
      <svg viewBox="0 0 120 80" width="76" height="48" fill="currentColor">
        <g transform="translate(12, 12)">
          <path d="M12 28 C10 16, 5 8, 8 4 C11 0, 17 8, 18 16 C20 8, 26 0, 29 4 C32 8, 27 16, 25 28 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="13" cy="22" r="1.5" fill="currentColor" />
          <path d="M9 30 Q18 34 27 30" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </g>
        <text x="48" y="30" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold">ANIMAL</text>
        <text x="48" y="38" fontFamily="sans-serif" fontSize="6" fontWeight="bold">TEST-FREE</text>
        <line x1="48" y1="44" x2="96" y2="44" stroke="currentColor" strokeWidth="1" />
        <text x="48" y="54" fontFamily="sans-serif" fontSize="7.5" fontWeight="900" letterSpacing="1.2">VEGAN</text>
      </svg>
    ),
  },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="footer">

      {/* Newsletter strip */}
      <div className="footer-newsletter">
        <div className="container footer-newsletter-inner">
          <div className="footer-nl-text">
            <h2>Get 10% OFF Your First Order</h2>
            <p>SUBSCRIBE TO OUR NEWSLETTER AND RECEIVE 10% OFF ON YOUR FIRST PURCHASE</p>
          </div>
          <form className="footer-nl-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">→</button>
          </form>
          {subscribed && <p className="footer-nl-success">✓ Thank you for subscribing!</p>}
        </div>
      </div>

      {/* Big brand watermark: REVIVAL NATURALS */}
      <div className="footer-wordmark" aria-hidden="true">BIO DIFF</div>

      {/* Main grid */}
      <div className="container footer-grid">
        {/* About */}
        <div className="footer-about">
          <div className="footer-logo-mark" aria-hidden="true">
            {/* Detailed teardrop leaf icon */}
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
              <path d="M20 3C20 3 8 16 8 24C8 30.6 13.4 36 20 36C26.6 36 32 30.6 32 24C32 16 20 3 20 3ZM20 32C15.6 32 12 28.4 12 24C12 18.5 18.4 10.3 20 8.2C21.6 10.3 28 18.5 28 24C28 28.4 24.4 32 20 32Z" fill="#1a1a1a" />
              <path d="M20 12V30M20 18C18 20 16 22 16 24M20 22C22 24 24 25 24 27" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h4>About Us</h4>
          <p>
            Bio Diff brings you authentic, clean, and
            effective skincare crafted with nature's finest
            actives. Halal certified, dermatologically tested, and
            proudly made in Pakistan for skin that loves you
            back.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* About links */}
        <div className="footer-col">
          <h5>ABOUT</h5>
          <ul>
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Collection links */}
        <div className="footer-col">
          <h5>COLLECTION</h5>
          <ul>
            {collectionLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials links */}
        <div className="footer-col">
          <h5>SOCIALS</h5>
          <ul>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>

        {/* Certification badges on the right */}
        <div className="footer-badges-container">
          <div className="footer-badges">
            {badges.map((badge) => (
              <div key={badge.label} className="footer-badge-icon" title={badge.label} aria-label={badge.label}>
                {badge.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-bottom-left">
            <p className="footer-bottom-credit">Design and Development by <a href="#" rel="noreferrer">360 Fields</a></p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#shipping">Shipping Policy</a>
            </div>
            <p>© 2026 Biodiff, LLC. All Rights Reserved.</p>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer

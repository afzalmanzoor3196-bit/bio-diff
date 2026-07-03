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
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 7.5c0 1.66 1.34 3 3 3h1.5v4.5c0 1.38-1.12 2.5-2.5 2.5C9.12 17.5 8 16.38 8 15V6.5h1V7.5z" fill="currentColor" />
        <path d="M13.5 6.5V4h2c1.1 0 2 .9 2 2v6.5h-1.25V9.25c0-1.24-1.01-2.25-2.25-2.25H13.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 22V13.5h3.5l.5-3.5h-4V7.5c0-1 0.25-1.5 1.5-1.5h2V2.5h-2.5C11.5 2.5 10 4 10 6.75V10H7.5v3.5H10V22h3.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.5 7.5c-.3-.3-.8-.3-1.1 0L13 9.9c-.3.3-.8.3-1.1 0l-1.9-1.9c-.3-.3-.8-.3-1.1 0L7.5 8.4c-.2.2-.3.5-.2.8C7.8 10.2 8 11.8 8 13.5c0 3.6 2.9 6.5 6.5 6.5 1.7 0 3.3-.7 4.4-1.8 1.1-1.1 1.8-2.7 1.8-4.4 0-1.7-.7-3.3-1.8-4.4l-1.9-1.9z" fill="currentColor" opacity=".2" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 2.1.7 4.1 1.9 5.7L2 22l4.4-1.2C8 21.3 10 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm2.8 14.7c-.2.6-.9.9-1.4.8-1.2-.3-2.2-1-3.1-1.9-.8-.8-1.4-1.7-1.7-2.7-.1-.4 0-.9.5-1.1.5-.2 1.1 0 1.3.6.2.5.5 1 .9 1.4.3.3.8.6 1.3.5.4-.1.7-.5.8-.9.1-.2.2-.4.3-.6.1-.3 0-.6-.1-.9-.1-.2-.4-.4-.6-.4-.5-.1-1.1-.2-1.6-.2-.4 0-.9 0-1.3.1-.3.1-.7.1-1 .3-.4.2-.7.5-1 1-.4.7-.5 1.5-.3 2.3.2.9.8 1.7 1.5 2.4 1 1 2.4 1.5 3.7 1.4.6 0 1.3-.1 1.8-.5.4-.3.7-.8.5-1.3-.1-.1-.2-.1-.3-.1z" fill="currentColor" />
      </svg>
    ),
  },
]

const badges = [
  {
    label: 'Certified B Corp',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M10 7h4v10h-2V9h-2V7z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'For the Planet',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: 'Plastic Neutral',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7l3-3 3 3M12 4v6M7 17l3 3 3-3M12 14v6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Sun Safe',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M4.5 19.5l2.1-2.1M17.4 6.6l2.1-2.1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: 'Vegan',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12c0-3 2.5-5.5 5.5-5.5S17 9 17 12c0 1.7-.8 3.3-2.2 4.4C13.7 17.9 12.9 18 12 18s-1.7-.1-2.3-.6C6.8 15.3 6 13.7 6 12z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 18s2-1.5 2-4" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wordmark">BioDiff</div>

      <div className="container footer-grid">
        <div className="footer-about">
          <div className="footer-logo-mark" aria-hidden="true" />
          <h4>About Us</h4>
          <p>
            Revival Naturals brings you authentic, clean, and effective skincare crafted with nature’s finest
            actives. Halal certified, dermatologically tested, and proudly made for skin that loves you back.
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

        <div className="footer-col footer-col-socials">
          <h5>SOCIALS</h5>
          <ul>
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-badges">
          {badges.map((badge) => (
            <span key={badge.label} title={badge.label} aria-label={badge.label}>
              {badge.icon}
            </span>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#shipping">Shipping Policy</a>
          </div>
          <p>© 2026 Revival Naturals, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

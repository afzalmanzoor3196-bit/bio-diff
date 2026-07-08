import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/Header.css'
import logo from '../../assets/DIFF logo.PNG'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop' },
  { label: 'Best Seller', href: '#skin-needs' },
  { label: 'Bundle', href: '#' },
  { label: 'Skin Care', href: '#skin-needs' },
  { label: 'Shop By Concern', href: '#skin-needs' },
  { label: 'Body Care', href: '#' },
  { label: 'Hair Care', href: '#' },
  { label: 'Cosmetics', href: '#' },
]

function Header({ onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount } = useCart()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    const target = document.getElementById('skin-needs')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <img src={logo} alt="BioDiff" className="logo-img-new" />
        </a>

        {/* Overlay and Close Button for Mobile Menu */}
        {menuOpen && (
          <>
            <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>
            <button className="nav-close-btn" onClick={() => setMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </>
        )}

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <div className="nav-mobile-search">
            <form onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  {link.label === 'Shop By Concern' && (
                    <span className="caret-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-icons">
          {searchOpen ? (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                autoFocus
                type="text"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
              />
            </form>
          ) : (
            <button
              aria-label="Search"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          )}

          <button aria-label="Cart" className="icon-btn cart-icon" onClick={onCartClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          <button
            aria-label="Toggle menu"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

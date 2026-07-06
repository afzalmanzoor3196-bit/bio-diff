import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/Header.css'
import logo from '../../assets/Logo.2.png'

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
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <img src={logo} alt="BioDiff" className="logo-img-new" />
        </a>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
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

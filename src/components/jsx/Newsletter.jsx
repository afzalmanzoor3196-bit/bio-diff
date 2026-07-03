import { useState } from 'react'
import '../css/Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Hook this up to your email provider / API
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <h2>Get 10% OFF Your First Order</h2>
        <p>SUBSCRIBE TO OUR NEWSLETTER AND RECEIVE 10% OFF ON YOUR FIRST PURCHASE.</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" aria-label="Subscribe">
            →
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter

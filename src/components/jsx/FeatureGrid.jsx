import '../css/FeatureGrid.css'

function FeatureGrid() {
  return (
    <section className="feature-grid">
      <div className="fg-wrap">
        <div className="fg-card fg-purple">
          <h3>Glow Better Every Day</h3>
          <p>Experience the power of skincare designed to revive your natural glow.</p>
        </div>
        <div className="fg-card fg-orange">
          <h3>Complete Care for Radiant Skin</h3>
          <p>From cleansing to hydration, this skincare range is made to support your everyday beauty routine.</p>
        </div>
        <div className="fg-card fg-yellow">
          <h3>Nature Meets Skincare Science</h3>
          <p>Infused with skin-loving actives, this formula deeply cares for your skin without harsh chemicals.</p>
        </div>
        <div className="fg-media fg-product">
          <img src="/images/marketing/natural-glow-duo.jpeg" alt="BioDiff Mandelic and Brightening product duo" />
        </div>
        <div className="fg-media fg-smear">
          <img src="/images/products/spectra-block-spf60.jpeg" alt="BioDiff Spectra Block sunblock" />
        </div>
        <div className="fg-media fg-model">
          <img src="/images/marketing/model-glutathione.jpeg" alt="Model holding BioDiff Glutathion products" />
        </div>
        <div className="fg-card fg-blue">
          <h3>Made with Love &amp; Confidence</h3>
          <p>Created with care to give your skin the comfort and nourishment it deserves.</p>
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid

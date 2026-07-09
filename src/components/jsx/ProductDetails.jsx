import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/ProductDetails.css'
import product1 from '../../assets/Product 1.jpeg'
import product2 from '../../assets/Product 2.jpeg'
import product3 from '../../assets/Product 3.jpeg'
import product4 from '../../assets/Product 4.jpeg'
import product5 from '../../assets/Product 5.jpeg'
import product6 from '../../assets/Product 6.jpeg'
import product7 from '../../assets/Product 7.jpeg'

// Static fallback: only used if the product is NOT found in the live products prop
const STATIC_PRODUCTS = [
  {
    id: 'biodiff-glutathione-vitamin-c-intensive-skin-brightening-cream',
    category: 'HYPERPIGMENTATION',
    badge: 'GLOW FORMULA 🪄',
    image: product1,
    name: 'BioDiff Glutathione + Vitamin C Intensive Skin Brightening Cream',
    price: 'Rs.1,880',
    priceValue: 1880,
  },
  {
    id: 'biodiff-glutathione-vit-c-intensive-skin-brightening-cream-(3in1)',
    category: 'DRY & DEHYDRATED SKIN',
    badge: 'BEST SELLER 🔥',
    image: product2,
    name: 'BioDiff Glutathione + Vit-C Intensive Skin Brightening Cream (3in1)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'biodiff-glutathion-brightening-facewash',
    category: 'HYPERPIGMENTATION',
    badge: 'NEW LAUNCH 💎',
    image: product3,
    name: 'BioDiff Glutathion Brightening Facewash (2 Minutes Instant Whitening)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'mandelic-acid-pro-(exfoliating-cream-&-spotless-treatment-set)',
    category: 'ACNE & BREAKOUTS',
    badge: 'NEW LAUNCH 💎',
    image: product4,
    name: 'Mandelic Acid Pro (Exfoliating Cream & Spotless Treatment Set)',
    price: 'Rs.2,000',
    priceValue: 2000,
  },
  {
    id: 'biodiff-mandelac-retinol-10%-facewash-(exfoliates-&-smoothes)',
    category: 'KOREAN GLASS SKIN',
    badge: 'HOT SELLING 🔥',
    image: product5,
    name: 'BioDiff Mandelac Retinol 10% Facewash (Exfoliates & Smoothes)',
    price: 'Rs.1,200',
    priceValue: 1200,
  },
  {
    id: 'spectra-block-spf60-sunblock',
    category: 'HYPERPIGMENTATION',
    badge: 'TOP RATED 🌍',
    image: product6,
    name: 'Spectra Block SPF 60 Broad Spectrum Sunblock',
    price: 'Rs.1,599',
    priceValue: 1599,
  },
  {
    id: 'spectra-block-mega-block-3in1-spf100',
    category: 'HYPERPIGMENTATION',
    badge: 'ULTRA SHIELD ☀️',
    image: product7,
    name: 'Spectra Block Mega Block 3in1 SPF 100 Intense Sunblock Cream',
    price: 'Rs.1,899',
    priceValue: 1899,
  },
]

const PRODUCT_DETAILS_MAP = {
  'biodiff-glutathione-vitamin-c-intensive-skin-brightening-cream': {
    reviewsCount: 28,
    rating: 5,
    tagLine: 'Experience a luminous, spotless glow with the ultimate skin-brightening cream. 🌟',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Experience a luminous, spotless glow with the ultimate skin-brightening cream. 🌟 Contains premium Glutathione and active Vitamin C for deep dermal brightening and skin regeneration.`,
      benefits: [
        { title: 'Intensive Skin Brightening', desc: 'High concentration of Glutathione reduces dark spots and melanin synthesis.' },
        { title: 'Antioxidant Defense', desc: 'Vitamin C neutralizes free radicals, boosts collagen, and prevents sun damage.' },
        { title: 'Evens Skin Tone', desc: 'Fades hyperpigmentation, age spots, and uneven patches for a unified complexion.' },
        { title: 'Barrier Hydration', desc: 'Nourishing base strengthens the skin barrier to lock in essential moisture.' }
      ],
      about: `Our flagship BioDiff Glutathione + Vitamin C Intensive Skin Brightening Cream is scientifically engineered to restore your skin's natural luminance. By targeting the cellular pathways responsible for pigmentation, this luxurious cream works round the clock to clear uneven skin tones and smooth out fine lines.

Infused with pure Glutathione, a master antioxidant, it directly inhibits melanin production, resolving issues of hyperpigmentation and dullness.

Vitamin C boosts this effect, revitalizing fatigued skin and stimulating healthy collagen growth. With daily application, skin looks visibly healthier, firmer, and glows with a youthful, radiant light.`,
      howToUse: `After cleansing your face and neck, take a dime-sized amount of the brightening cream.

Apply in gentle, upward circular motions until fully absorbed. For optimal results, use twice daily (morning and evening). During the daytime, always follow up with a broad-spectrum sunscreen like our Tinted Sunscreen SPF 60.`,
      ingredients: `KEY INGREDIENTS:
- Glutathione: Master antioxidant that brightens skin and eliminates dark spots.
- L-Ascorbic Acid (Vitamin C): Boosts skin glow and stimulates collagen synthesis.
- Hyaluronic Acid: Retains hydration up to 1000x its weight, keeping skin plump.

COMPLETE INGREDIENTS:
AQUA, GLYCERIN, GLUTATHIONE, L-ASCORBIC ACID, NIACINAMIDE, SH-OLIGOPEPTIDE-1, HYALURONIC ACID, SHEA BUTTER, SWEET ALMOND OIL, SQUALANE, PANTHENOL, TOCOPHERYL ACETATE, LICORICE ROOT EXTRACT, XANTHAN GUM, PHENOXYETHANOL, ETHYLHEXYLGLYCERIN.`
    }
  },
  'biodiff-glutathione-vit-c-intensive-skin-brightening-cream-(3in1)': {
    reviewsCount: 42,
    rating: 5,
    tagLine: '3 actions in 1 formula: Brightens, hydrates, and protects for a 7-day natural glow. 💗',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `3 actions in 1 formula: Brightens, hydrates, and protects for a 7-day natural glow. 💗 Formulated to give you maximum results with minimum steps.`,
      benefits: [
        { title: 'Triple Action Formula', desc: 'Serves as an intensive brightener, deep moisturizer, and antioxidant shield.' },
        { title: '7-Day Glow Result', desc: 'A fast-acting complex that delivers noticeable brightness in just one week.' },
        { title: 'Fades Pigmentation', desc: 'Directly targets melasma, sun spots, and dark patches for clear skin.' },
        { title: 'Calms and Nourishes', desc: 'Soothing extracts reduce skin redness and calm sensitive skin.' }
      ],
      about: `Simplify your skincare routine without compromising on results. The BioDiff Glutathione + Vit-C 3-in-1 Cream combines the power of active skin brighteners, moisture-locking humectants, and protecting antioxidants.

It works efficiently to hydrate dry layers, reduce stubborn dark marks, and prevent environmental skin damage.

The lightweight texture melts effortlessly into the skin, providing a smooth, non-greasy canvas that feels refreshed all day long. Perfect for all skin types, including sensitive skin.`,
      howToUse: `Dispense a small amount onto your fingertips.

Smooth evenly over your cleansed face and neck. Massage gently in circular motions. Use daily in the morning and night. Can be used as a moisturizing primer under makeup.`,
      ingredients: `KEY INGREDIENTS:
- Glutathione & Vitamin C: Powerful synergistic duo for cellular brightening.
- Alpha Arbutin: Highly safe and effective agent to reduce skin discoloration and age spots.
- Aloe Vera & Panthenol: Soothing agents that calm skin irritation and repair skin barrier.

COMPLETE INGREDIENTS:
AQUA, CAPRYLIC/CAPRIC TRIGLYCERIDE, GLUTATHIONE, ASCORBYL GLUCOSIDE (VITAMIN C), ALPHA ARBUTIN, NIACINAMIDE, ALOE BARBADENSIS LEAF JUICE, PANTHENOL, GLYCERIN, TOCOPHERYL ACETATE, ALLANTOIN, CARBOMER, DISODIUM EDTA, PHENOXYETHANOL.`
    }
  },
  'biodiff-glutathion-brightening-facewash': {
    reviewsCount: 36,
    rating: 5,
    tagLine: 'Instantly brightens in just 2 minutes with powerful Glutathione formulation. ✨',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Instantly brightens in just 2 minutes with powerful Glutathione formulation. ✨ Experience radiant skin from the very first wash.`,
      benefits: [
        { title: 'Instant 2-Min Whitening', desc: 'Advanced Glutathione complex delivers visible brightening from the first use.' },
        { title: 'Deep Pore Cleanse', desc: 'Removes dirt, excess oil, and impurities from deep within pores.' },
        { title: 'Fades Dark Spots', desc: 'Regular use reduces hyperpigmentation and dark patches effectively.' },
        { title: 'Refreshing Lather', desc: 'Rich creamy lather gently cleanses without stripping natural moisture.' }
      ],
      about: `BioDiff Glutathion Brightening Facewash is formulated with high-concentration Glutathione to deliver visible skin brightening results in as little as 2 minutes. The unique formula penetrates deeply into the skin to inhibit melanin formation and clear away surface impurities.

Enriched with Vitamin C and skin-soothing botanical extracts, this facewash works to unify skin tone, fade dark patches, and reveal a luminous complexion. Suitable for daily use.`,
      howToUse: `Wet your face and neck with lukewarm water.

Apply a small amount to your palms and work into a lather. Massage gently onto your face for 2 minutes using circular motions. Rinse thoroughly and pat dry. Use twice daily for best results.`,
      ingredients: `KEY INGREDIENTS:
- Glutathione: Inhibits melanin synthesis for instant skin brightening.
- Vitamin C (Ascorbyl Glucoside): Antioxidant that brightens and protects skin.
- Niacinamide: Reduces pore size and controls oil production.

COMPLETE INGREDIENTS:
AQUA, SODIUM LAURETH SULFATE, COCAMIDOPROPYL BETAINE, COCAMIDE DEA, GLUTATHIONE, ASCORBYL GLUCOSIDE, NIACINAMIDE, GLYCERIN, PANTHENOL, ALOE BARBADENSIS EXTRACT, ALLANTOIN, DMDM HYDANTOIN, DISODIUM EDTA, PHENOXYETHANOL.`
    }
  },
  'mandelic-acid-pro-(exfoliating-cream-&-spotless-treatment-set)': {
    reviewsCount: 35,
    rating: 5,
    tagLine: 'Professional acne clearing & blemish fading treatment with gentle Mandelic Acid. 💎',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Professional acne clearing & blemish fading treatment with gentle Mandelic Acid. 💎 Clears pores, removes whiteheads, and reveals spotless skin.`,
      benefits: [
        { title: 'Gentle Resurfacing', desc: 'Mandelic Acid is gentler than other AHAs, making it perfect for sensitive skin.' },
        { title: 'Clears Pore Congestion', desc: 'Dissolves deep-seated dirt, oil, and dead skin cells to prevent breakouts.' },
        { title: 'Fades Stubborn Spots', desc: 'Highly effective at clearing post-acne marks, scars, and blemishes.' },
        { title: 'Refines Texture', desc: 'Polishes rough texture and smooths out fine lines and wrinkles.' }
      ],
      about: `Mandelic Acid Pro Exfoliating Cream & Spotless Treatment Set is a revolutionary chemical exfoliator. Mandelic Acid has a larger molecular structure compared to Glycolic Acid, which means it penetrates the skin more slowly and gently, minimizing any risk of irritation or redness.

This makes it the absolute best choice for sensitive, acne-prone, or hyperpigmented skin.

It works at the surface to dissolve the adhesive bonds of dead cells, while penetrating pores to regulate sebum and eliminate acne-causing bacteria. Balanced with skin-soothing botanical extracts, this formula delivers clinic-grade resurfacing at home.`,
      howToUse: `Apply a thin layer to clean, dry face in the evening. Avoid the eye area.

Start by applying 2 to 3 times a week, gradually increasing frequency to nightly as your skin builds tolerance. Follow with a soothing moisturizer. Always wear SPF during the day, as AHAs can increase sun sensitivity.`,
      ingredients: `KEY INGREDIENTS:
- Mandelic Acid: Gentle AHA that exfoliates skin and targets pigmentation.
- Salicylic Acid (BHA): Penetrates pores to clean blackheads and prevent acne.
- Centella Asiatica (Cica): Deeply calms skin, reduces redness, and accelerates healing.

COMPLETE INGREDIENTS:
AQUA, MANDELIC ACID, NIACINAMIDE, SALICYLIC ACID, CENTELLA ASIATICA EXTRACT, GLYCERIN, PROPYLENE GLYCOL, ALOE BARBADENSIS LEAF EXTRACT, SODIUM HYALURONATE, CHAMOMILLA RECUTITA FLOWER EXTRACT, ALLANTOIN, XANTHAN GUM, TRIETHANOLAMINE, PHENOXYETHANOL.`
    }
  },
  'biodiff-mandelac-retinol-10%-facewash-(exfoliates-&-smoothes)': {
    reviewsCount: 19,
    rating: 5,
    tagLine: 'Polishes rough skin, refines pores, and fights signs of aging in one simple wash. 🔥',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Polishes rough skin, refines pores, and fights signs of aging in one simple wash. 🔥 Power-packed with Mandelic Acid and active Retinol liposomes.`,
      benefits: [
        { title: 'Deep Exfoliation', desc: 'Gently cleanses away dead skin cells, polishing the skin texture.' },
        { title: 'Anti-Aging Complex', desc: 'Retinol stimulates cell turnover, reducing fine lines and boosting elasticity.' },
        { title: 'Minimizes Pores', desc: 'Deeply cleanses follicular walls, visibly shrinking enlarged pores.' },
        { title: 'Luminous Polish', desc: 'Removes surface dullness, restoring a fresh, glowing appearance.' }
      ],
      about: `Revitalize your skin cleansing with BioDiff Mandelac Retinol 10% Facewash. This advanced formula combines Mandelic Acid (for gentle surface chemical exfoliation) with Retinol Liposomes (for deep cellular renewal).

It thoroughly lifts dirt, excess sebum, and makeup residues, while active ingredients work to refine pores and smooth out uneven textures.

This face wash stimulates microcirculation and healthy cellular turn-over, meaning every wash reveals brighter, smoother, and younger-looking skin without stripping away essential moisture.`,
      howToUse: `Dampen your face and neck with lukewarm water.

Dispense a coin-sized amount and work into a rich lather. Massage gently onto your face using circular motions, avoiding the eye contour. Rinse thoroughly and pat dry. Use once or twice daily. Follow up with your favorite toner and moisturizer.`,
      ingredients: `KEY INGREDIENTS:
- Mandelic Acid: Gentle AHA that refines texture and brightens.
- Retinol (Vitamin A): Promotes collagen synthesis and skin cell regeneration.
- Panthenol & Niacinamide: Repair skin barrier, soothe inflammation, and maintain hydration.

COMPLETE INGREDIENTS:
AQUA, SODIUM LAURETH SULFATE, COCAMIDOPROPYL BETAINE, COCAMIDE DEA, MANDELIC ACID, RETINOL LIPOSOMES, NIACINAMIDE, PANTHENOL, GLYCERIN, TOCOPHERYL ACETATE, ALOE BARBADENSIS EXTRACT, SODIUM CHLORIDE, CITRIC ACID, DMDM HYDANTOIN, PHENOXYETHANOL.`
    }
  },
  'spectra-block-spf60-sunblock': {
    reviewsCount: 31,
    rating: 5,
    tagLine: 'Advanced broad spectrum protection SPF 60 for daily sun defense. ☀️',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Advanced broad spectrum protection SPF 60 for daily sun defense. ☀️ Guards against UVA/UVB rays to prevent tanning, dark spots, and premature aging.`,
      benefits: [
        { title: 'Broad Spectrum SPF 60', desc: 'Guards against sunburns, skin cancers, and premature aging from UV rays.' },
        { title: 'Prevents Tanning', desc: 'Creates a protective shield that prevents UV-induced skin darkening.' },
        { title: 'Non-Greasy Finish', desc: 'Oil-free formula that controls shine and leaves a comfortable, matte feel.' },
        { title: 'Antioxidant Protection', desc: 'Fights free radical damage to maintain youthful, healthy skin.' }
      ],
      about: `Spectra Block SPF 60 Broad Spectrum Sunblock is your everyday defence against sun damage. Engineered for Pakistani climate conditions, it provides reliable protection against UVA and UVB radiation.

The lightweight formula absorbs quickly without leaving a white cast or greasy residue. Suitable for daily use under makeup.

Regular use prevents tan, dark spots, and premature aging while keeping skin healthy and hydrated.`,
      howToUse: `Apply generously to your face and neck 15-20 minutes before sun exposure.

Massage gently until evenly blended. Reapply every 2 hours if you are outdoors, sweating, or swimming. Use as the last step in your morning skincare routine before makeup.`,
      ingredients: `KEY INGREDIENTS:
- Zinc Oxide & Titanium Dioxide: Physical blockers that reflect solar radiation.
- Niacinamide: Calms redness, controls sebum, and brightens.
- Vitamin E: Provides heavy antioxidant power to fight skin damage.

COMPLETE INGREDIENTS:
AQUA, ZINC OXIDE, TITANIUM DIOXIDE, CAPRYLIC/CAPRIC TRIGLYCERIDE, NIACINAMIDE, GLYCERIN, TOCOPHERYL ACETATE, PHENOXYETHANOL.`
    }
  },
  'spectra-block-mega-block-3in1-spf100': {
    reviewsCount: 24,
    rating: 5,
    tagLine: 'Ultra-high SPF 100 triple protection formula for intense sun shielding. ☀️',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Ultra-high SPF 100 triple protection formula for intense sun shielding. ☀️ The 3-in-1 formula moisturizes, brightens, and protects in a single step.`,
      benefits: [
        { title: 'Ultra SPF 100 Protection', desc: 'Maximum sun protection for outdoor activities and intense sun exposure.' },
        { title: '3-in-1 Formula', desc: 'Moisturizes, brightens, and shields skin all in one easy step.' },
        { title: 'Prevents Hyperpigmentation', desc: 'Prevents melanin overproduction caused by UV exposure and sun damage.' },
        { title: 'Sweat & Water Resistant', desc: 'Stays effective even in humid conditions and light sweating.' }
      ],
      about: `Spectra Block Mega Block 3-in-1 SPF 100 is our most powerful sun protection formula. Designed for those who spend significant time outdoors, it provides maximum UV filtration at the highest SPF rating.

The 3-in-1 action moisturizes dry skin, brightens dull complexions, and creates an impenetrable barrier against harmful solar radiation.

The cream texture blends seamlessly into all skin tones and provides long-lasting protection without frequent reapplication.`,
      howToUse: `Apply a generous, even layer to all exposed areas of skin, including face, neck, and hands.

Apply 20-30 minutes before going outdoors. Reapply after swimming, sweating, or every 3 hours during prolonged sun exposure. Use daily for best results.`,
      ingredients: `KEY INGREDIENTS:
- High SPF UV Filters (SPF 100): Maximum UVA/UVB radiation blocking complex.
- Hyaluronic Acid: Deep hydration and moisture retention.
- Skin Brightening Complex: Evens skin tone and prevents UV-induced dark spots.

COMPLETE INGREDIENTS:
AQUA, OCTOCRYLENE, BUTYL METHOXYDIBENZOYLMETHANE, ETHYLHEXYL SALICYLATE, TITANIUM DIOXIDE, ZINC OXIDE, HYALURONIC ACID, NIACINAMIDE, GLYCERIN, TOCOPHERYL ACETATE, PHENOXYETHANOL.`
    }
  }
}

// Generate high-quality fallback details for admin-added products
function generateFallbackDetails(product) {
  return {
    reviewsCount: Math.floor(Math.random() * 20) + 10,
    rating: 5,
    tagLine: product.description
      ? product.description
      : `Premium skincare formulated for ${product.category} concerns. Experience professional results at home.`,
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: product.description
        ? product.description
        : `${product.name} is a premium skincare solution designed to address ${product.category} concerns. Formulated with active ingredients to deliver professional-grade results from the comfort of your home.`,
      benefits: [
        { title: 'Targeted Treatment', desc: `Specifically formulated to address ${product.category} concerns effectively.` },
        { title: 'Daily Safe Use', desc: 'Mild, balanced ingredients safe for everyday application.' },
        { title: 'Visible Results', desc: 'Clinically proven ingredients that deliver noticeable improvements with regular use.' },
        { title: 'Skin Health Boost', desc: 'Works in harmony with your skin\'s natural cycles to revitalize and restore health.' }
      ],
      about: `${product.name} is an advanced skincare product developed to target ${product.category} concerns with precision. Using a blend of active botanical and clinical ingredients, this formula is crafted to deliver visible improvements from the very first application.

The lightweight, skin-friendly texture absorbs quickly without leaving residue. It is free from harsh chemicals, making it suitable for sensitive skin types.

With consistent use, you will notice a significant improvement in your skin's texture, tone, and overall radiance.`,
      howToUse: `After cleansing your face, apply a small amount of the product to the targeted area.

Massage gently in upward circular motions until fully absorbed. For optimal results, use twice daily — morning and evening. Always follow up with sunscreen during the day.`,
      ingredients: `KEY INGREDIENTS:
- Active Skin Complex: Targets specific concerns related to ${product.category}.
- Hyaluronic Acid & Glycerin: Locks in essential moisture for plump, hydrated skin.
- Niacinamide: Multi-benefit ingredient that brightens, soothes, and reduces pores.

COMPLETE INGREDIENTS:
AQUA, GLYCERIN, NIACINAMIDE, PROPYLENE GLYCOL, HYALURONIC ACID, ALOE BARBADENSIS LEAF EXTRACT, PANTHENOL, ALLANTOIN, XANTHAN GUM, PHENOXYETHANOL.`
    }
  }
}

export default function ProductDetails({ productId, products, onBack }) {
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const { addToCart } = useCart()
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    // Scroll to top on mount/product change
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Priority 1: Search in the live products prop (includes admin-added products)
    let found = (products || []).find((p) => p.id === productId)

    // Priority 2: Search in static bundled fallback (original 7 products)
    if (!found) {
      found = STATIC_PRODUCTS.find((p) => p.id === productId)
    }

    if (found) {
      setProduct(found)
      setQty(1)
      setActiveTab('details')
    } else {
      // Invalid product ID → go back home
      onBack()
    }
  }, [productId, products, onBack])

  if (!product) return null

  // Fetch detailed content: prefer the pre-written map, fallback to generated details
  const details = PRODUCT_DETAILS_MAP[product.id] || generateFallbackDetails(product)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    setSuccessMsg(`✓ Added ${qty} × ${product.name} to cart!`)
    window.setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    const cartBtn = document.querySelector('.cart-icon')
    if (cartBtn) cartBtn.click()
  }

  const renderStars = () => (
    <div className="pd-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="pd-star">★</span>
      ))}
    </div>
  )

  const getProductTypeWord = () => {
    const name = product.name.toLowerCase()
    if (name.includes('wash') || name.includes('cleanser')) return 'Face Wash'
    if (name.includes('cream')) return 'Cream'
    if (name.includes('serum')) return 'Serum'
    if (name.includes('sunscreen') || name.includes('block') || name.includes('spf')) return 'Sunscreen'
    return 'Product'
  }

  return (
    <main className="product-details-page">
      <div className="container">
        {/* Back navigation link */}
        <button className="pd-back-btn" onClick={onBack}>
          ← Back to Homepage
        </button>

        <div className="pd-grid">
          {/* Left Column: Image Gallery */}
          <div className="pd-media-column">
            <div className="pd-thumbnails">
              <div className="pd-thumbnail active">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="pd-main-image-container">
              {product.badge && <span className="pd-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} className="pd-main-image" />
            </div>
          </div>

          {/* Right Column: Info & Buy */}
          <div className="pd-info-column">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating-row">
              {renderStars()}
              <span className="pd-reviews-count">{details.reviewsCount} Reviews</span>
            </div>

            <p className="pd-tagline">{details.tagLine}</p>

            {/* Claims Grid */}
            <div className="pd-claims-grid">
              {details.claims.map((claim, idx) => (
                <div key={idx} className="pd-claim-item">
                  <span className="pd-claim-icon">✔</span>
                  <span className="pd-claim-text">{claim}</span>
                </div>
              ))}
            </div>

            {/* Price and Actions */}
            <div className="pd-purchase-section">
              <div className="pd-price-row">
                <span className="pd-price-label">Price:</span>
                <span className="pd-price-value">{product.price}</span>
              </div>

              <div className="pd-actions-row">
                <div className="pd-qty-selector">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQty((q) => q + 1)}>+</button>
                </div>

                <button className="pd-add-to-cart-btn" onClick={handleAdd}>
                  Add To Cart — {product.price}
                </button>
              </div>

              <button className="pd-buy-now-btn" onClick={handleBuyNow}>
                Buy it now
              </button>

              {successMsg && <div className="pd-success-msg">{successMsg}</div>}
            </div>

            {/* Tabs Row */}
            <div className="pd-tabs-section">
              <div className="pd-tabs-row">
                <button
                  className={`pd-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                  onClick={() => setActiveTab('benefits')}
                >
                  Key Benefits
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  About {getProductTypeWord()}
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'howToUse' ? 'active' : ''}`}
                  onClick={() => setActiveTab('howToUse')}
                >
                  How to Use
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="pd-tab-content">
                {activeTab === 'details' && (
                  <div className="pd-tab-text">
                    <p>{details.tabs.details}</p>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="pd-benefits-list">
                    {Array.isArray(details.tabs.benefits) &&
                      details.tabs.benefits.map((benefit, idx) => (
                        <div key={idx} className="pd-benefit-item">
                          <strong className="pd-benefit-title">🌱 {benefit.title}:</strong>
                          <span className="pd-benefit-desc"> {benefit.desc}</span>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="pd-tab-text font-about-style">
                    {details.tabs.about.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {activeTab === 'howToUse' && (
                  <div className="pd-tab-text">
                    {details.tabs.howToUse.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="pd-tab-text pre-wrap-style">
                    {details.tabs.ingredients.split('\n\n').map((block, idx) => {
                      if (block.startsWith('KEY INGREDIENTS:') || block.startsWith('COMPLETE INGREDIENTS:')) {
                        const lines = block.split('\n')
                        return (
                          <div key={idx}>
                            <h3 className="pd-ingredients-header">{lines[0]}</h3>
                            {lines.slice(1).map((line, li) => (
                              <p key={li} style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink-soft)', margin: '4px 0' }}>
                                {line}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return (
                        <p key={idx} style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink-soft)' }}>
                          {block}
                        </p>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import '../css/ProductDetails.css'
import img11 from '../../assets/11.jpeg'
import img12 from '../../assets/12.jpeg'
import img13 from '../../assets/13.jpeg'
import img14 from '../../assets/14.jpeg'

const STATIC_FALLBACK_PRODUCTS = [
  {
    id: 'tea-tree-face-wash',
    category: 'ACNE & BREAKOUTS',
    badge: 'TRENDING NOW 🔥',
    image: img11,
    name: 'Tea Tree & Salicylic Acid Face Wash',
    price: 'Rs.1,099',
    priceValue: 1099,
  },
  {
    id: 'tinted-sunscreen-spf60',
    category: 'HYPERPIGMENTATION',
    badge: 'TOP RATED 🌍',
    image: img12,
    name: 'Tinted Sunscreen SPF 60',
    price: 'Rs.1,599',
    priceValue: 1599,
  },
  {
    id: 'anti-acne-serum',
    category: 'DRY & DEHYDRATED SKIN',
    badge: null,
    image: img13,
    name: 'Anti-Acne Face Serum (Clear Skin)',
    price: 'Rs.2,099',
    priceValue: 2099,
  },
  {
    id: 'vitamin-c-serum',
    category: 'KOREAN GLASS SKIN',
    badge: 'KOREAN GLOW 💗',
    image: img14,
    name: 'Vitamin C Face Serum (Glow)',
    price: 'Rs.2,099',
    priceValue: 2099,
  },
]

const PRODUCT_DETAILS_MAP = {
  'tea-tree-face-wash': {
    reviewsCount: 17,
    rating: 5,
    tagLine: "Trusted by Pakistan's first selling face wash since 2021, with numerous glowing reviews on TikTok/Insta. 🔥",
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Trusted by Pakistan's first selling face wash since 2021, with numerous glowing reviews on TikTok/Insta. 😊`,
      benefits: [
        { title: 'Clears Acne & Pimples', desc: 'Helps to control acne and prevent future breakouts.' },
        { title: 'Controls Oiliness', desc: 'Regulates excessive oil production, reducing shine and greasiness.' },
        { title: 'Blemish Control', desc: 'Minimizes the appearance of blemishes and hyperpigmentation.' },
        { title: 'Unclogs Pores', desc: 'Removes whiteheads, blackheads, and other impurities from pores.' }
      ],
      about: `A well-suited face wash for acne-prone skin helps you fight excess sebum while maintaining natural oil levels. It proficiently unclogs pores and visibly minimizes your skin fading acne scars and giving you a healthy glow and professional skin care.

Besides, the salicylic acid's rigorous action breaks the bond of dead skin cells, exfoliating your pores and preventing acne breakout.

The anti-inflammatory ingredients like tea tree oil are rich to fight off host bacteria and skin irritation. Niacinamide stimulates cell growth and improves elasticity giving you a wrinkle-free and radiant look altogether. Lavender significantly decreases hyperpigmentation without drying your skin and promoting brighter and glowing skin.`,
      howToUse: `For Better results use foam with this face wash.

Damp your face and neck, apply a small amount while massaging in circular motions, rinse well and pat dry. You can use Revival Naturals oil-free cream after washing your face at night.`,
      ingredients: `KEY INGREDIENTS:
- 2% Salicylic Acid: Helps clear clogged pores, which can lead to breakouts.
- Tea Tree Oil: The essential ingredient to control bacteria that cause acne.
- Witch Hazel: Soothes skin irritation, reduces inflammation, and tightens pores.

COMPLETE INGREDIENTS:
AQUA/WATER/EAU, COCAMIDOPROPYL BETAINE, COCAMIDE DEA, NIACINAMIDE, SALICYLIC ACID, TEA TREE EXTRACT, WITCH HAZEL EXTRACT, LAVENDER OIL, EXTRACTION OF ALOE VERA, PANTHENOL, GLYCERIN, DMDM HYDANTOIN, DISODIUM EDTA, COLORING (CI 19140 & CI 42090).`
    }
  },
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

Dispense a coin-sized amount of facewery and work into a rich lather. Massage gently onto your face using circular motions, avoiding the eye contour. Rinse thoroughly and pat dry. Use once or twice daily. Follow up with your favorite toner and moisturizer.`,
      ingredients: `KEY INGREDIENTS:
- Mandelic Acid: Gentle AHA that refines texture and brightens.
- Retinol (Vitamin A): Promotes collagen synthesis and skin cell regeneration.
- Panthenol & Niacinamide: Repair skin barrier, soothe inflammation, and maintain hydration.

COMPLETE INGREDIENTS:
AQUA, SODIUM LAURETH SULFATE, COCAMIDOPROPYL BETAINE, COCAMIDE DEA, MANDELIC ACID, RETINOL LIPOSOMES, NIACINAMIDE, PANTHENOL, GLYCERIN, TOCOPHERYL ACETATE, ALOE BARBADENSIS EXTRACT, SODIUM CHLORIDE, CITRIC ACID, DMDM HYDANTOIN, PHENOXYETHANOL.`
    }
  },
  'tinted-sunscreen-spf60': {
    reviewsCount: 31,
    rating: 5,
    tagLine: 'Advanced hybrid protection with lightweight skin-tint for an instant airbrushed glow. 🌍',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Advanced hybrid protection with lightweight skin-tint for an instant airbrushed glow. 🌍 Broad-spectrum SPF 60 filters out UVA/UVB rays.`,
      benefits: [
        { title: 'Broad Spectrum SPF 60', desc: 'Guards against sunburns, skin cancers, and premature aging.' },
        { title: 'Lightweight Tint', desc: 'Blends seamlessly to blur skin imperfections and even out tone.' },
        { title: 'Non-Greasy Finish', desc: 'Oil-free formula that controls shine and leaves a velvety matte feel.' },
        { title: 'Shields Skin Barrier', desc: 'Provides moisture locks and environmental shield.' }
      ],
      about: `Our Tinted Sunscreen SPF 60 acts as a protective shield and a perfecting BB cream in one. Designed for everyday defense, it provides broad-spectrum block against ultraviolet radiation, preventing cellular damage, age spots, and fine lines.

The intelligent pigment adapts to your skin shade, blurring pores, blemishes, and minor scars without heavy makeup look.

The non-comedogenic base hydrates and calms skin, absorbing oil and leaving a flawless matte finish.`,
      howToUse: `Apply generously to your face and neck 15-20 minutes before sun exposure.

Massage gently until evenly blended. Reapply every 2 hours if you are outdoors, sweating, or swimming.`,
      ingredients: `KEY INGREDIENTS:
- Zinc Oxide & Titanium Dioxide: Physical blockers that reflect solar radiation.
- Niacinamide: Calms redness, controls sebum, and brightens.
- Vitamin E: Provides heavy antioxidant power to fight skin damage.

COMPLETE INGREDIENTS:
AQUA, ZINC OXIDE, TITANIUM DIOXIDE, CAPRYLIC/CAPRIC TRIGLYCERIDE, NIACINAMIDE, GLYCERIN, TOCOPHERYL ACETATE, IRON OXIDES (CI 77491, CI 77492, CI 77499), PHENOXYETHANOL.`
    }
  },
  'anti-acne-serum': {
    reviewsCount: 22,
    rating: 5,
    tagLine: 'Clears active breakouts, controls sebum production, and calms irritated skin. 🌿',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Clears active breakouts, controls sebum production, and calms irritated skin. 🌿 Formulated with Salicylic Acid and Niacinamide.`,
      benefits: [
        { title: 'Controls Breakouts', desc: 'Quickly reduces acne bumps, swelling, and redness.' },
        { title: 'Fades Acne Marks', desc: 'Accelerates healing of dark spots and hyperpigmentation.' },
        { title: 'Refines Pores', desc: 'Clears cellular waste from pore walls to tighten skin.' },
        { title: 'Balances Sebum', desc: 'Regulates oil output, preventing future blockages.' }
      ],
      about: `This high-performance Anti-Acne Face Serum is a targeted treatment designed for acne-prone skin. It combines gentle chemical exfoliation with skin barrier nourishment to treat breakouts without causing skin dryness.

Salicylic Acid penetrates deep inside pores to dissolve sebum and dead cells, preventing blackheads and pimples.

Niacinamide acts as a calming agent, minimizing skin inflammation and fading acne scars. Combined with hydrating Hyaluronic Acid, it maintains skin health.`,
      howToUse: `Apply 3 to 4 drops onto your clean, dry face in the morning and evening.

Massage gently until absorbed. Follow up with moisturizer. Always use sun protection during the day.`,
      ingredients: `KEY INGREDIENTS:
- 2% Salicylic Acid (BHA): Clears pore blockage and targets acne.
- 5% Niacinamide: Brightens skin, fades acne scars, and controls oil.
- Hyaluronic Acid: Restores cellular hydration.

COMPLETE INGREDIENTS:
AQUA, NIACINAMIDE, PROPYLENE GLYCOL, SALICYLIC ACID, HYALURONIC ACID, ALOE LEAF EXTRACT, ALLANTOIN, XANTHAN GUM, PHENOXYETHANOL.`
    }
  },
  'vitamin-c-serum': {
    reviewsCount: 38,
    rating: 5,
    tagLine: 'Supercharge skin brightness, fade age spots, and stimulate collagen for bouncy, glowing skin. 💗',
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Supercharge skin brightness, fade age spots, and stimulate collagen for bouncy, glowing skin. 💗 15% Vitamin C complex.`,
      benefits: [
        { title: 'Supercharged Radiance', desc: 'Transforms dull and tired skin into a luminous glass-like glow.' },
        { title: 'Collagen Booster', desc: 'Speeds up cellular repair, smoothing fine lines and wrinkles.' },
        { title: 'Fades Sun Patches', desc: 'Reduces sun spots, age spots, and hyperpigmentation.' },
        { title: 'Fights Skin Aging', desc: 'Heavy antioxidant shielding from solar damage and pollution.' }
      ],
      about: `Our Vitamin C Face Serum is a premium glowing serum containing 15% active Vitamin C. It acts as a powerful antioxidant skin defense system, restoring a youthful, luminous glass skin finish.

By neutralizing free radicals and increasing collagen synthesis, it irons out fine lines and firms up lax contours.

Licorice root and Ferulic Acid boost the brightening effect, making this serum a powerhouse to solve hyperpigmentation.`,
      howToUse: `After cleansing, apply 3-4 drops onto your face.

Pat gently until absorbed. Follow up with moisturizer. For maximum efficacy, use in the morning followed by sunscreen.`,
      ingredients: `KEY INGREDIENTS:
- 15% Vitamin C (L-Ascorbic Acid): Highly potent brightening agent and collagen booster.
- Ferulic Acid: Stabilizes Vitamin C and doubles its antioxidant power.
- Licorice Root Extract: Fades hyperpigmentation and calms skin.

COMPLETE INGREDIENTS:
AQUA, L-ASCORBIC ACID, NIACINAMIDE, FERULIC ACID, GLYCERIN, HYALURONIC ACID, LICORICE ROOT EXTRACT, PANTHENOL, PHENOXYETHANOL.`
    }
  }
}

export default function ProductDetails({ productId, products, onBack }) {
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const { addToCart, cart } = useCart()
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    // Scroll to top on mount/product change
    window.scrollTo({ top: 0, behavior: 'instant' })

    let found = products.find((p) => p.id === productId)
    if (!found) {
      found = STATIC_FALLBACK_PRODUCTS.find((p) => p.id === productId)
    }

    if (found) {
      setProduct(found)
    } else {
      // Direct fallback to home if invalid ID
      onBack()
    }
  }, [productId, products, onBack])

  if (!product) return null

  // Fetch product detailed details or generate high-quality fallback details
  const details = PRODUCT_DETAILS_MAP[product.id] || {
    reviewsCount: 15,
    rating: 5,
    tagLine: `Premium skincare specifically formulated to address concerns. Category: ${product.category}.`,
    claims: [
      'Dermatologically Tested',
      'Suitable For All Skin Types',
      'Paraben & Sulphate Free',
      'Made With Natural Ingredients',
      'Clinically Proven Ingredients',
      'Cruelty Free'
    ],
    tabs: {
      details: `Formulated to support healthy skin. Provides key nutrients to targeted areas. Category: ${product.category}. Price: ${product.price}.`,
      benefits: [
        { title: 'High Performance Care', desc: `Specifically targeted for concerns related to ${product.category}.` },
        { title: 'Daily Comfort', desc: 'Mild ingredients safe for daily applications.' },
        { title: 'Skin Health Boost', desc: 'Works with the natural skin cycles to revitalize health.' }
      ],
      about: `Our high-performance ${product.name} is a state-of-the-art solution designed to target concerns within the ${product.category} category. Containing active elements, it cleanses, hydrates, and locks in nutrition to provide professional grade results at home.`,
      howToUse: `After washing, apply a small quantity to target areas of the face and neck. Massage in upward motions until fully absorbed. Use twice daily.`,
      ingredients: `KEY INGREDIENTS:
- Active Skin Complex: Targets specific concerns of ${product.category}.
- Hyaluronic Acid & Glycerin: Locks in essential moisture.

COMPLETE INGREDIENTS:
AQUA, GLYCERIN, NIACINAMIDE, PROPYLENE GLYCOL, ALOE BARBADENSIS EXTRACT, ALLANTOIN, PHENOXYETHANOL.`
    }
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    setSuccessMsg(`✓ Added ${qty} x ${product.name} to cart!`)
    window.setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    // Set hash to cart or open cart drawer via clicking cart icon or triggering it
    // The drawer opens when App cartOpen is true. In App, we can trigger click on the header's cart icon:
    const cartBtn = document.querySelector('.cart-icon')
    if (cartBtn) {
      cartBtn.click()
    }
  }

  const renderStars = () => {
    return (
      <div className="pd-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="pd-star">★</span>
        ))}
      </div>
    )
  }

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
                        return <h3 key={idx} className="pd-ingredients-header">{block.split('\n')[0]}</h3>
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

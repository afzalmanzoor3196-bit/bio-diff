import product1 from '../assets/Product 1.jpeg'
import product2 from '../assets/Product 2.jpeg'
import product3 from '../assets/Product 3.jpeg'
import product4 from '../assets/Product 4.jpeg'
import product5 from '../assets/Product 5.jpeg'
import product6 from '../assets/Product 6.jpeg'
import product7 from '../assets/Product 7.jpeg'

// Map from product ID → always-fresh imported image asset
// This is used to fix images after loading from localStorage,
// because Vite changes hashed filenames on each build/deploy.
export const PRODUCT_IMAGE_MAP = {
  'biodiff-glutathione-vitamin-c-intensive-skin-brightening-cream': product1,
  'biodiff-glutathione-vit-c-intensive-skin-brightening-cream-(3in1)': product2,
  'biodiff-glutathion-brightening-facewash': product3,
  'mandelic-acid-pro-(exfoliating-cream-&-spotless-treatment-set)': product4,
  'biodiff-mandelac-retinol-10%-facewash-(exfoliates-&-smoothes)': product5,
  'spectra-block-spf60-sunblock': product6,
  'spectra-block-mega-block-3in1-spf100': product7,
}

const initialProducts = [
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

export default initialProducts

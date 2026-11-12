import { loremParagraphs, LOREM_SHORT } from './lorem'
import type { AquaProduct, Division, Product, ProductFaq, Review, SolarProduct } from './types'

/* ------------------------------------------------------------------ */
/* Deterministic helpers (same output on server and client)            */
/* ------------------------------------------------------------------ */

const REVIEWERS = [
  ['Ananya R.', 'Bengaluru'],
  ['Rahul M.', 'Pune'],
  ['Priya S.', 'Chennai'],
  ['Vikram K.', 'Hyderabad'],
  ['Meera J.', 'Jaipur'],
  ['Arjun P.', 'Kochi'],
  ['Sneha D.', 'Ahmedabad'],
  ['Karthik N.', 'Coimbatore'],
] as const

const REVIEW_TITLES = [
  'Lorem ipsum, works well',
  'Dolor sit amet, easy install',
  'Consectetur, good value',
  'Adipiscing elit, recommended',
  'Sed do eiusmod, decent',
]

const REVIEW_RATINGS = [5, 4, 5, 3, 4]

const makeReviews = (seed: number, count: number): Review[] =>
  Array.from({ length: count }, (_, i) => {
    const [author, city] = REVIEWERS[(seed + i) % REVIEWERS.length]
    return {
      id: `r-${seed}-${i}`,
      author,
      city,
      rating: REVIEW_RATINGS[(seed + i) % REVIEW_RATINGS.length],
      title: REVIEW_TITLES[(seed + i) % REVIEW_TITLES.length],
      body: LOREM_SHORT + ' Ut enim ad minim veniam, quis nostrud exercitation.',
      date: `2026-${String(((seed + i) % 9) + 1).padStart(2, '0')}-${String(((seed * 3 + i) % 27) + 1).padStart(2, '0')}`,
      verified: (seed + i) % 3 !== 0,
    }
  })

const aquaFaqs: ProductFaq[] = [
  { question: 'How often should I replace the cartridge?', answer: LOREM_SHORT },
  { question: 'Can I install it myself?', answer: LOREM_SHORT },
  { question: 'Does it remove chlorine and hardness?', answer: LOREM_SHORT },
]

const solarFaqs: ProductFaq[] = [
  { question: 'Is a site survey required?', answer: LOREM_SHORT },
  { question: 'How long does installation take?', answer: LOREM_SHORT },
  { question: 'Am I eligible for a government subsidy?', answer: LOREM_SHORT },
]

/* ------------------------------------------------------------------ */
/* Aqua (12)                                                           */
/* ------------------------------------------------------------------ */

const aqua: AquaProduct[] = [
  {
    id: 'a1', slug: 'ez-soft-pro-whole-house-softener', name: 'EZ Soft Pro Whole-House Softener', division: 'aqua',
    category: 'water-softeners', price: 24999, mrp: 32999, rating: 4.6, reviewCount: 128, stock: 8, badge: 'Bestseller',
    shortDescription: 'Lorem ipsum automatic softener for 3–4 bathroom homes.', description: loremParagraphs(3),
    featuredRank: 1, addedOn: '2026-03-14',
    specs: { stages: 'Ion exchange + carbon', filterLife: '5–7 years (resin)', connectionSize: '1 inch', warranty: '2 years' },
    faqs: aquaFaqs, reviews: makeReviews(1, 5),
  },
  {
    id: 'a2', slug: 'ez-soft-compact-softener', name: 'EZ Soft Compact Softener', division: 'aqua',
    category: 'water-softeners', price: 15999, mrp: 19999, rating: 4.4, reviewCount: 64, stock: 12, badge: 'New',
    shortDescription: 'Lorem ipsum compact softener for apartments.', description: loremParagraphs(3),
    featuredRank: 6, addedOn: '2026-09-02',
    specs: { stages: 'Ion exchange', filterLife: '4–5 years (resin)', connectionSize: '3/4 inch', warranty: '2 years' },
    faqs: aquaFaqs, reviews: makeReviews(2, 4),
  },
  {
    id: 'a3', slug: 'tank-guard-1000', name: 'Tank Guard 1000 Tank Filter', division: 'aqua',
    category: 'tank-filters', price: 6499, mrp: 8499, rating: 4.3, reviewCount: 41, stock: 15,
    shortDescription: 'Lorem ipsum sediment filter for tanks up to 1,000 L.', description: loremParagraphs(3),
    featuredRank: 7, addedOn: '2026-01-20',
    specs: { stages: '3-stage sediment', filterLife: '12 months', connectionSize: '1 inch', warranty: '1 year' },
    faqs: aquaFaqs, reviews: makeReviews(3, 3),
  },
  {
    id: 'a4', slug: 'tank-guard-2000', name: 'Tank Guard 2000 Tank Filter', division: 'aqua',
    category: 'tank-filters', price: 9999, mrp: 12999, rating: 4.5, reviewCount: 22, stock: 0,
    shortDescription: 'Lorem ipsum high-flow filter for tanks up to 2,000 L.', description: loremParagraphs(3),
    featuredRank: 10, addedOn: '2026-06-11',
    specs: { stages: '4-stage sediment + carbon', filterLife: '12 months', connectionSize: '1.25 inch', warranty: '1 year' },
    faqs: aquaFaqs, reviews: makeReviews(4, 3),
  },
  {
    id: 'a5', slug: 'shower-pure-15', name: 'ShowerPure 15-Stage Shower Filter', division: 'aqua',
    category: 'shower-filters', price: 1499, mrp: 2499, rating: 4.7, reviewCount: 512, stock: 120, badge: 'Bestseller',
    shortDescription: 'Lorem ipsum for softer hair and skin in hard-water areas.', description: loremParagraphs(3),
    featuredRank: 2, addedOn: '2025-11-05',
    variants: [{ name: 'Finish', options: ['Chrome', 'Black'] }],
    specs: { stages: '15-stage', filterLife: '3–4 months', connectionSize: '1/2 inch', warranty: '6 months' },
    faqs: aquaFaqs, reviews: makeReviews(5, 5),
  },
  {
    id: 'a6', slug: 'shower-pure-max', name: 'ShowerPure Max Shower Filter', division: 'aqua',
    category: 'shower-filters', price: 2299, mrp: 3499, rating: 4.5, reviewCount: 187, stock: 3,
    shortDescription: 'Lorem ipsum high-capacity filter with vitamin C stage.', description: loremParagraphs(3),
    featuredRank: 4, addedOn: '2026-07-19',
    variants: [{ name: 'Finish', options: ['Chrome', 'Black', 'Gold'] }],
    specs: { stages: '20-stage + vitamin C', filterLife: '4–6 months', connectionSize: '1/2 inch', warranty: '1 year' },
    faqs: aquaFaqs, reviews: makeReviews(6, 4),
  },
  {
    id: 'a7', slug: 'tap-pure-mini', name: 'TapPure Mini Tap Filter', division: 'aqua',
    category: 'tap-filters', price: 899, mrp: 1299, rating: 4.2, reviewCount: 233, stock: 60,
    shortDescription: 'Lorem ipsum clip-on filter for kitchen taps.', description: loremParagraphs(3),
    featuredRank: 8, addedOn: '2026-02-08',
    variants: [{ name: 'Finish', options: ['Chrome', 'White'] }],
    specs: { stages: '5-stage', filterLife: '2–3 months', connectionSize: 'Universal', warranty: '6 months' },
    faqs: aquaFaqs, reviews: makeReviews(7, 3),
  },
  {
    id: 'a8', slug: 'wash-guard-washing-machine-filter', name: 'WashGuard Washing Machine Filter', division: 'aqua',
    category: 'appliance-filters', price: 1799, mrp: 2499, rating: 4.4, reviewCount: 96, stock: 40, badge: 'Combo',
    shortDescription: 'Lorem ipsum protects drums and heaters from scaling.', description: loremParagraphs(3),
    featuredRank: 5, addedOn: '2026-05-23',
    specs: { stages: 'Polyphosphate + sediment', filterLife: '6 months', connectionSize: '3/4 inch', warranty: '1 year' },
    faqs: aquaFaqs, reviews: makeReviews(8, 4),
  },
  {
    id: 'a9', slug: 'geyser-guard', name: 'GeyserGuard Anti-Scale Filter', division: 'aqua',
    category: 'appliance-filters', price: 1999, mrp: 2799, rating: 4.1, reviewCount: 38, stock: 0,
    shortDescription: 'Lorem ipsum anti-scale protection for geysers.', description: loremParagraphs(3),
    featuredRank: 11, addedOn: '2026-04-02',
    specs: { stages: 'Polyphosphate', filterLife: '6 months', connectionSize: '1/2 inch', warranty: '1 year' },
    faqs: aquaFaqs, reviews: makeReviews(9, 3),
  },
  {
    id: 'a10', slug: 'shower-pure-cartridge-2-pack', name: 'ShowerPure Cartridge (Pack of 2)', division: 'aqua',
    category: 'replacement-cartridges', price: 799, mrp: 1199, rating: 4.6, reviewCount: 301, stock: 200, badge: 'Combo',
    shortDescription: 'Lorem ipsum refill for ShowerPure 15 and Max.', description: loremParagraphs(2),
    featuredRank: 3, addedOn: '2025-12-15',
    specs: { stages: '15-stage refill', filterLife: '3–4 months each', connectionSize: 'Drop-in', warranty: '—' },
    faqs: aquaFaqs, reviews: makeReviews(10, 5),
  },
  {
    id: 'a11', slug: 'tds-hardness-tester', name: 'TDS & Hardness Tester Kit', division: 'aqua',
    category: 'water-testers', price: 699, mrp: 999, rating: 4.3, reviewCount: 75, stock: 80, badge: 'New',
    shortDescription: 'Lorem ipsum check your water in under a minute.', description: loremParagraphs(2),
    featuredRank: 9, addedOn: '2026-10-01',
    specs: { stages: '—', filterLife: '—', connectionSize: '—', warranty: '6 months' },
    faqs: aquaFaqs, reviews: makeReviews(11, 3),
  },
  {
    id: 'a12', slug: 'shower-arm-adapter-kit', name: 'Shower Arm Adapter Kit', division: 'aqua',
    category: 'accessories', price: 349, mrp: 499, rating: 4.0, reviewCount: 19, stock: 150,
    shortDescription: 'Lorem ipsum adapters for non-standard shower arms.', description: loremParagraphs(2),
    featuredRank: 12, addedOn: '2026-08-12',
    specs: { stages: '—', filterLife: '—', connectionSize: '1/2 & 3/4 inch', warranty: '—' },
    faqs: aquaFaqs, reviews: makeReviews(12, 3),
  },
]

/* ------------------------------------------------------------------ */
/* Solar (8)                                                           */
/* ------------------------------------------------------------------ */

const kitIncluded = (kw: number, panels: number, battery = false): string[] => [
  `${panels} × 540 Wp mono PERC panels`,
  `${kw} kW ${battery ? 'hybrid' : 'on-grid'} inverter`,
  ...(battery ? ['Lithium battery bank'] : []),
  'Mounting structure, DC/AC cables and earthing',
  'Net-metering paperwork support',
  'Installation and commissioning',
]

const solar: SolarProduct[] = [
  {
    id: 's1', slug: 'home-on-grid-3kw-kit', name: '3 kW Home On-Grid Solar Kit', division: 'solar',
    category: 'residential-on-grid-kits', price: 179999, mrp: 210000, rating: 4.7, reviewCount: 54, stock: 10, badge: 'Bestseller',
    shortDescription: 'Lorem ipsum for homes with ₹2,500–₹4,000 monthly bills.', description: loremParagraphs(3),
    featuredRank: 1, addedOn: '2026-02-10',
    capacityKw: 3, panelCount: 6, panelWp: 540, phase: 1, pricePerWp: 60, warrantyYears: 25,
    inverterBrand: 'Lorem Inverters', includesInstallation: true, requiresSurvey: true,
    whatsIncluded: kitIncluded(3, 6), faqs: solarFaqs, reviews: makeReviews(13, 4),
  },
  {
    id: 's2', slug: 'home-on-grid-5kw-kit', name: '5 kW Home On-Grid Solar Kit', division: 'solar',
    category: 'residential-on-grid-kits', price: 279999, mrp: 325000, rating: 4.6, reviewCount: 31, stock: 10,
    shortDescription: 'Lorem ipsum for larger homes with ₹4,000–₹7,000 bills.', description: loremParagraphs(3),
    featuredRank: 2, addedOn: '2026-04-18',
    capacityKw: 5, panelCount: 10, panelWp: 540, phase: 1, pricePerWp: 56, warrantyYears: 25,
    inverterBrand: 'Lorem Inverters', includesInstallation: true, requiresSurvey: true,
    whatsIncluded: kitIncluded(5, 10), faqs: solarFaqs, reviews: makeReviews(14, 3),
  },
  {
    id: 's3', slug: 'hybrid-3kw-battery-kit', name: '3 kW Hybrid Kit with Battery', division: 'solar',
    category: 'hybrid-kits', price: 249999, mrp: 290000, rating: 4.5, reviewCount: 18, stock: 6, badge: 'New',
    shortDescription: 'Lorem ipsum with backup during power cuts.', description: loremParagraphs(3),
    featuredRank: 3, addedOn: '2026-09-25',
    capacityKw: 3, panelCount: 6, panelWp: 540, phase: 1, pricePerWp: 83, warrantyYears: 25,
    inverterBrand: 'Dolor Hybrid', includesInstallation: true, requiresSurvey: true,
    whatsIncluded: kitIncluded(3, 6, true), faqs: solarFaqs, reviews: makeReviews(15, 3),
  },
  {
    id: 's4', slug: 'hybrid-5kw-battery-kit', name: '5 kW Hybrid Kit with Battery', division: 'solar',
    category: 'hybrid-kits', price: 379999, mrp: 440000, rating: 4.4, reviewCount: 9, stock: 4,
    shortDescription: 'Lorem ipsum three-phase hybrid for bigger homes.', description: loremParagraphs(3),
    featuredRank: 5, addedOn: '2026-06-30',
    capacityKw: 5, panelCount: 10, panelWp: 540, phase: 3, pricePerWp: 76, warrantyYears: 25,
    inverterBrand: 'Dolor Hybrid', includesInstallation: true, requiresSurvey: true,
    whatsIncluded: kitIncluded(5, 10, true), faqs: solarFaqs, reviews: makeReviews(16, 3),
  },
  {
    id: 's5', slug: 'commercial-10kw-kit', name: '10 kW Commercial Solar Kit', division: 'solar',
    category: 'commercial-kits', price: 519999, mrp: 610000, rating: 4.6, reviewCount: 12, stock: 5,
    shortDescription: 'Lorem ipsum for shops, clinics and small offices.', description: loremParagraphs(3),
    featuredRank: 4, addedOn: '2026-05-05',
    capacityKw: 10, panelCount: 19, panelWp: 540, phase: 3, pricePerWp: 52, warrantyYears: 25,
    inverterBrand: 'Lorem Inverters', includesInstallation: true, requiresSurvey: true,
    whatsIncluded: kitIncluded(10, 19), faqs: solarFaqs, reviews: makeReviews(17, 3),
  },
  {
    id: 's6', slug: 'on-grid-inverter-5kw', name: '5 kW On-Grid Inverter', division: 'solar',
    category: 'inverters', price: 54999, mrp: 64999, rating: 4.3, reviewCount: 27, stock: 0,
    shortDescription: 'Lorem ipsum single-phase string inverter with Wi-Fi.', description: loremParagraphs(2),
    featuredRank: 7, addedOn: '2026-03-03',
    capacityKw: 5, panelCount: 0, panelWp: 0, phase: 1, pricePerWp: 11, warrantyYears: 8,
    inverterBrand: 'Lorem Inverters', includesInstallation: false, requiresSurvey: false,
    whatsIncluded: ['5 kW on-grid inverter', 'Wi-Fi monitoring dongle', 'Mounting bracket'],
    faqs: solarFaqs, reviews: makeReviews(18, 3),
  },
  {
    id: 's7', slug: 'mono-perc-panel-540wp', name: '540 Wp Mono PERC Solar Panel', division: 'solar',
    category: 'panels', price: 14999, mrp: 17999, rating: 4.5, reviewCount: 66, stock: 200,
    shortDescription: 'Lorem ipsum high-efficiency half-cut panel.', description: loremParagraphs(2),
    featuredRank: 6, addedOn: '2026-01-12',
    capacityKw: 0.54, panelCount: 1, panelWp: 540, phase: 1, pricePerWp: 28, warrantyYears: 25,
    inverterBrand: '—', includesInstallation: false, requiresSurvey: false,
    whatsIncluded: ['1 × 540 Wp panel', 'MC4 connectors'], faqs: solarFaqs, reviews: makeReviews(19, 4),
  },
  {
    id: 's8', slug: 'rooftop-mounting-kit-3kw', name: 'Rooftop Mounting Structure (3 kW)', division: 'solar',
    category: 'solar-accessories', price: 18999, mrp: 22999, rating: 4.2, reviewCount: 14, stock: 25,
    shortDescription: 'Lorem ipsum galvanised structure for RCC roofs.', description: loremParagraphs(2),
    featuredRank: 8, addedOn: '2026-08-20',
    capacityKw: 3, panelCount: 0, panelWp: 0, phase: 1, pricePerWp: 6, warrantyYears: 10,
    inverterBrand: '—', includesInstallation: false, requiresSurvey: false,
    whatsIncluded: ['Galvanised rails and legs', 'Anchor fasteners', 'Earthing kit'],
    faqs: solarFaqs, reviews: makeReviews(20, 3),
  },
]

export const products: Product[] = [...aqua, ...solar]

export const aquaProducts = aqua
export const solarProducts = solar

export const getProduct = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug)

export const getProductsByDivision = (division: Division): Product[] =>
  products.filter((product) => product.division === division)

export const isSolarKit = (product: Product): boolean =>
  product.division === 'solar' && product.requiresSurvey

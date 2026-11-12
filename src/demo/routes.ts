import { aquaCategories, solarCategories } from './data/categories'

/**
 * Route registry for every demo page (used for QA), plus the header and footer navigation.
 */

export type DemoRoute = {
  label: string
  href: string
  /** Build phase that delivers this page. */
  phase: number
  note?: string
}

export type RouteGroup = { title: string; routes: DemoRoute[] }

export const policySlugs = [
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions' },
  { slug: 'shipping-policy', label: 'Shipping Policy' },
  { slug: 'refund-policy', label: 'Refund Policy' },
  { slug: 'warranty-policy', label: 'Warranty Policy' },
] as const

export const siteMap: RouteGroup[] = [
  {
    title: 'Main pages',
    routes: [
      { label: 'Home', href: '/', phase: 2 },
      { label: 'Aqua Shop', href: '/aqua', phase: 2 },
      { label: 'Solar Shop', href: '/solar', phase: 2 },
      { label: 'Product Details (Aqua example)', href: '/product/shower-pure-15', phase: 2 },
      { label: 'Product Details (Solar example)', href: '/product/home-on-grid-3kw-kit', phase: 2 },
      { label: 'Product Details (out of stock)', href: '/product/tank-guard-2000', phase: 2 },
      { label: 'Search Results', href: '/search?q=shower', phase: 2 },
      { label: 'Cart', href: '/cart', phase: 3 },
      { label: 'Checkout', href: '/checkout', phase: 3 },
      { label: 'Order Confirmation', href: '/order-confirmation', phase: 3 },
    ],
  },
  {
    title: 'Customer account',
    routes: [
      { label: 'Login', href: '/login', phase: 4 },
      { label: 'Register', href: '/register', phase: 4 },
      { label: 'My Account', href: '/account', phase: 4 },
      { label: 'My Orders', href: '/account/orders', phase: 4 },
      { label: 'Order Detail (example)', href: '/account/orders/EZ103877', phase: 4 },
      { label: 'Saved Addresses', href: '/account/addresses', phase: 4 },
      { label: 'My Warranties', href: '/account/warranties', phase: 4 },
      { label: 'My Service Requests', href: '/account/service-requests', phase: 4 },
      { label: 'Profile', href: '/account/profile', phase: 4 },
      { label: 'Track Order', href: '/track-order', phase: 4 },
    ],
  },
  {
    title: 'Solar',
    routes: [
      { label: 'Solar Savings Calculator', href: '/solar-calculator', phase: 5 },
      { label: 'Get a Quote / Free Site Survey', href: '/solar-quote', phase: 5 },
      { label: 'Solar Subsidy Information', href: '/solar-subsidy', phase: 5 },
    ],
  },
  {
    title: 'Aqua',
    routes: [
      { label: 'Free Water Test Request', href: '/water-test', phase: 6 },
      { label: 'Which Filter Do I Need?', href: '/filter-guide', phase: 6 },
    ],
  },
  {
    title: 'Support',
    routes: [
      { label: 'Installation Videos', href: '/installation-videos', phase: 6 },
      { label: 'Warranty Registration', href: '/warranty-registration', phase: 6 },
      { label: 'Service / AMC Request', href: '/service-request', phase: 6 },
      { label: 'FAQ', href: '/faq', phase: 6 },
      { label: 'Contact Us', href: '/contact', phase: 6 },
    ],
  },
  {
    title: 'Business',
    routes: [
      { label: 'Become a Dealer / Distributor', href: '/dealer', phase: 7 },
      { label: 'Bulk & Business Enquiry', href: '/bulk-enquiry', phase: 7 },
    ],
  },
  {
    title: 'About & content',
    routes: [
      { label: 'About Us', href: '/about', phase: 7 },
      { label: 'Blog', href: '/blog', phase: 7 },
      { label: 'Blog Article (example)', href: '/blog/signs-your-home-has-hard-water', phase: 7 },
      { label: 'Certificates & Downloads', href: '/certificates', phase: 7 },
    ],
  },
  {
    title: 'Policies',
    routes: policySlugs.map(({ slug, label }) => ({ label, href: `/policies/${slug}`, phase: 7 })),
  },
  {
    title: 'Demo tools',
    routes: [
      { label: 'Style guide', href: '/style-guide', phase: 1 },
      { label: 'Not found page (example)', href: '/this-page-does-not-exist', phase: 1 },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Header navigation                                                   */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string }
export type NavItem = { label: string; href: string; children?: NavLink[] }

export const headerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Aqua',
    href: '/aqua',
    children: [
      { label: 'All Aqua products', href: '/aqua' },
      ...aquaCategories.map((c) => ({ label: c.name, href: `/aqua?category=${c.slug}` })),
      { label: 'Which filter do I need?', href: '/filter-guide' },
      { label: 'Free water test', href: '/water-test' },
    ],
  },
  {
    label: 'Solar',
    href: '/solar',
    children: [
      { label: 'All Solar products', href: '/solar' },
      ...solarCategories.map((c) => ({ label: c.name, href: `/solar?category=${c.slug}` })),
      { label: 'Solar Calculator', href: '/solar-calculator' },
      { label: 'Get a Quote', href: '/solar-quote' },
    ],
  },
  {
    label: 'Support',
    href: '/faq',
    children: [
      { label: 'Installation Videos', href: '/installation-videos' },
      { label: 'Warranty Registration', href: '/warranty-registration' },
      { label: 'Service Request', href: '/service-request' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Colour palette', href: '/style-guide' },
]

/* ------------------------------------------------------------------ */
/* Footer columns (link every page)                                    */
/* ------------------------------------------------------------------ */

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Aqua products', href: '/aqua' },
      { label: 'Solar products', href: '/solar' },
      { label: 'Which filter do I need?', href: '/filter-guide' },
      { label: 'Free water test', href: '/water-test' },
      { label: 'Search', href: '/search' },
      { label: 'Cart', href: '/cart' },
    ],
  },
  {
    title: 'Solar',
    links: [
      { label: 'Solar calculator', href: '/solar-calculator' },
      { label: 'Get a quote', href: '/solar-quote' },
      { label: 'Book a site survey', href: '/solar-quote' },
      { label: 'Solar subsidy', href: '/solar-subsidy' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Track order', href: '/track-order' },
      { label: 'Installation videos', href: '/installation-videos' },
      { label: 'Warranty registration', href: '/warranty-registration' },
      { label: 'Service / AMC request', href: '/service-request' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact us', href: '/contact' },
      { label: 'My account', href: '/account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Certificates & downloads', href: '/certificates' },
      { label: 'Become a dealer', href: '/dealer' },
      { label: 'Bulk & business enquiry', href: '/bulk-enquiry' },
      { label: 'Colour palette', href: '/style-guide' },
    ],
  },
  {
    title: 'Policies',
    links: policySlugs.map(({ slug, label }) => ({ label, href: `/policies/${slug}` })),
  },
]

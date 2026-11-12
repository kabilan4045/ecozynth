import type { Certificate } from './types'

/** Placeholder certificates. Real names and documents come from Ecozynth. */
export const certificates: Certificate[] = [
  { id: 'c1', name: 'ISO 9001:2015 Quality Management', issuer: 'Lorem Certification Body', year: 2025, type: 'Quality' },
  { id: 'c2', name: 'ISO 14001:2015 Environmental Management', issuer: 'Lorem Certification Body', year: 2025, type: 'Environment' },
  { id: 'c3', name: 'BIS Registration – Solar Panels', issuer: 'Bureau of Indian Standards', year: 2024, type: 'Solar' },
  { id: 'c4', name: 'MNRE Empanelment', issuer: 'Ministry of New and Renewable Energy', year: 2024, type: 'Solar' },
  { id: 'c5', name: 'Water Filter Performance Test Report', issuer: 'Dolor Testing Laboratory', year: 2026, type: 'Product' },
  { id: 'c6', name: 'Softener Resin Safety Certificate', issuer: 'Dolor Testing Laboratory', year: 2026, type: 'Product' },
]

export const downloads = [
  { id: 'd1', name: 'Product catalogue', size: 'PDF · 4.2 MB' },
  { id: 'd2', name: 'Aqua brochure', size: 'PDF · 2.1 MB' },
  { id: 'd3', name: 'Solar brochure', size: 'PDF · 2.8 MB' },
  { id: 'd4', name: 'Price list', size: 'PDF · 0.6 MB' },
] as const

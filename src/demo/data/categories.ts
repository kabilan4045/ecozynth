import type { Category, Division } from './types'

export const aquaCategories: Category[] = [
  { slug: 'water-softeners', name: 'Water Softeners', division: 'aqua', icon: 'softener', description: 'Lorem ipsum for whole-house hard water.' },
  { slug: 'tank-filters', name: 'Tank Filters', division: 'aqua', icon: 'tank', description: 'Lorem ipsum for overhead and sump tanks.' },
  { slug: 'shower-filters', name: 'Shower Filters', division: 'aqua', icon: 'shower', description: 'Lorem ipsum for softer hair and skin.' },
  { slug: 'tap-filters', name: 'Tap Filters', division: 'aqua', icon: 'tap', description: 'Lorem ipsum for kitchen and wash basins.' },
  { slug: 'appliance-filters', name: 'Appliance Filters', division: 'aqua', icon: 'appliance', description: 'Lorem ipsum for washing machines and geysers.' },
  { slug: 'replacement-cartridges', name: 'Replacement Cartridges', division: 'aqua', icon: 'cartridge', description: 'Lorem ipsum refills for every filter.' },
  { slug: 'water-testers', name: 'Water Testers', division: 'aqua', icon: 'tester', description: 'Lorem ipsum TDS and hardness testing.' },
  { slug: 'accessories', name: 'Accessories', division: 'aqua', icon: 'accessory', description: 'Lorem ipsum fittings and spares.' },
]

export const solarCategories: Category[] = [
  { slug: 'residential-on-grid-kits', name: 'Residential On-Grid Kits', division: 'solar', icon: 'home-solar', description: 'Lorem ipsum for homes connected to the grid.' },
  { slug: 'hybrid-kits', name: 'Hybrid Kits (with battery)', division: 'solar', icon: 'battery', description: 'Lorem ipsum with battery backup.' },
  { slug: 'commercial-kits', name: 'Commercial Kits', division: 'solar', icon: 'factory', description: 'Lorem ipsum for shops, offices and factories.' },
  { slug: 'inverters', name: 'Inverters', division: 'solar', icon: 'inverter', description: 'Lorem ipsum on-grid and hybrid inverters.' },
  { slug: 'panels', name: 'Panels', division: 'solar', icon: 'panel', description: 'Lorem ipsum mono PERC and bifacial panels.' },
  { slug: 'solar-accessories', name: 'Accessories', division: 'solar', icon: 'cable', description: 'Lorem ipsum cables, structures and meters.' },
]

export const categories: Category[] = [...aquaCategories, ...solarCategories]

export const getCategory = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug)

export const getCategoriesByDivision = (division: Division): Category[] =>
  division === 'aqua' ? aquaCategories : solarCategories

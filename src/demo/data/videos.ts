import { LOREM } from './lorem'
import type { InstallationVideo } from './types'

export const videoCategories = ['Shower filters', 'Softeners', 'Tank & tap', 'Appliances', 'Solar'] as const

export const installationVideos: InstallationVideo[] = [
  { id: 'v1', title: 'Installing the ShowerPure 15', category: 'Shower filters', duration: '3:42', productSlug: 'shower-pure-15', description: LOREM },
  { id: 'v2', title: 'Replacing a shower cartridge', category: 'Shower filters', duration: '2:10', productSlug: 'shower-pure-cartridge-2-pack', description: LOREM },
  { id: 'v3', title: 'Setting up the EZ Soft Pro softener', category: 'Softeners', duration: '8:25', productSlug: 'ez-soft-pro-whole-house-softener', description: LOREM },
  { id: 'v4', title: 'Regenerating your softener', category: 'Softeners', duration: '4:05', productSlug: 'ez-soft-compact-softener', description: LOREM },
  { id: 'v5', title: 'Fitting the Tank Guard filter', category: 'Tank & tap', duration: '5:30', productSlug: 'tank-guard-1000', description: LOREM },
  { id: 'v6', title: 'Clip-on tap filter in 60 seconds', category: 'Tank & tap', duration: '1:04', productSlug: 'tap-pure-mini', description: LOREM },
  { id: 'v7', title: 'Washing machine filter installation', category: 'Appliances', duration: '3:15', productSlug: 'wash-guard-washing-machine-filter', description: LOREM },
  { id: 'v8', title: 'What happens on solar installation day', category: 'Solar', duration: '6:48', productSlug: 'home-on-grid-3kw-kit', description: LOREM },
]

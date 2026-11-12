import { loremParagraphs } from './lorem'
import type { BlogPost, BlogSection } from './types'

const sections = (headings: [string, 2 | 3][]): BlogSection[] =>
  headings.map(([heading, level], i) => ({
    id: heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    heading,
    level,
    paragraphs: loremParagraphs(i % 2 === 0 ? 2 : 1),
  }))

export const blogCategories = ['Hard Water', 'Solar Basics', 'Savings', 'How-to'] as const

export const blogPosts: BlogPost[] = [
  {
    slug: 'signs-your-home-has-hard-water',
    title: '7 signs your home has hard water',
    category: 'Hard Water',
    date: '2026-10-28',
    readTime: '5 min read',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    featured: true,
    sections: sections([
      ['What is hard water?', 2],
      ['White scaling on taps and tiles', 3],
      ['Dry skin and hair fall', 3],
      ['How to test your water', 2],
      ['What to do next', 2],
    ]),
    relatedProductSlugs: ['shower-pure-15', 'tds-hardness-tester'],
  },
  {
    slug: 'how-much-does-rooftop-solar-cost',
    title: 'How much does rooftop solar cost in India?',
    category: 'Solar Basics',
    date: '2026-10-15',
    readTime: '7 min read',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut enim ad minim veniam.',
    sections: sections([
      ['Cost per kW', 2],
      ['Subsidy and net cost', 2],
      ['On-grid vs hybrid', 3],
      ['Payback period', 2],
    ]),
    relatedProductSlugs: ['home-on-grid-3kw-kit', 'hybrid-3kw-battery-kit'],
  },
  {
    slug: 'shower-filter-buying-guide',
    title: 'Shower filter buying guide',
    category: 'How-to',
    date: '2026-09-30',
    readTime: '4 min read',
    excerpt: 'Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris.',
    sections: sections([
      ['Stages explained', 2],
      ['Fitting and connection size', 2],
      ['When to replace the cartridge', 3],
    ]),
    relatedProductSlugs: ['shower-pure-15', 'shower-pure-max'],
  },
  {
    slug: 'net-metering-explained',
    title: 'Net metering explained in plain words',
    category: 'Solar Basics',
    date: '2026-09-12',
    readTime: '6 min read',
    excerpt: 'Lorem ipsum dolor sit amet, duis aute irure dolor in reprehenderit.',
    sections: sections([
      ['How net metering works', 2],
      ['Applying with your DISCOM', 2],
      ['Common questions', 3],
    ]),
    relatedProductSlugs: ['home-on-grid-5kw-kit', 'on-grid-inverter-5kw'],
  },
  {
    slug: 'save-on-electricity-bills',
    title: '10 ways to cut your electricity bill',
    category: 'Savings',
    date: '2026-08-21',
    readTime: '5 min read',
    excerpt: 'Lorem ipsum dolor sit amet, excepteur sint occaecat cupidatat non proident.',
    sections: sections([
      ['Quick wins', 2],
      ['Appliance habits', 3],
      ['When solar makes sense', 2],
    ]),
    relatedProductSlugs: ['home-on-grid-3kw-kit', 'mono-perc-panel-540wp'],
  },
  {
    slug: 'protect-appliances-from-scaling',
    title: 'Protect your geyser and washing machine from scaling',
    category: 'Hard Water',
    date: '2026-08-02',
    readTime: '4 min read',
    excerpt: 'Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit.',
    sections: sections([
      ['Why scaling happens', 2],
      ['Appliance filters', 2],
      ['Maintenance checklist', 3],
    ]),
    relatedProductSlugs: ['wash-guard-washing-machine-filter', 'geyser-guard'],
  },
]

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug)

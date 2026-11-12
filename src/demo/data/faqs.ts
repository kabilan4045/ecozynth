import { LOREM, LOREM_ALT } from './lorem'
import type { Faq, FaqCategory } from './types'

export const faqCategories: FaqCategory[] = [
  'Orders & Shipping',
  'Aqua Products',
  'Solar',
  'Warranty & Service',
  'Payments',
]

export const faqs: Faq[] = [
  { id: 'f1', category: 'Orders & Shipping', question: 'How long does delivery take?', answer: LOREM },
  { id: 'f2', category: 'Orders & Shipping', question: 'Is shipping free?', answer: LOREM_ALT },
  { id: 'f3', category: 'Orders & Shipping', question: 'How do I track my order?', answer: LOREM },
  { id: 'f4', category: 'Aqua Products', question: 'Which filter is right for my home?', answer: LOREM_ALT },
  { id: 'f5', category: 'Aqua Products', question: 'How often should I change cartridges?', answer: LOREM },
  { id: 'f6', category: 'Aqua Products', question: 'Do shower filters reduce hair fall?', answer: LOREM_ALT },
  { id: 'f7', category: 'Solar', question: 'How much roof space do I need?', answer: LOREM },
  { id: 'f8', category: 'Solar', question: 'Is the government subsidy included?', answer: LOREM_ALT },
  { id: 'f9', category: 'Solar', question: 'What happens during the site survey?', answer: LOREM },
  { id: 'f10', category: 'Warranty & Service', question: 'How do I register my warranty?', answer: LOREM_ALT },
  { id: 'f11', category: 'Warranty & Service', question: 'What does the AMC cover?', answer: LOREM },
  { id: 'f12', category: 'Warranty & Service', question: 'How do I book a service visit?', answer: LOREM_ALT },
  { id: 'f13', category: 'Payments', question: 'Which payment methods do you accept?', answer: LOREM },
  { id: 'f14', category: 'Payments', question: 'Is cash on delivery available?', answer: LOREM_ALT },
  { id: 'f15', category: 'Payments', question: 'Can I pay for solar kits in EMIs?', answer: LOREM },
]

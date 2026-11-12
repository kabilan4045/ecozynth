'use client'

import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from './cn'

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode }

/** Accessible accordion (aria-expanded handled by Radix). Multiple items can be open. */
export const Accordion = ({
  items,
  defaultOpen,
  className,
}: {
  items: AccordionItem[]
  defaultOpen?: string[]
  className?: string
}) => (
  <RadixAccordion.Root
    className={cn('divide-y divide-line rounded-[var(--radius-card)] border border-line', className)}
    defaultValue={defaultOpen}
    type="multiple"
  >
    {items.map((item) => (
      <RadixAccordion.Item key={item.id} value={item.id}>
        <RadixAccordion.Header>
          <RadixAccordion.Trigger className="group flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium hover:bg-surface-hover">
            {item.title}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-muted transition-transform group-data-[state=open]:rotate-180"
            />
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content className="px-4 pb-4 text-muted">{item.content}</RadixAccordion.Content>
      </RadixAccordion.Item>
    ))}
  </RadixAccordion.Root>
)

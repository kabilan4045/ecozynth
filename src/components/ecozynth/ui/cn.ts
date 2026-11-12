import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names, letting later Tailwind classes win. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

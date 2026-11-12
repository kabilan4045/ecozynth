/** Lorem ipsum helpers for body copy in the wireframe demo. */

export const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

export const LOREM_ALT =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const LOREM_THIRD =
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.'

/** n paragraphs of lorem ipsum, cycling through three variants. */
export const loremParagraphs = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => [LOREM, LOREM_ALT, LOREM_THIRD][i % 3])

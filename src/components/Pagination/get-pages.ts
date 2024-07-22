const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

export interface GetPagesProps {
  /** Controlled active page number */
  page?: number

  /** Total amount of pages */
  total: number

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number
}

export const DOTS = 'dots' as const

export const getPages = ({ page = 1, total, siblings = 1, boundaries = 1 }: GetPagesProps) => {
  const _total = Math.max(Math.trunc(total), 0)

  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2

  if (totalPageNumbers >= _total) {
    return range(1, _total)
  }

  const leftSiblingIndex = Math.max(page - siblings, boundaries)
  const rightSiblingIndex = Math.min(page + siblings, _total - boundaries)

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
  const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1)

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = siblings * 2 + boundaries + 2
    return [...range(1, leftItemCount), DOTS, ...range(_total - (boundaries - 1), _total)]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaries + 1 + 2 * siblings
    return [...range(1, boundaries), DOTS, ...range(_total - rightItemCount, _total)]
  }

  return [
    ...range(1, boundaries),
    DOTS,
    ...range(leftSiblingIndex, rightSiblingIndex),
    DOTS,
    ...range(_total - boundaries + 1, _total),
  ]
}

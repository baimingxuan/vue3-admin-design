import { isClient, isWindow } from '@/utils/is'
import { getStyle } from './style'

export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  if (!isClient) return false

  const key = (
    {
      undefined: 'overflow',
      true: 'overflow-y',
      false: 'overflow-x'
    } as const
  )[String(isVertical)]!
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some(s => overflow.includes(s))
}

export const getScrollContainer = (el: HTMLElement, isVertical?: boolean): Window | HTMLElement | undefined => {
  if (!isClient) return

  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) return window

    if (isScroll(parent, isVertical)) return parent

    parent = parent.parentNode as HTMLElement
  }

  return parent
}

/**
 * Scroll with in the container element, positioning the **selected** element at the top
 * of the container
 */
export function scrollIntoView(container: HTMLElement, selected: HTMLElement): void {
  if (!isClient) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}

export const getScrollElement = (target: HTMLElement, container: HTMLElement | Window) => {
  if (isWindow(container)) {
    return target.ownerDocument.documentElement
  }
  return container
}

export const getScrollTop = (container: HTMLElement | Window) => {
  if (isWindow(container)) {
    return window.scrollY
  }
  return container.scrollTop
}

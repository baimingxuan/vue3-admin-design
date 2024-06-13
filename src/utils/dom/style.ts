import type { CSSProperties } from 'vue'
import { camelize } from 'vue'
import { isClient, isObject } from '@/utils/is'

export const classNameToArray = (cls = '') => cls.split(' ').filter(item => !!item.trim())

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
  if (!isClient || !element || !styleName) return ''

  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}

export const setStyle = (
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties | string,
  value?: string | number
) => {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    Object.entries(styleName).forEach(([prop, value]) => setStyle(element, prop, value))
  } else {
    const key: any = camelize(styleName)
    element.style[key] = value as any
  }
}

export const removeStyle = (element: HTMLElement, style: CSSProperties | keyof CSSProperties | string) => {
  if (!element || !style) return

  if (isObject(style)) {
    Object.keys(style).forEach(prop => removeStyle(element, prop))
  } else {
    setStyle(element, style, '')
  }
}

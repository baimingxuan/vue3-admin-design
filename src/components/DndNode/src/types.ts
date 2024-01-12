export enum handlerEnum {
  n = 'tm',
  e = 'mr',
  s = 'bm',
  w = 'ml',
  nw = 'tl',
  ne = 'tr',
  se = 'br',
  sw = 'bl'
}

export type handlerType = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'se' | 'sw'

export interface ElementState {
  x: number
  y: number
  z?: number | 'auto'
  w: number
  h: number
  active: boolean
  type: 'text' | 'image'
}

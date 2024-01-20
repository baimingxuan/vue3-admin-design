import type { styleState } from '@/types'

interface BaseElementState {
  x: number
  y: number
  z: number
  w: number
  h: number
  type: 'text' | 'image'
  tag: string
  active: boolean
}

export interface TextElementState extends BaseElementState {
  type: 'text'
  text: string
  style: styleState
}

export interface ImageElementState extends BaseElementState {
  type: 'image'
  url: string
}

export type ElementState = TextElementState | ImageElementState

export interface ContainerState {
  width: number
  height: number
  videoUrl: string
}

export interface ImageObjState {
  url: string
  width: number
  height: number
}

export type handlerType = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'se' | 'sw'

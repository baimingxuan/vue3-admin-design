import type { ImageElementState, TextElementState, ContainerState } from './types'
import { VIDEO_RES_SRC, VIDEO_IMG_SRC } from '@/settings/websiteSetting'

export const textElement: TextElementState = {
  x: 300,
  y: 100,
  z: 1,
  w: 180,
  h: 36,
  type: 'text',
  tag: 'text_1',
  active: false,
  text: '请输入文本',
  style: {
    fontFamily: '微软雅黑',
    fontSize: '24px',
    lineHeight: '24px',
    color: '#687684',
    backgroundColor: '#9ac8d8',
    fontWeight: '',
    fontStyle: '',
    textShadow: '',
    textAlign: 'left'
  }
}

export const imageElement: ImageElementState = {
  x: 320,
  y: 260,
  z: 2,
  w: 160,
  h: 160,
  type: 'image',
  tag: 'image_2',
  active: false,
  url: VIDEO_IMG_SRC
}

export const containerObj: ContainerState = {
  width: 850,
  height: 480,
  videoUrl: VIDEO_RES_SRC
}

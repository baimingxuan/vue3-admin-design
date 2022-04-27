import { MenuTypeEnum, MenuModeEnum } from '@/enums/menuEnum'

export interface ColorItem {
  name: string
  color: string
}

// menu type list
export const menuTypeList = [
  {
    title: '左侧菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDE_MENU
  },
  {
    title: '顶部菜单',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU
  },
  {
    title: '混合菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_MENU
  }
]

// app theme color
export const appThemeColorList: ColorItem[] = [
  {
      name: '拂晓蓝',
      color: '#1765AE'
  },
  {
      name: '薄暮',
      color: '#A71A1F'
  },
  {
      name: '火山',
      color: '#AE3E17'
  },
  {
      name: '日暮',
      color: '#B8831B'
  },
  {
      name: '明青',
      color: '#269491'
  },
  {
      name: '极光绿',
      color: '#509827'
  },
  {
      name: '极客蓝',
      color: '#20389A'
  },
  {
      name: '酱紫',
      color: '#60339A'
  }
]


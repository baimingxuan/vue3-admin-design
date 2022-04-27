import { MenuTypeEnum, MenuModeEnum } from '@/enums/menuEnum'

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
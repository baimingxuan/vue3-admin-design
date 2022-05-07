import type { PropType } from 'vue'
import type { Menu } from '@/router/types'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => []
  },
  type: {
    type: {
      type: String as PropType<MenuTypeEnum>,
      default: MenuTypeEnum.SIDE_MENU
    }
  },
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: ThemeEnum.LIGHT
  }
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: () => {}
  }
}
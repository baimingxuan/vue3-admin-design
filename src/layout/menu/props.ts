import type { PropType } from 'vue'
import type { AppMenu } from '@/router/types'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'

export const menuProps = {
  items: {
    type: Array as PropType<AppMenu[]>,
    default: () => []
  },
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.SIDE_MENU
  },
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: ThemeEnum.LIGHT
  },
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  }
}

export const itemProps = {
  item: {
    type: Object as PropType<AppMenu>,
    default: () => {}
  }
}
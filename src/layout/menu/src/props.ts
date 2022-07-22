import type { PropType } from 'vue'
import type { AppMenu } from '@/router/types'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { propTypes } from '@/utils/propTypes'
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
    default: ThemeEnum.DARK
  },
  isHorizontal: propTypes.bool,
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  }
}

export const menuItemProps = {
  item: {
    type: Object as PropType<AppMenu>,
    default: () => {}
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool
}

export const menuItemContentProps = {
  item: {
    type: Object as PropType<AppMenu>,
    default: () => {}
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true)
}
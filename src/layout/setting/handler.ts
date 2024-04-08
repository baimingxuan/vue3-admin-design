import { HandlerEnum } from './enum'
import type { AppConfig } from '@/types/config'

import { useAppStore } from '@/stores/modules/app'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { updateColorWeak, updateGrayMode } from '@/logics/theme/mode'

export function handler(event: HandlerEnum, value: any): DeepPartial<AppConfig> {
  const { getThemeColor } = useBaseSetting()

  switch (event) {
    case HandlerEnum.CHANGE_LAYOUT:
      const { menuType, menuMode } = value

      return {
        menuSetting: {
          menuType,
          menuMode,
          menuFold: false,
          menuSplit: false
        }
      }

    case HandlerEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) return {}

      return { themeColor: value }

    case HandlerEnum.MENU_SPLIT:
      return { menuSetting: { menuSplit: value } }

    case HandlerEnum.MENU_CAN_DRAG:
      return { menuSetting: { menuCanDrag: value } }

    case HandlerEnum.MENU_FIXED:
      return { menuSetting: { menuFixed: value } }

    case HandlerEnum.MENU_FOLD:
      return { menuSetting: { menuFold: value } }

    case HandlerEnum.MENU_FOLD_SHOW_TITLE:
      return { menuSetting: { menuFoldShowTitle: value } }

    case HandlerEnum.PAGE_TAGS_CACHED:
      return { tagsCached: value }

    case HandlerEnum.MENU_FOLD_BTN:
      return { menuSetting: { menuFoldBtn: value } }

    case HandlerEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } }

    case HandlerEnum.LOCK_SCREEN_TIME:
      return { lockScreenTime: value }

    case HandlerEnum.SHOW_BREADCRUMB:
      return { headerSetting: { showBreadCrumb: value } }

    case HandlerEnum.SHOW_PAGE_TAGS:
      return { headerSetting: { showTags: value } }

    case HandlerEnum.SHOW_SEARCH:
      return { headerSetting: { showSearch: value } }

    case HandlerEnum.SHOW_FULL_SCREEN:
      return { headerSetting: { showFullScreen: value } }

    case HandlerEnum.SHOW_LOCALE:
      return { headerSetting: { showLocale: value } }

    case HandlerEnum.SHOW_DOC:
      return { headerSetting: { showDoc: value } }

    case HandlerEnum.SHOW_GITHUB:
      return { headerSetting: { showGithub: value } }

    case HandlerEnum.SHOW_FOOTER:
      return { showFooter: value }

    case HandlerEnum.COLOR_WEAK:
      updateColorWeak(value)
      return { colorWeak: value }

    case HandlerEnum.GRAY_MODE:
      updateGrayMode(value)
      return { grayMode: value }

    case HandlerEnum.OPEN_NPROGRESS:
      return { transitionSetting: { openNProgress: value } }

    case HandlerEnum.OPEN_TRANSITION:
      return { transitionSetting: { openTransition: value } }

    case HandlerEnum.BASIC_TRANSITION:
      return { transitionSetting: { basicTransition: value } }

    default:
      return {}
  }
}

export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore()
  const config = handler(event, value)
  appStore.setAppConfig(config)
}

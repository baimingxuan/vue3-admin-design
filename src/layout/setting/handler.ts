import { HandlerEnum } from './enum'
import { AppConfig } from '@/interfaces/config'

import { useAppStore } from '@/stores/modules/app'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

export function handler(event: HandlerEnum, value: any): DeepPartial<AppConfig> {
    // const appStore = useAppStore()

    const { getThemeColor } = useBaseSetting()

    switch (event) {
        case HandlerEnum.CHANGE_LAYOUT:
            const { menuType, menuMode } = value
            // const splitOpt = split === undefined ? { split } : {}

            return {
                menuSetting: {
                    menuType,
                    menuMode
                    // ...splitOpt
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

        case HandlerEnum.MENU_FOLD_BTN:
            return { menuSetting: { menuFoldBtn: value } }

        case HandlerEnum.MENU_WIDTH:
            return { menuSetting: { menuWidth: value } }

        case HandlerEnum.LOCK_SCREEN_TIME:
            return { lockScreenTime: value }

        case HandlerEnum.SHOW_BREADCRUMB:
            return { headerSetting: { showBreadCrumb: value } }

        case HandlerEnum.SHOW_PAGE_TAGS:
            return { headerSetting: { showPageTags: value } }

        case HandlerEnum.SHOW_LOCALE:
            return { headerSetting: { showLocale: value } }

        case HandlerEnum.SHOW_FULL_SCREEN:
            return { headerSetting: { showFullScreen: value } }

        case HandlerEnum.SHOW_DOC:
            return { headerSetting: { showDoc: value } }

        case HandlerEnum.SHOW_GITHUB:
            return { headerSetting: { showGithub: value } }

        case HandlerEnum.SHOW_FOOTER:
            return { showFooter: value }

        case HandlerEnum.COLOR_WEAK:
            return { colorWeak: value }

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
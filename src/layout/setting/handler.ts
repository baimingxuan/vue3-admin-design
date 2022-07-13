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

        case HandlerEnum.MENU_FOLD:
            return { menuSetting: { menuFold: value } }

        case HandlerEnum.MENU_FOLD_SHOW_TITLE:
            return { menuSetting: { menuFoldShowTitle: value } }

        default:
            return {}
    }
}

export function baseHandler(event: HandlerEnum, value: any) {
    const appStore = useAppStore()
    const config = handler(event, value)
    appStore.setAppConfig(config)
  }
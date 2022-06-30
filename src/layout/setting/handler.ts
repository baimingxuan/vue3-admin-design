import { HandlerEnum } from './enum'
import { AppConfig } from '@/interfaces/config'

// import { useAppStore } from '@/stores/modules/app'

export function handler(event: HandlerEnum, value: any): DeepPartial<AppConfig> {
    // const appStore = useAppStore()

    switch (event) {
        case HandlerEnum.CHANGE_LAYOUT:
            const { menuType, menuMode, split } = value
            const splitOpt = split === undefined ? { split } : {}

            return {
                menuSetting: {
                    menuType,
                    menuMode,
                    collapsed: false,
                    ...splitOpt
                }
            }

        default:
            return {}
    }
}


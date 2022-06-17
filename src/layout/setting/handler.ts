import { HandlerEnum } from './enum'
import { AppConfig } from '@/interfaces/config'

import { useAppStore } from '@/stores/modules/app'

export function handler(event: HandlerEnum, value: any) {
    const appStore = useAppStore()

    switch (event) {
        case HandlerEnum.CHANGE_LAYOUT:
            const { mode, type, split } = value
            const splitOpt = split === undefined ? { split } : {}

            return {
                menuSetting: {
                    mode,
                    type,
                    collapsed: false,
                    show: true,
                    hidden: false,
                    ...splitOpt
                }
            }
    }
}
import { MenuModeEnum } from '@/enums/menuEnum'

export interface MenuState {
    menuMode: MenuModeEnum,
    menuCollapse: boolean,
    menuBgColor: string,
    menuTextColor: string,
    menuActiveTextColor: string
}

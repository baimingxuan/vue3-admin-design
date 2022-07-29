import type { AppMenu, AppMenuModule } from '../types'
import { transformMenuModule } from '../helper/menuHelper'
import { usePermissionStore } from '@/stores/modules/permission'
import { getAllParentPath } from '@/router/helper/menuHelper'

const routeModules = import.meta.globEager('./routes/modules/*.ts')

const menuModules: AppMenuModule[] = []

Object.keys(routeModules).forEach(key => {
    const module = routeModules[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    menuModules.push(...moduleList)
})

export async function getCurrentParentPath(currentPath: string) {
    const menus = await getAsyncMenus()
    const allParentPath = await getAllParentPath(menus, currentPath)
    return allParentPath?.[0]
}

export const getMenus = async (): Promise<AppMenu[]> => {

    async function generateMenus() {
        const permissionStore = usePermissionStore()
        // const staticMenus: AppMenu[] = []

        // menuModules.sort((a, b) => {
        //     return (a.orderNo || 0) - (b.orderNo || 0)
        // })

        // for (const menu of menuModules) {
        //     staticMenus.push(transformMenuModule(menu))
        // }

        // return staticMenus
        return permissionStore.getMenuList.filter(item => !item.hideMenu)
    }
    
    const menus = await generateMenus()

    return menus
}


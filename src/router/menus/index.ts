import type { AppMenu, AppMenuModule } from '../types'
import { transformMenuModule } from '../helper/menuHelper'

const routeModules = import.meta.globEager('./routes/modules/*.ts')

const menuModules: AppMenuModule[] = []

Object.keys(routeModules).forEach(key => {
    const module = routeModules[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    menuModules.push(...moduleList)
})


export const getMenus = async (): Promise<AppMenu[]> => {

    async function generateMenus() {
        const staticMenus: AppMenu[] = []

        menuModules.sort((a, b) => {
            return (a.orderNo || 0) - (b.orderNo || 0)
        })

        for (const menu of menuModules) {
            staticMenus.push(transformMenuModule(menu))
        }

        return staticMenus
    }
    
    const menus = await generateMenus()

    return menus
}


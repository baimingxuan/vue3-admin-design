import type { AppMenu } from '../types'

const routeModules = import.meta.globEager('./modules/*.ts')

const menuList: AppMenu[] = []

Object.keys(routeModules).forEach(key => {
    const module = routeModules[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    menuList.push(...moduleList)
})
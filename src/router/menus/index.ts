import type { AppMenu } from "../types"
// import { transformMenuModule } from "../helper/menuHelper"
import { usePermissionStore } from "@/stores/modules/permission"
import { getAllParentPath, transformRouteToMenu } from "@/router/helper/menuHelper"
import { PermissionModeEnum } from '@/enums/appEnum'
import { asyncRoutes } from '@/router/routes'

const routeModules = import.meta.glob("./routes/modules/*.ts", { eager: true }) as Object

const menuModules: AppMenu[] = []

Object.keys(routeModules).forEach(key => {
  const module = routeModules[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  menuModules.push(...moduleList)
})

const isMappingMode = () => {
  return PermissionModeEnum.MAPPING
}

const isBackendMode = () => {
  return PermissionModeEnum.BACKEND
}


// const staticMenus: AppMenu[] = [];
// (() => {
//   menuModules.sort((a, b) => {
//     return (a.orderNo || 0) - (b.orderNo || 0);
//   });

//   for (const menu of menuModules) {
//     console.log('menu', menu)
//     staticMenus.push(transformMenuModule(menu));
//   }
// })();


async function getAsyncMenus() {
  const staticMenus: AppMenu[] = []
  
  // for (const menu of menuModules) {
  //   staticMenus.push(transformMenuModule(menu))
  // }
  return staticMenus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<AppMenu[]> {
  const menus = transformRouteToMenu(asyncRoutes)
  const shallowMenuList = menus.map(item => ({ ...item, children: undefined }))
  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find(item => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as AppMenu[]
  }
  return parent.children
}

export const getMenus = async (): Promise<AppMenu[]> => {
  async function generateMenus() {
    const permissionStore = usePermissionStore();
    // const staticMenus: AppMenu[] = []

    // menuModules.sort((a, b) => {
    //     return (a.orderNo || 0) - (b.orderNo || 0)
    // })

    // for (const menu of menuModules) {
    //     staticMenus.push(transformMenuModule(menu))
    // }

    // return staticMenus
    return permissionStore.getMenuList.filter((item) => !item.hideMenu);
  }

  const menus = await generateMenus();

  return menus;
};

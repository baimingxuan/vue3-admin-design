import type { AppMenu, AppMenuModule } from "../types"
// import { transformMenuModule } from "../helper/menuHelper"
import { usePermissionStore } from "@/stores/modules/permission"
import { getAllParentPath } from "@/router/helper/menuHelper"
import { PermissionModeEnum } from '@/enums/appEnum'

const routeModules = import.meta.glob("./routes/modules/*.ts", { eager: true }) as Object

const menuModules: AppMenuModule[] = []

Object.keys(routeModules).forEach(key => {
  const module = routeModules[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  menuModules.push(...moduleList)
});

// const staticMenus: AppMenu[] = []
// (() => {
//   menuModules.sort((a, b) => {
//     return (a.orderNo || 0) - (b.orderNo || 0);
//   });

//   for (const menu of menuModules) {
//     staticMenus.push(transformMenuModule(menu));
//   }
// })();
const isBackendMode = () => {
  return PermissionModeEnum.BACKEND
}

async function getAsyncMenus() {
  
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// get the level 1 menu, delete children
export async function getShallowMenus(): Promise<AppMenu[]> {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map(item => ({ ...item, children: undefined }))
  return shallowMenuList
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

import type { AppMenu } from '@/router/types'
import { ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'

import { usePermissionStore } from '@/stores/modules/permission'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { getAsyncMenus, getShallowMenus, getChildrenMenus, getCurrentParentPath } from '@/router/menus'

export function useLayoutMenu(menuSplit: boolean) {
  // Menu array
  const menusRef = ref<AppMenu[]>([])
  const childrenMenus = ref<AppMenu[]>([])
  const { currentRoute } = useRouter()
  const permissionStore = usePermissionStore()
  const { getIsHorizontal, getMenuSplit, setMenuSetting } = useMenuSetting()

  const throttleHandleSplitMenu = useThrottleFn(handleSpliteMenu, 50)

  // Whether to split the horizontal menu
  watch(
    [() => unref(currentRoute).path, () => unref(menuSplit)],
    async ([path]: [string, boolean]) => {
      if (!unref(getIsHorizontal)) return

      const parentPath = await getCurrentParentPath(path)
      parentPath && throttleHandleSplitMenu(parentPath)
    },
    {
      immediate: true
    }
  )

  // Menu list change
  watch(
    () => permissionStore.getMenuList,
    () => getMenuList(),
    {
      immediate: true
    }
  )

  // Split menu change
  watch(
    () => getMenuSplit.value,
    () => getMenuList()
  )

  // Handle split menu
  async function handleSpliteMenu(parentPath: string) {
    if (!unref(getMenuSplit)) return

    const children = await getChildrenMenus(parentPath)

    if (!children || !children.length) {
      setMenuSetting({ menuHidden: true })
      // menusRef.value = []
      // return
    }

    setMenuSetting({ menuHidden: false })
    childrenMenus.value = children
  }

  // Get menu list
  async function getMenuList() {
    if (unref(getMenuSplit)) {
      menusRef.value = await getShallowMenus()
      return
    } else {
      menusRef.value = await getAsyncMenus()
      return
    }
  }

  return { menusRef, childrenMenus }
}

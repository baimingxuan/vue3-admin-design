import type { AppMenu } from '@/router/types'
import { ref, unref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'

import { usePermissionStore } from '@/stores/modules/permission'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { getMenus, getShallowMenus, getChildrenMenus, getCurrentParentPath } from '@/router/menus'

export function useLayoutMenu(menuSplit: boolean) {
  // Menu array
  const menusRef = ref<AppMenu[]>([])
  const { currentRoute } = useRouter()
  const permissionStore = usePermissionStore()
  const { getMenuSplit, setMenuSetting } = useMenuSetting()

  const throttleHandleSplitMenu = useThrottleFn(handleSpliteMenu, 50)

  // Route path change
  watch(
    [() => unref(currentRoute).path, () => unref(menuSplit)],
    async ([path]: [string]) => {
      const { meta } = unref(currentRoute)
      const currentActiveMenu = meta.currentActiveMenu as string
      let parentPath = await getCurrentParentPath(path)
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu)
      }

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
    const children = await getChildrenMenus(parentPath)

    if (!children || !children.length) {
      setMenuSetting({ menuHidden: true })
      menusRef.value = []
      return
    }

    setMenuSetting({ menuHidden: false })
    menusRef.value = children
  }

  // Get menu list
  async function getMenuList() {
    if (unref(getMenuSplit)) {
      menusRef.value = await getShallowMenus()
      return
    } else {
      menusRef.value = await getMenus()
      return
    }
  }

  return { menusRef }
}
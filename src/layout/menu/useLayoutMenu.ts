import type { Ref } from 'vue'
import type { AppMenu } from '@/router/types'
import { ref, unref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { MenuSplitTyeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { getMenus, getShallowMenus, getChildrenMenus, getCurrentParentPath } from '@/router/menus'

export function useLayoutMenu(menuSplitType: Ref<MenuSplitTyeEnum>) {
  // Menu array
  const menusRef = ref<AppMenu[]>([])
  const { currentRoute } = useRouter()
  const { getMenuSplit, getIsHorizontal, setMenuSetting } = useMenuSetting()

  const getNoSplit = computed(() => {
    return unref(menuSplitType) === MenuSplitTyeEnum.NONE || !(unref(getMenuSplit))
  })

  // Route path change
  watch(
    [() => unref(currentRoute).path, () => unref(menuSplitType)],
    async () => {},
    {
      immediate: true
    }
  )

  // Split menu change
  watch(
    () => getMenuSplit.value,
    () => getMenuList()
  )

  // Get menu list
  async function getMenuList() {
    // Menu no split
    if (unref(getNoSplit)) {
      menusRef.value = await getMenus()
      return
    }

    // Menu split
    if (unref(getMenuSplit)) {
      menusRef.value = await getShallowMenus()
      return
    }
  }

  return { menusRef }
}
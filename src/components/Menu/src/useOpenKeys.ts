import { type Ref, toRaw } from 'vue'
import type { Key } from 'ant-design-vue/lib/_util/type'
import type { AppMenu } from '@/router/types'
import type { MenuState } from './types'

import { computed, unref } from 'vue'
import { MenuModeEnum } from '@/enums/menuEnum'
import { getAllParentPath } from '@/router/helper/menuHelper'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { useDebounceFn } from '@vueuse/core'
import { uniq } from 'lodash-es'

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<AppMenu[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>
) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50)
  const { getMenuFold, getIsHybridMenu } = useMenuSetting()

  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL) return

    const native = unref(getIsHybridMenu)
    const menuList = toRaw(menus.value)

    const handle = () => {
      if (menuList?.length === 0) {
        menuState.openKeys = []
        return
      }

      if (!unref(accordion)) {
        menuState.openKeys = uniq([...menuState.openKeys, ...getAllParentPath(menuList, path)])
      } else {
        menuState.openKeys = getAllParentPath(menuList, path)
      }
    }
    if (native) {
      handle()
    } else {
      useTimeoutFn(handle, 30)
    }
  }

  const getOpenKeys = computed(() => {
    const isFold = unref(getIsHybridMenu) ? false : unref(getMenuFold)
    return isFold ? menuState.collapsedOpenKeys : menuState.openKeys
  })

  function handleOpenChange(openKeys: Key[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion || unref(getIsHybridMenu))) {
      menuState.openKeys = openKeys as string[]
    } else {
      const rootSubMenuKeys: string[] = []
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path)
        }
      }

      if (!unref(getMenuFold)) {
        const latestOpenKey = openKeys.find(key => menuState.openKeys.indexOf(key as string) === -1)
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          menuState.openKeys = openKeys as string[]
        } else {
          menuState.openKeys = latestOpenKey ? [latestOpenKey as string] : []
        }
      } else {
        menuState.collapsedOpenKeys = openKeys as string[]
      }
    }
  }

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys, handleOpenChange }
}

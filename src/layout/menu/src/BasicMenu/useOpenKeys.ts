import type { Ref } from 'vue'
import { computed, unref } from 'vue'
import { Key } from 'ant-design-vue/lib/_util/type'

import type { AppMenu } from '@/router/types'
import type { MenuState } from '../types'
import { MenuModeEnum } from '@/enums/menuEnum'

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<AppMenu[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>
) {
  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL) return
    console.log(path)
  }

  const getOpenKeys = computed(() => menuState.openKeys)

  function handleOpenChange(openKeys: Key[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion)) {
      menuState.openKeys = openKeys as string[]
    }
  }

  return { setOpenKeys, getOpenKeys, handleOpenChange }
}
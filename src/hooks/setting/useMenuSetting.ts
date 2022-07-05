import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuType = computed(() => appStore.getMenuSetting.menuType)

  const getMenuMode = computed(() => appStore.getMenuSetting.menuMode)

  const getMenuTheme = computed(() => appStore.getMenuSetting.menuTheme)

  const getMenuFold = computed(() => appStore.getMenuSetting.menuFold)

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  return {
    getMenuType,
    getMenuMode,
    getMenuTheme,
    getMenuFold,
    getCollapsed,
    getCollapsedShowTitle,
    getMenuWidth
  }
}
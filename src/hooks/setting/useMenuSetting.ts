import { computed } from 'vue';
import { useAppStore } from '@/stores/modules/app';

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuType = computed(() => appStore.getMenuSetting.type)

  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)

  const getMenuFold = computed(() => appStore.getMenuSetting.menuFold)

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)
}
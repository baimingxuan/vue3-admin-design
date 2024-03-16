import { computed, unref } from 'vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export function useLayout() {
  const { getShowFooter } = useBaseSetting()
  const { getMenuSplit } = useMenuSetting()
  const { getShowTags } = useHeaderSetting()

  const getHeaderHeight = computed(() => (unref(getShowTags) && !unref(getMenuSplit) ? '80px' : '48px'))

  const getFooterHeight = computed(() => (unref(getShowFooter) ? '36px' : '0px'))

  const getContentHeight = computed(() =>
    unref(getMenuSplit)
      ? `calc(100vh - 80px - ${unref(getFooterHeight)})`
      : `calc(100vh - ${unref(getHeaderHeight)} - ${unref(getFooterHeight)})`
  )

  return {
    getShowTags,
    getHeaderHeight,
    getContentHeight
  }
}

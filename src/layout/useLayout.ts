import { computed, unref } from 'vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export function useLayout() {
  const { getMenuSplit } = useMenuSetting()
  const { getShowTags } = useHeaderSetting()

  const getHeaderHeight = computed(() => (unref(getShowTags) && !unref(getMenuSplit) ? '80px' : '48px'))

  const getContentHeight = computed(() =>
    unref(getMenuSplit) ? 'calc(100vh - 80px)' : `calc(100vh - ${unref(getHeaderHeight)})`
  )

  return {
    getShowTags,
    getHeaderHeight,
    getContentHeight
  }
}

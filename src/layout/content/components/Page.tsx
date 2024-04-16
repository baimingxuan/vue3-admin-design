import { defineComponent, computed, unref, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import { useTagStore } from '@/stores/modules/tags'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { usePageTransition } from '../usePageTransition'

export default defineComponent({
  name: 'LayoutPage',

  setup() {
    const tagStore = useTagStore()
    const { getTagsCached } = useBaseSetting()
    const { getShowTags } = useHeaderSetting()
    const { getTransitionName } = usePageTransition()

    const openPageCache = computed(() => unref(getTagsCached) && unref(getShowTags))

    const getPageCaches = computed((): string[] => {
      if (!unref(openPageCache)) {
        return []
      }
      return tagStore.getCachedTags
    })

    return () => (
      <RouterView>
        {{
          default: ({ Component, route }) => {
            return (
              <Transition name={getTransitionName(route)} mode='out-in'>
                {unref(openPageCache) ? (
                  <KeepAlive include={unref(getPageCaches)}>
                    <Component key={route.fullPath} />
                  </KeepAlive>
                ) : (
                  <Component key={route.fullPath} />
                )}
              </Transition>
            )
          }
        }}
      </RouterView>
    )
  }
})

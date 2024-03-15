import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'
import { defineComponent, computed, unref, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import { useTagStore } from '@/stores/modules/tags'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}

export default defineComponent({
  name: 'LayoutPage',

  setup() {
    const tagStore = useTagStore()
    const { getTagsCached } = useBaseSetting()
    const { getShowTags } = useHeaderSetting()
    const { getOpenTransition, getBasicTransition } = useTransitionSetting()

    const openPageCache = computed(() => unref(getTagsCached) && unref(getShowTags))

    const getPageCaches = computed((): string[] => {
      if (!unref(openPageCache)) {
        return []
      }
      return tagStore.getCachedTags
    })

    function getTransitionName({
      route,
      openCache,
      cacheTags,
      openTransition,
      def
    }: Pick<DefaultContext, 'route'> & {
      openCache: boolean
      cacheTags: string[]
      openTransition: boolean
      def: string
    }): string | undefined {
      if (!openTransition) return undefined

      const isInCache = cacheTags.includes(route.name as string)
      const transitionName = 'fade-slide'
      let name: string | undefined = transitionName

      if (openCache) {
        name = isInCache && route.meta.loaded ? transitionName : undefined
      }
      return name || (route.meta.transitionName as string) || def
    }

    return () => (
      <RouterView>
        {{
          default: ({ Component, route }) => {
            return (
              <Transition
                name={getTransitionName({
                  route,
                  openCache: unref(openPageCache),
                  cacheTags: unref(getPageCaches),
                  openTransition: unref(getOpenTransition),
                  def: unref(getBasicTransition)
                })}
                mode='out-in'
              >
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

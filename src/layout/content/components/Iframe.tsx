import type { AppRoute } from '@/router/types'
import { defineComponent, unref, toRaw, computed, Transition } from 'vue'
import { useRouter } from 'vue-router'
import { uniqBy } from 'lodash-es'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTagStore } from '@/stores/modules/tags'
import { IframeWrapper } from '@/components/Iframe'
import { usePageTransition } from '../usePageTransition'

export default defineComponent({
  name: 'LayoutIframe',
  setup() {
    const { currentRoute, getRoutes } = useRouter()
    const { getTagsCached } = useBaseSetting()
    const { getShowTags } = useHeaderSetting()
    const { getTransitionName } = usePageTransition()
    const tagStore = useTagStore()

    const getIframeCache = computed(() => unref(getTagsCached) && unref(getShowTags))

    const getIframePages = computed(() => {
      return getAllIframePages(toRaw(getRoutes()) as unknown as AppRoute[]) || []
    })

    const getIframeInTags = computed((): string[] => {
      return tagStore.getVisitedTags.reduce((prev: string[], curr) => {
        if (curr.meta && Reflect.has(curr.meta, 'iframeSrc')) {
          prev.push(curr.name as string)
        }
        return prev
      }, [])
    })

    function showIframePage(route: AppRoute) {
      return unref(currentRoute).name === route.name
    }

    function getAllIframePages(routes: AppRoute[]): AppRoute[] {
      const result: AppRoute[] = []
      for (const route of routes) {
        const { meta: { iframeSrc } = {}, children } = route
        if (iframeSrc) {
          result.push(route)
        }
        if (children && children.length) {
          result.push(...getAllIframePages(children))
        }
      }
      return uniqBy(result, 'name')
    }

    function hasRenderIframe(name: string) {
      if (!unref(getIframeCache)) {
        return unref(currentRoute).name === name
      }
      return unref(getIframeInTags).includes(name)
    }

    return () => (
      <>
        {unref(getIframePages).map(
          item =>
            item.meta.iframeSrc &&
            hasRenderIframe(item.name) && (
              <Transition name={getTransitionName(item)} mode='out-in'>
                <IframeWrapper v-show={showIframePage(item)} key={item.name} iframeSrc={item.meta.iframeSrc} />
              </Transition>
            )
        )}
      </>
    )
  }
})

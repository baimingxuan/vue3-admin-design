import type { RouteLocationNormalized } from 'vue-router'

import { toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useTagStore } from '@/stores/modules/tags'

export function initAffixTags(): void {
  const tagsStore = useTagStore()
  const router = useRouter()

  // Filter all fixed routes
  function filterAffixTags(routes: RouteLocationNormalized[]) {
    const tags: RouteLocationNormalized[] = []

    routes &&
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          tags.push(toRaw(route))
        }
      })

    return tags
  }

  const affixTags = filterAffixTags(router.getRoutes() as unknown as RouteLocationNormalized[])

  for (const tag of affixTags) {
    tagsStore.addVisitedTags({
      meta: tag.meta,
      name: tag.name,
      path: tag.path
    } as unknown as RouteLocationNormalized)
  }
}

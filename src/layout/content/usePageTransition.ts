import type { RouteLocation } from 'vue-router'
import type { AppRoute } from '@/router/types'
import { unref } from 'vue'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

export function usePageTransition() {
  const { getOpenTransition, getBasicTransition } = useTransitionSetting()

  function getTransitionName(route: RouteLocation | AppRoute): string | undefined {
    if (!unref(getOpenTransition)) return undefined

    return (route.meta.transitionName as string) || unref(getBasicTransition)
  }

  return {
    getTransitionName
  }
}

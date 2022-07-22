<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="getTransitionName({
        openTransition: getOpenTransition,
        def: getBasicTransition
      })"
      mode="out-in"
      appear
    >
      <keep-alive v-if="openPageCache">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-else :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'

  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

  export default defineComponent({
    name: 'LayoutPage',

    setup() {
      const { getOpenKeepAlive } = useBaseSetting()
      const { getShowPageTags } = useHeaderSetting()
      const { getOpenTransition, getBasicTransition } = useTransitionSetting()

      const openPageCache = computed(() => unref(getOpenKeepAlive) && unref(getShowPageTags))

      function getTransitionName({
        openTransition,
        def
      }: {
        openTransition: boolean
        def: string
      }): string | undefined {
        if (!openTransition) return undefined
        return def
      }

      return {
        openPageCache,
        getOpenTransition,
        getBasicTransition,
        getTransitionName
      }

    }
  })
</script>
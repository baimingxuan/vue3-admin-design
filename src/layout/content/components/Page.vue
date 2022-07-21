<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="'fade'" mode="out-in" appear>
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

  export default defineComponent({
    name: 'LayoutPage',

    setup() {
      const { getOpenKeepAlive } = useBaseSetting()
      const { getShowPageTags } = useHeaderSetting()
      const openPageCache = computed(() => unref(getOpenKeepAlive) && unref(getShowPageTags))

      return {
        openPageCache
      }

    }
  })
</script>
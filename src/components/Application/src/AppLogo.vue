<template>
  <div :class="getAppLogoClass" @click="goHome">
    <img :src="getAppLogoSrc" alt="logo">
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  import { propTypes } from '@/utils/propTypes'
  import { useGo } from '@/hooks/web/usePage'

  import AppLogoImg from '@/assets/images/logo.png'
  import AppLogoIcon from '@/assets/images/logo-icon.png'

  const props = defineProps({
    // The theme of the current parent component
    theme: propTypes.oneOf(['dark', 'light']),

    // Whether to collapsed
    collapsed: propTypes.bool.def(false)
  })

  const getAppLogoClass = computed(() => ['compo_app-logo', props.theme])

  const getAppLogoSrc = computed(() => props.collapsed ? AppLogoIcon : AppLogoImg)

  const go = useGo()

  function goHome() {
    go('/')
  }
</script>

<!-- <style lang="=less" scoped>
  .compo_app-logo {
  }
</style> -->
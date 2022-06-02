<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else :theme="theme" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ImportAsyncComponent } from '@/utils/factory/ImportAsyncComponent'
  import { propTypes } from '@/utils/propTypes'
  import HeaderTrigger from './HeaderTrigger.vue'

  export default defineComponent({
    name: 'LayoutTrigger',
    components: {
      SiderTrigger: ImportAsyncComponent(() => import('./SiderTrigger.vue')),
      HeaderTrigger
    },
    props: {
      sider: propTypes.bool.def(true),
      theme: propTypes.oneOf(['light', 'dark'])
    }
  })

</script>
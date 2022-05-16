<template>
  <AntdMenu
    :subMenuOpenDelay="0.2"
  >
    <template v-for="item in items" :key="item.path">
      <SubMenuItem />
    </template>
  </AntdMenu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'
  import type { AppMenu } from '@/router/types'
  import type { PropType } from 'vue'
  import SubMenuItem from './SubMenuItem.vue'

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      AntdMenu,
      SubMenuItem
    },
    props: {
      items: {
        type: Array as PropType<AppMenu[]>,
        default: () => []
      }
    }
  })
</script>
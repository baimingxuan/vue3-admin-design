<template>
  <AntdMenu
    :subMenuOpenDelay="0.2"
    @click="handleMenuClick"
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
  import { isFunction } from '@/utils/is'

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
      },
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>
      }
    },
    setup(props, { emit }) {

      async function handleMenuClick({ key }: { key: string; keyPath: string[] }) {
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)
      }

      return {
        handleMenuClick
      }
    }
  })
</script>
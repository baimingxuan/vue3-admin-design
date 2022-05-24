<template>
  <AntdMenu
    :mode="mode"
    :theme="theme"
    :subMenuOpenDelay="0.2"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <SubMenuItem />
    </template>
  </AntdMenu>
</template>

<script lang="ts">
  import type { MenuState } from '../types'

  import { defineComponent, ref, toRefs, reactive } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'
  
  import SubMenuItem from './SubMenuItem.vue'
  import { isFunction } from '@/utils/is'
  import { menuProps } from '../props'

  export default defineComponent({
    name: 'Menu',
    components: {
      AntdMenu,
      SubMenuItem
    },
    props: menuProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false)

      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: []
      })

      async function handleMenuClick(e: object) {
        const { key } = e as { key: string }
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)

        isClickGo.value = true
        menuState.selectedKeys = [key]
      }

      return {
        handleMenuClick,
        ...toRefs(menuState)
      }
    }
  })
</script>
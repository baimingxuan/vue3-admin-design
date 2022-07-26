<template>
  <Menu
    :mode="mode"
    :theme="theme"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    :inlineIndent="20"
    :subMenuOpenDelay="0.2"
    @openChange="handleOpenChange"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <SubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>

<script lang="ts">
  import type { MenuState } from '../types'

  import { defineComponent, ref, toRefs, reactive } from 'vue'
  
  import SubMenuItem from './components/SubMenuItem.vue'
  import { isFunction } from '@/utils/is'
  import { menuProps } from '../props'
  import { useOpenKeys } from './useOpenKeys'

  export default defineComponent({
    name: 'Menu',
    components: {
      SubMenuItem
    },
    props: menuProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false)

      const menuState = reactive<MenuState>({
        openKeys: [],

        selectedKeys: [],

        collapsedOpenKeys: []
      })

      const { items, mode, accordion } = toRefs(props)

      const { handleOpenChange } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion
      )

      async function handleMenuClick(event: any) {
        const { key } = event as { key: string }
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
        handleOpenChange,
        handleMenuClick,
        ...toRefs(menuState)
      }
    }
  })
</script>
<template>
  <Menu :mode="menuMode"
        :collapse="menuCollapse">
  </Menu>
</template>

<script lang="ts">
  import { ElMenu as Menu } from 'element-plus'
  import type { MenuState } from './types'
  import { defineComponent, toRefs, reactive } from 'vue'
  export default defineComponent({
    components: { Menu },
    setup() {
      const menuState = reactive<MenuState>({
        menuMode: 'vertical',
        menuCollapse: false
      })
      return {
        ...toRefs(menuState)
      }
    }
  })
</script>

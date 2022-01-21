<template>
  <Menu :mode="menuMode"
        :collapse="menuCollapse"
        :unique-opened="true"
        :background-color="menuBgColor"
        :text-color="menuTextColor"
        :active-text-color="menuActiveTextColor">
  </Menu>
</template>

<script lang="ts">
  import { ElMenu as Menu } from 'element-plus'
  import type { MenuState } from './types'
  import MenuContent from './MenuContent.vue'
  import { defineComponent, toRefs, reactive } from 'vue'

  export default defineComponent({
    name: 'LayoutMenu',
    components: { Menu, MenuContent },
    setup() {
      const menuState = reactive<MenuState>({
        menuMode: 'vertical',
        menuCollapse: false,
        menuBgColor: '#263238',
        menuTextColor: '#fff',
        menuActiveTextColor: '#409eff'
      })
      return {
        ...toRefs(menuState)
      }
    }
  })
</script>

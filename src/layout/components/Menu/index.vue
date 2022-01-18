<template>
  <Menu :mode="menuMode"
        :collapse="menuCollapse">
  </Menu>
</template>

<script lang="ts">
  import { ElMenu as Menu } from 'element-plus'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    components: { Menu },
    setup() {
      const menuMode = ref('vertical')
      const menuCollapse = ref(false)
      return {
        menuMode,
        menuCollapse
      }
    }
  })
</script>
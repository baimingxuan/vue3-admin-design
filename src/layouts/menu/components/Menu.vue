<template>
  <Menu
    :subMenuOpenDelay="0.2"
  >
  </Menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu } from 'ant-design-vue'

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu
    },
  })
</script>
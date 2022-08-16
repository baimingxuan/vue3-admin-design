<template>
  <div class="layout_tabs"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Tabs as AntdTabs } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutTabs',
    components: { AntdTabs },

    setup() {
    }
  })
</script>

<style lang="less" scoped>

</style>
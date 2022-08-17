<template>
  <div :class="prefixCls"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Tabs as AntdTabs } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutTabs',
    components: { AntdTabs },

    setup() {
      const prefixCls = 'layout_tabs'

      return {
        prefixCls
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
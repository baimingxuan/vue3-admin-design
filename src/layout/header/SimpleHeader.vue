<template>
  <AntdHeader :class="prefixCls">
    <div :class="`${prefixCls}-main`">
      <div :class="`${prefixCls}-main-left`">
        <FoldTrigger />
        <Breadcrumb />
      </div>
      <div :class="`${prefixCls}-main-right`">
        <LayoutFeature />
      </div>
    </div>
    <LayoutTags />
  </AntdHeader>
</template>

<script lang="ts" >
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutTags from '../tags/index.vue'
  import LayoutFeature from '../feature/index.vue'
  import FoldTrigger from './components/FoldTrigger.vue'
  import Breadcrumb from './components/Breadcrumb.vue'
  
  export default defineComponent({
    name: 'LayoutSimpleHeader',
    components: { AntdHeader: Layout.Header, LayoutTags, LayoutFeature, FoldTrigger, Breadcrumb },

    setup() {
      const prefixCls = 'layout_simple-header'

      return {
        prefixCls
      }
    }
  })

</script>

<style lang="less" scoped>
  .layout_simple-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
    height: 80px;
    line-height: 80px;
    background: #fff;

    &-main {
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;

      &-left {
        display: flex;
        align-items: center;
      }

    }

  }
</style>
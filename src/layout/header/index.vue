<template>
  <AntdHeader :class="getHeaderStyle">
    <div :class="`${prefixCls}-left`">
      <LayoutTrigger :sider="false" />
    </div>

    <div :class="`${prefixCls}-main`">
      <LayoutMenu :isHorizontal="true" />
    </div>

    <div :class="`${prefixCls}-right`"></div>
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { useBaseSetting } from '@/hooks/setting/useBaseSetting' 

  import LayoutTrigger from '@/layout/trigger/index.vue'
  import LayoutMenu from '../menu/index.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: { AntdHeader: Layout.Header, LayoutTrigger, LayoutMenu },

    setup() {
      const prefixCls = 'layout_header'

      const { getAppMode } = useBaseSetting()

      const getHeaderStyle = computed(() => {
        const mode = unref(getAppMode)

        return [
          prefixCls,
          {
            [`${prefixCls}--${mode}`]: mode
          }
        ]
      })

      return {
        prefixCls,
        getHeaderStyle
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
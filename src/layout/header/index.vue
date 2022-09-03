<template>
  <AntdHeader :class="getHeaderStyle">
    <div :class="`${prefixCls}-left`">
      <AppLogo theme="light" />
      <LayoutTrigger :sider="false" />
    </div>

    <div :class="`${prefixCls}-menu`">
      <LayoutMenu :isHorizontal="true" />
    </div>

    <div :class="`${prefixCls}-right`"></div>

    <LayoutTags />
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { propTypes } from '@/utils/propTypes'
  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

  import { AppLogo } from '@/components/Application'
  import LayoutTrigger from '@/layout/trigger/index.vue'
  import LayoutMenu from '../menu/index.vue'
  import LayoutTags from '../tags/index.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: { AntdHeader: Layout.Header, LayoutTrigger, LayoutMenu, LayoutTags, AppLogo },
    props: { fixed: propTypes.bool },

    setup(props) {
      const prefixCls = 'layout_header'

      const { getAppMode } = useBaseSetting()

      const getHeaderStyle = computed(() => {
        const mode = unref(getAppMode)

        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
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
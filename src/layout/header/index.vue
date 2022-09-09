<template>
  <AntdHeader :class="getHeaderStyle">
    <div :class="`${prefixCls}-logo`">
      <AppLogo theme="light" />
    </div>

    <div :class="`${prefixCls}-main`">
      <div :class="`${prefixCls}-main-body`">
        <div :class="`${prefixCls}-main-body-menu`">
          <LayoutMenu :isHorizontal="true" :menuSplit="getMenuSplit" />
        </div>
        <LayoutFeature />
      </div>
      <LayoutTags />
    </div>
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { propTypes } from '@/utils/propTypes'
  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  import { AppLogo } from '@/components/Application'

  import LayoutMenu from '../menu/index.vue'
  import LayoutTags from '../tags/index.vue'
  import LayoutFeature from '../feature/index.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AntdHeader: Layout.Header,
      LayoutMenu,
      LayoutTags,
      LayoutFeature,
      AppLogo
    },
    props: { fixed: propTypes.bool },

    setup(props) {
      const prefixCls = 'layout_header'

      const { getAppMode } = useBaseSetting()
      const { getMenuSplit } = useMenuSetting()

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
        getHeaderStyle,
        getMenuSplit
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
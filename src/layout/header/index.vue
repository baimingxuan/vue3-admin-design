<template>
  <AntdHeader :class="getHeaderStyle">
    <div :class="`${prefixCls}-logo`">
      <AppLogo theme="light" />
    </div>

    <div :class="`${prefixCls}-main`">
      <div :class="`${prefixCls}-main-body`">
        <div :class="`${prefixCls}-main-body-menu`">
          <LayoutMenu :isHorizontal="true" />
        </div>
        <div :class="`${prefixCls}-main-body-feat`">
          <FullScreen />
          <LocalePicker />
          <GithubLink />
        </div>
      </div>
      <div :class="`${prefixCls}-main-tags`">
        <LayoutTags />
      </div>
    </div>
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { propTypes } from '@/utils/propTypes'
  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

  import { AppLogo } from '@/components/Application'

  import LayoutMenu from '../menu/index.vue'
  import LayoutTags from '../tags/index.vue'
  import FullScreen from './components/FullScreen.vue'
  import LocalePicker from './components/LocalePicker.vue'
  import GithubLink from './components/GithubLink.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AntdHeader: Layout.Header,
      LayoutMenu,
      LayoutTags,
      AppLogo,
      FullScreen,
      LocalePicker,
      GithubLink
    },
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
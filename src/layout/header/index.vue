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
        <LayoutFeature />
      </div>
      <LayoutTags v-if="getShowTags" />
    </div>
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
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

    setup() {
      const prefixCls = 'layout_header'

      const { getShowTags } = useHeaderSetting()
      const { getMenuTheme } = useMenuSetting()

      const getHeaderStyle = computed(() => {
        const mode = unref(getMenuTheme)

        return [
          prefixCls,
          mode
        ]
      })

      return {
        prefixCls,
        getHeaderStyle,
        getShowTags
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
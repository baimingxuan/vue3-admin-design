<template>
  <LayoutHeader :class="getHeaderStyle">
    <div :class="`${prefixCls}-wrap`">
      <div :class="`${prefixCls}-wrap-logo`">
        <AppLogo theme="light" />
      </div>

      <div :class="`${prefixCls}-wrap-main`">
        <div :class="`${prefixCls}-wrap-main-body`">
          <div :class="`${prefixCls}-wrap-main-body-menu`">
            <LayoutMenu :isHorizontal="true" />
          </div>
          <LayoutFeature />
        </div>
      </div>
    </div>
    <LayoutTags v-if="getShowTags" />
  </LayoutHeader>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { LayoutHeader } from 'ant-design-vue'

  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  import { AppLogo } from '@/components/Application'

  import LayoutMenu from '../menu'
  import LayoutTags from '../tags/index.vue'
  import LayoutFeature from '../feature'

  export default defineComponent({
    name: 'LayoutHeaders',
    components: {
      LayoutHeader,
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
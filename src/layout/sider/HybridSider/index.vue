<template>
  <div :class="[prefixCls, getMenuTheme]" :style="getWrapStyle" v-bind="getWrapEvents">
    <LayoutTrigger />
    <ScrollContainer>
      <ul :class="`${prefixCls}-main-menu`">
        <li
          v-for="item in mainMenuList"
          :key="item.path"
          :class="[`${prefixCls}-main-menu__item`, {[`${prefixCls}-main-menu__item--active`]: item.path === activePath}]"
        ></li>
      </ul>
    </ScrollContainer>
    <div></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref } from 'vue'
  import type { CSSProperties } from 'vue'
  import { AppMenu } from '@/router/types'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { SIDE_BAR_MIN_WIDTH, SIDE_BAR_SHOW_TITLE_MIN_WIDTH } from '@/enums/appEnum'

  import ScrollContainer from '@/components/Container/index.vue'
  import LayoutTrigger from '@/layout/trigger/index.vue'
  import LayoutMenu from '@/layout/menu/index.vue'
  import DragBar from './components/DragBar.vue'

  export default defineComponent({
    name: 'LayoutHybridSider',
    components: { ScrollContainer, LayoutTrigger, LayoutMenu, DragBar },

    setup() {
      const prefixCls = 'layout_hybrid-sider'

      let mainMenuList = ref<AppMenu[]>([])
      const activePath = ref('')

      const { getMenuTheme, getMenuFold } = useMenuSetting()

      const getHybridSiderWidth = computed(() => {
        return unref(getMenuFold) ? SIDE_BAR_MIN_WIDTH : SIDE_BAR_SHOW_TITLE_MIN_WIDTH
      })

      const getWrapStyle = computed((): CSSProperties => {
        const width = `${unref(getHybridSiderWidth)}`
        return getWrapCommonStyle(width)
      })

      const getWrapEvents = computed(() => {
        return {
          onMouseleave: () => {}
        }
      })

      function getWrapCommonStyle(width: string): CSSProperties {
        return {
          width,
          maxWidth: width,
          minWidth: width,
          flex: `0 0 ${width}`
        }
      }

      return {
        prefixCls,
        mainMenuList,
        activePath,
        getMenuTheme,
        getWrapStyle,
        getWrapEvents
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
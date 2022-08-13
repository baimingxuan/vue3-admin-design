<template>
  <div :class="[prefixCls, getMenuTheme]" :style="getWrapStyle" v-bind="getWrapEvents">
    <LayoutTrigger />
    <ScrollContainer>
      <ul :class="`${prefixCls}-main-menu`">
        <li
          v-for="item in mainMenuList"
          :key="item.path"
          v-bind="getMainMenuItemEvents(item)"
          :class="[
            `${prefixCls}-main-menu__item`,
            {
              [`${prefixCls}-main-menu__item--active`]: item.path === activePath
            }
          ]"
        >
          <SvgIcon
            :class="`${prefixCls}-main-menu__item-icon`"
            :name="item?.icon || item.meta?.icon"
            :size="getMenuFold ? 16 : 20"
          />
          <p :class="`${prefixCls}-main-menu__item-name`">
            {{ item?.name }}
          </p>
        </li>
      </ul>
    </ScrollContainer>

    <div :class="`${prefixCls}-sub-menu`" :style="getSubMenuStyle">
      <div v-show="openMenu" :class="[`${prefixCls}-sub-menu__title`, { show: openMenu }]">
        <span class="text">Vue-admin-design</span>
        <SvgIcon :size="16" />
      </div>
      <BasicMenu />
      <DragBar ref="dragBarRef" />
    </div>
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
  import BasicMenu from '@/layout/menu/src/BasicMenu/index.vue'
  import DragBar from './components/DragBar.vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  export default defineComponent({
    name: 'LayoutHybridSider',
    components: { ScrollContainer, LayoutTrigger, BasicMenu, DragBar, SvgIcon },

    setup() {
      const prefixCls = 'layout_hybrid-sider'

      let mainMenuList = ref<AppMenu[]>([])
      const activePath = ref('')
      const openMenu = ref(false)

      const { getMenuTheme, getMenuFold, getMenuWidth } = useMenuSetting()

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

      const getSubMenuStyle = computed((): CSSProperties => {
        return {
          width: unref(openMenu) ? `${unref(getMenuWidth)}` : 0,
          left: `${unref(getHybridSiderWidth)}`
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

      function getMainMenuItemEvents(item: AppMenu) {
        return {
          onClick: () => handleMainMenuClick(item.path)
        }
      }

      async function handleMainMenuClick(path: string) {
        console.log(path)
      }

      return {
        prefixCls,
        mainMenuList,
        activePath,
        getMenuTheme,
        getWrapStyle,
        getWrapEvents,
        getSubMenuStyle,
        getMenuFold,
        openMenu,
        getMainMenuItemEvents
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
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
        <SvgIcon :name="getMenuFixed ? 'pushpin-fill' : 'pushpin-line'" :size="16" @click="handleFixedMenu" />
      </div>
      <BasicMenu />
      <DragBar ref="dragBarRef" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref, onMounted } from 'vue'
  import type { CSSProperties } from 'vue'
  import { AppMenu } from '@/router/types'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { getShallowMenus, getChildrenMenus } from '@/router/menus'
  import { useGo } from '@/hooks/web/usePage'
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
      const childrenMenus = ref<AppMenu[]>([])
      const openMenu = ref(false)

      const go = useGo()

      const { getMenuTheme, getMenuFold, getMenuWidth, getMenuFixed, setMenuSetting } = useMenuSetting()

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

      onMounted(async () => {
        mainMenuList.value = await getShallowMenus()
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

      function handleFixedMenu() {
        setMenuSetting({
          menuFixed: !unref(false)
        })
      }

      async function handleMainMenuClick(path: string) {
        const children = await getChildrenMenus(path)
        if (unref(activePath) === path) {
          if (!unref(openMenu)) {
            openMenu.value = true
          } else {
            closeMenu()
          }
          if (!unref(openMenu)) {
            setActive()
          }
        } else {
          openMenu.value = true
          activePath.value = path
        }

        if (!children || children.length === 0) {
          go(path)
          childrenMenus.value = []
          closeMenu()
          return
        }
        childrenMenus.value = children
      }

      function setActive() {}

      // Close menu
      function closeMenu() {}

      return {
        prefixCls,
        mainMenuList,
        activePath,
        getMenuTheme,
        getMenuFixed,
        getWrapStyle,
        getWrapEvents,
        getSubMenuStyle,
        getMenuFold,
        openMenu,
        getMainMenuItemEvents,
        handleFixedMenu
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
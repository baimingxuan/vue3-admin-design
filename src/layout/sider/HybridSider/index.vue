<template>
  <div :class="[prefixCls, getMenuTheme, { open: openMenu, mini: getMenuFold }]" :style="getWrapStyle" v-bind="getWrapEvents">
    <LayoutTrigger :class="`${prefixCls}-trigger`" />
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
        <span class="text">vue-admin-design</span>
        <SvgIcon class="pushpin" :name="getMenuFixed ? 'pushpin-fill' : 'pushpin-line'" :size="16" @click="handleFixedMenu" />
      </div>
      <BasicMenu v-show="openMenu" :items="childrenMenus" :theme="getMenuTheme" :hybridSider="true" @menuClick="handleMenuClick" />
      <DragBar ref="dragBarRef" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref, onMounted } from 'vue'
  import type { CSSProperties } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import { AppMenu } from '@/router/types'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { getShallowMenus, getChildrenMenus, getCurrentParentPath } from '@/router/menus'
  import { useGo } from '@/hooks/web/usePage'
  import { SIDE_BAR_MIN_WIDTH, SIDE_BAR_SHOW_TITLE_MIN_WIDTH } from '@/enums/appEnum'

  import ScrollContainer from '@/components/Container/index.vue'
  import LayoutTrigger from '@/layout/trigger/index.vue'
  import BasicMenu from '@/layout/menu/src/index.vue'
  import DragBar from '../components/DragBar.vue'
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
      const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

      const go = useGo()

      const { getMenuTheme, getMenuFold, getMenuWidth, getMenuFixed, getIsHybridMenu, setMenuSetting } = useMenuSetting()

      const getHybridSiderWidth = computed(() => {
        return unref(getMenuFold) ? SIDE_BAR_MIN_WIDTH : SIDE_BAR_SHOW_TITLE_MIN_WIDTH
      })

      const getWrapStyle = computed((): CSSProperties => {
        const width = `${unref(getHybridSiderWidth)}`
        return getWrapCommonStyle(width)
      })

      const getWrapEvents = computed(() => {
        return !unref(getMenuFixed)
          ? {
              onMouseleave: () => {
                setActive(true)
                closeMenu()
              }
            }
          : {}
      })

      const getSubMenuStyle = computed((): CSSProperties => {
        return {
          width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
          left: `${unref(getHybridSiderWidth)}px`
        }
      })

      const getIsFixed = computed(() => {
        const hybridSiderHasChildren = unref(childrenMenus).length > 0
        const isFixed = unref(getMenuFixed) && hybridSiderHasChildren
        if (isFixed) {
          openMenu.value = true
        }
        return isFixed
      })

      onMounted(async () => {
        mainMenuList.value = await getShallowMenus()
      })

      function getWrapCommonStyle(width: string): CSSProperties {
        return {
          width: width + 'px',
          maxWidth: width + 'px',
          minWidth: width + 'px',
          flex: `0 0 ${width}px`
        }
      }

      function getMainMenuItemEvents(item: AppMenu) {
        return {
          onClick: () => handleMainMenuClick(item.path)
        }
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
        console.log('children', children)
        childrenMenus.value = children
      }

      // Set the currently active main menu and sub menu
      async function setActive(setChildren = false) {
        const path = currentRoute.value?.path
        if (!path) return
        activePath.value = await getCurrentParentPath(path)
        if (unref(getIsHybridMenu)) {
          const activeMenu = unref(mainMenuList).find(item => item.path === unref(activePath))
          if (activeMenu?.path) {
            const children = await getChildrenMenus(activeMenu?.path)
            if (setChildren) {
              childrenMenus.value = children

              if (unref(getMenuFixed)) {
                openMenu.value = children.length > 0
              }
            }

            if (children.length === 0) {
              childrenMenus.value = []
            }
          }
        }
      }

      function handleMenuClick(path: string) {
        go(path)
      }

      function handleFixedMenu() {
        setMenuSetting({
          menuFixed: !unref(getIsFixed)
        })
      }

      // Close menu
      function closeMenu() {
        if (!unref(getIsFixed)) {
          openMenu.value = false
        }
      }

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
        childrenMenus,
        getMainMenuItemEvents,
        handleFixedMenu,
        handleMenuClick
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
import type { AppMenu } from '@/router/types'
import type { CSSProperties } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { defineComponent, computed, ref, unref, onMounted, nextTick } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { getShallowMenus, getChildrenMenus, getCurrentParentPath } from '@/router/menus'
import { useGo } from '@/hooks/web/usePage'
import { MenuFoldBtnEnum } from '@/enums/menuEnum'
import { SIDE_BAR_MIN_WIDTH, SIDE_BAR_SHOW_TITLE_MIN_WIDTH, ThemeEnum } from '@/enums/appEnum'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { AppLogo } from '@/components/Application'
import ScrollContainer from '@/components/Container'
import SiderTrigger from '../components/SiderTrigger'
import { Menu } from '@/components/Menu'
import DragBar from '../components/DragBar'
import SvgIcon from '@/components/SvgIcon'
import logoName from '@/assets/images/name.png'
import './index.less'

export default defineComponent({
  name: 'LayoutHybridSider',
  components: { ScrollContainer, SiderTrigger, Menu, DragBar, SvgIcon, AppLogo },

  setup() {
    const mainMenuList = ref<AppMenu[]>([])
    const activePath = ref('')
    const childrenMenus = ref<AppMenu[]>([])
    const openMenu = ref(false)
    const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

    const go = useGo()

    const { isDarkMode } = useDarkModeSetting()
    const {
      getMenuTheme,
      getMenuFold,
      getMenuWidth,
      getMenuFoldBtn,
      getMenuFixed,
      getIsHybridMenu,
      getReallWidth,
      setMenuSetting
    } = useMenuSetting()

    const getSiderMode = computed(() => {
      return unref(isDarkMode) ? '' : unref(getMenuTheme)
    })

    const getCurrentMenuTheme = computed(() => {
      return unref(isDarkMode) ? ThemeEnum.LIGHT : unref(getMenuTheme)
    })

    const getHybridSiderWidth = computed(() => {
      return unref(getMenuFold) ? SIDE_BAR_MIN_WIDTH : SIDE_BAR_SHOW_TITLE_MIN_WIDTH
    })

    const getDomStyle = computed((): CSSProperties => {
      const fixedWidth = unref(getMenuFixed) && unref(openMenu) ? unref(getReallWidth) : 0
      const width = `${unref(getHybridSiderWidth) + fixedWidth!}`
      return getwrapClsommonStyle(width)
    })

    const getWrapStyle = computed((): CSSProperties => {
      const width = `${unref(getHybridSiderWidth)}`
      return getwrapClsommonStyle(width)
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

    listenerRouteChange(route => {
      currentRoute.value = route

      nextTick(() => {
        setActive(true)
      })
    })

    function getwrapClsommonStyle(width: string): CSSProperties {
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

    return () => (
      <>
        <div class='layout-hybrid-sider-dom' style={unref(getDomStyle)} />
        <div
          {...unref(getWrapEvents)}
          class={['layout-hybrid-sider', unref(getSiderMode), { open: unref(openMenu), mini: unref(getMenuFold) }]}
          style={unref(getWrapStyle)}
        >
          <AppLogo style={{ marginLeft: !unref(getMenuFold) ? '10px' : '' }} />
          {unref(getMenuFoldBtn) === MenuFoldBtnEnum.SIDER && <SiderTrigger class='trigger-btn' />}
          <ScrollContainer>
            <div class='main-menu'>
              {unref(mainMenuList).map(item => (
                <div
                  key={item.path}
                  class={['main-menu__item', { 'is-active': unref(activePath) === item.path }]}
                  {...getMainMenuItemEvents(item)}
                >
                  <SvgIcon class='main-menu__item-icon' name={item?.icon} size={20} />
                  <p class='main-menu__item-name'>{item?.name}</p>
                </div>
              ))}
            </div>
          </ScrollContainer>
          <div class='sub-menu' style={unref(getSubMenuStyle)}>
            <div v-show={unref(openMenu)} class={['sub-menu__title', { show: unref(openMenu) }]}>
              <img src={logoName} alt='name' />
              <SvgIcon
                class='pushpin'
                name={unref(getMenuFixed) ? 'pushpin-fill' : 'pushpin-line'}
                size={16}
                onClick={handleFixedMenu}
              />
            </div>
            <div v-show={unref(openMenu)} class='sub-menu__content'>
              <Menu
                items={unref(childrenMenus)}
                theme={unref(getCurrentMenuTheme)}
                hybridSider={true}
                onMenuClick={handleMenuClick}
              />
            </div>
            <DragBar />
          </div>
        </div>
      </>
    )
  }
})

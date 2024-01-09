import type { PropType } from 'vue'
import { defineComponent, computed, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import type { MenuModeEnum } from '@/enums/menuEnum'
import { Menu } from '@/components/Menu'
import { useGo } from '@/hooks/web/usePage'
import { useLayoutMenu } from './useLayoutMenu'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import ScrollContainer from '@/components/Container/index.vue'

export default defineComponent({
  name: 'LayoutMenu',
  props: {
    menuMode: {
      type: String as PropType<MenuModeEnum>
    },

    menuTheme: propTypes.oneOf(['light', 'dark']),

    isSplitedMenu: propTypes.bool.def(false),

    isHorizontal: propTypes.bool
  },
  components: { Menu },

  setup(props) {
    const go = useGo()
    const { getMenuSplit } = useMenuSetting()

    const { menusRef, childrenMenus } = useLayoutMenu(unref(getMenuSplit))

    const { getMenuMode, getMenuTheme, getMenuType, getIsHorizontal, getIsSideMenu, getMenuFoldShowTitle } =
      useMenuSetting()

    const getCommonProps = computed(() => {
      const menus = props.isSplitedMenu ? unref(childrenMenus) : unref(menusRef)

      return {
        menus,
        items: menus,
        menuFoldShowTitle: unref(getMenuFoldShowTitle),
        onMenuClick: handleMenuClick
      }
    })

    const getCurrMenuMode = computed(() => props.menuMode || unref(getMenuMode))

    const getCurrMenuTheme = computed(() => props.menuTheme || unref(getMenuTheme))

    const getUseScroll = computed(() => {
      return !unref(getIsHorizontal) && unref(getIsSideMenu)
    })

    function handleMenuClick(path: string) {
      go(path)
    }

    function renderMenu() {
      const { menus, ...menuProps } = unref(getCommonProps)

      return (
        <Menu
          {...(menuProps as any)}
          items={menus}
          type={unref(getMenuType)}
          mode={unref(getCurrMenuMode)}
          theme={unref(getCurrMenuTheme)}
          isHorizontal={props.isHorizontal}
        />
      )
    }

    return () => <>{unref(getUseScroll) ? <ScrollContainer>{() => renderMenu()}</ScrollContainer> : renderMenu()}</>
  }
})

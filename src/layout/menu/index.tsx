import type { PropType } from 'vue'
import type { AppMenu } from '@/router/types'
import { defineComponent, computed, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import type { MenuModeEnum } from '@/enums/menuEnum'
import { Menu } from '@/components/Menu'
import { useGo } from '@/hooks/web/usePage'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import ScrollContainer from '@/components/Container'

export default defineComponent({
  name: 'LayoutMenu',
  props: {
    menus: {
      type: Array as PropType<AppMenu[]>,
      default: () => []
    },

    menuMode: {
      type: String as PropType<MenuModeEnum>
    },

    menuTheme: propTypes.oneOf(['light', 'dark']),

    isHorizontal: propTypes.bool
  },
  components: { Menu },

  setup(props) {
    const go = useGo()

    const { getMenuMode, getMenuTheme, getMenuType, getIsHorizontal, getIsSideMenu, getMenuFoldShowTitle } =
      useMenuSetting()

    const getCurrMenuMode = computed(() => props.menuMode || unref(getMenuMode))

    const getCurrMenuTheme = computed(() => props.menuTheme || unref(getMenuTheme))

    const getUseScroll = computed(() => {
      return !unref(getIsHorizontal) && unref(getIsSideMenu)
    })

    function handleMenuClick(path: string) {
      go(path)
    }

    function renderMenu() {
      return (
        <Menu
          items={props.menus}
          type={unref(getMenuType)}
          mode={unref(getCurrMenuMode)}
          theme={unref(getCurrMenuTheme)}
          menuFoldShowTitle={unref(getMenuFoldShowTitle)}
          isHorizontal={props.isHorizontal}
          onMenuClick={handleMenuClick}
        />
      )
    }

    return () => <>{unref(getUseScroll) ? <ScrollContainer>{() => renderMenu()}</ScrollContainer> : renderMenu()}</>
  }
})

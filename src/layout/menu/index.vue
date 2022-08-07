<script lang="tsx">
  import type { PropType } from 'vue'
  import { defineComponent, computed, unref } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { BasicMenu } from './src/index'
  import { useGo } from '@/hooks/web/usePage'
  import { useSplitMenu } from './useLayoutMenu'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      menuMode: {
        type: String as PropType<MenuModeEnum>,
        default: ''
      },

      menuTheme: propTypes.oneOf(['light', 'dark']),

      isHorizontal: propTypes.bool
    },
    components: { BasicMenu },

    setup(props) {
      const go = useGo()

      const { menusRef } = useSplitMenu()

      const { getMenuMode, getMenuTheme, getMenuType } = useMenuSetting()

      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        
        return {
          menus,
          items: menus,
          onMenuClick: handleMenuClick
        }
      })

      const getCurrMenuMode = computed(() => props.menuMode || unref(getMenuMode))

      const getCurrMenuTheme = computed(() => props.menuTheme || unref(getMenuTheme))

      function handleMenuClick(path: string) {
        go(path)
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)

        return (
          <BasicMenu
            { ...(menuProps as any) }
            items={menus}
            type={unref(getMenuType)}
            mode={unref(getCurrMenuMode)}
            theme={getCurrMenuTheme}
            isHorizontal={props.isHorizontal}
          />
        )
      }

      return () => (
        <>{renderMenu()}</>
      )
    }
  })
</script>
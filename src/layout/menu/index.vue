<script lang="tsx">
  import { defineComponent, computed, unref } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { Menu } from './src/index'
  import { useGo } from '@/hooks/web/usePage'
  import { useSplitMenu } from './useLayoutMenu'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      menuTheme: propTypes.oneOf(['light', 'dark']),
      menuMode: {
        type: String,
        default: ''
      },
      isHorizontal: propTypes.bool
    },
    components: { Menu },

    setup() {
      const go = useGo()

      const { menusRef } = useSplitMenu()

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          items: menus,
          onMenuClick: handleMenuClick
        }
      })

      function handleMenuClick(path: string) {
        go(path)
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)

        return (
          <Menu
            { ...(menuProps as any) }
            items={menus}
          />
        )
      }

      return () => (
        <>{renderMenu()}</>
      )
    }
  })
</script>
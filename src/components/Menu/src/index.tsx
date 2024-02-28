import type { MenuState } from './types'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { defineComponent, ref, unref, toRefs, reactive, computed, watch } from 'vue'
import { Menu } from 'ant-design-vue'
import SubMenuItem from './components/SubMenuItem'
import { isFunction } from '@/utils/is'
import { menuProps } from './props'
import { useOpenKeys } from './useOpenKeys'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { MenuModeEnum } from '@/enums/menuEnum'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { getCurrentParentPath } from '@/router/menus'
import { getAllParentPath } from '@/router/helper/menuHelper'

export default defineComponent({
  name: 'BasicMenu',
  props: menuProps,
  emits: ['menuClick'],
  setup(props, { emit }) {
    const isClickGo = ref(false)
    const currentActiveMenu = ref('')
    const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

    const menuState = reactive<MenuState>({
      openKeys: [],

      selectedKeys: [],

      collapsedOpenKeys: []
    })

    const { items, mode, accordion } = toRefs(props)

    const { getMenuFold, getMenuSplit } = useMenuSetting()

    const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, mode as any, accordion)

    const getCollapsedOptions = computed(() => {
      const isInlineMenu = props.mode === MenuModeEnum.INLINE

      const collapsedOptions: { collapsed?: boolean } = {}

      if (isInlineMenu) {
        collapsedOptions.collapsed = props.hybridSider ? false : unref(getMenuFold)
      }

      return collapsedOptions
    })

    listenerRouteChange(route => {
      if (route.name === 'Redirect') return
      currentRoute.value = route

      handleMenuChange(route)

      currentActiveMenu.value = route.meta?.currentActiveMenu as string

      if (unref(currentActiveMenu)) {
        menuState.selectedKeys = [unref(currentActiveMenu)]
        setOpenKeys(unref(currentActiveMenu))
      }
    })

    props.hybridSider &&
      watch(
        () => props.items,
        () => {
          handleMenuChange()
        }
      )

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false
        return
      }

      const path = (route || unref(currentRoute))?.path

      setOpenKeys(path as string)

      if (unref(currentActiveMenu)) return
      if (props.isHorizontal && unref(getMenuSplit)) {
        const parentPath = await getCurrentParentPath(path as string)
        menuState.selectedKeys = [parentPath]
      } else {
        const parentPaths = getAllParentPath(props.items, path as string)
        menuState.selectedKeys = parentPaths
      }
    }

    async function handleMenuClick(event: any) {
      const { key } = event as { key: string }
      const { beforeClickFn } = props
      if (beforeClickFn && isFunction(beforeClickFn)) {
        const flag = await beforeClickFn(key)
        if (!flag) return
      }
      emit('menuClick', key)

      isClickGo.value = true
      menuState.selectedKeys = [key]
    }

    return () => (
      <Menu
        {...unref(getCollapsedOptions)}
        mode={props.mode}
        theme={props.theme}
        openKeys={unref(getOpenKeys)}
        selectedKeys={menuState.selectedKeys}
        inlineIndent={16}
        subMenuOpenDelay={0.2}
        onOpenChange={handleOpenChange}
        onClick={handleMenuClick}
      >
        {props.items.map(item => (
          <SubMenuItem
            item={item}
            key={item.path}
            theme={props.theme}
            collapsed={unref(getMenuFold)}
            showTitle={props.menuFoldShowTitle}
            isHorizontal={props.isHorizontal}
          />
        ))}
      </Menu>
    )
  }
})

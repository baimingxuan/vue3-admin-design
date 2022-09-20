<template>
  <AntdMenu
    :mode="mode"
    :theme="theme"
    :openKeys="getOpenKeys"
    :selectedKeys="selectedKeys"
    :inlineIndent="20"
    :subMenuOpenDelay="0.2"
    v-bind="getInlineCollapsedOptions"
    @openChange="handleOpenChange"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <SubMenuItem
        :item="item"
        :theme="theme"
        :collapsed="getMenuFold"
        :showTitle="menuFoldShowTitle"
        :isHorizontal="isHorizontal"
      />
    </template>
  </AntdMenu>
</template>

<script lang="ts">
  import type { MenuState } from './types'

  import { defineComponent, ref, toRefs, reactive, computed, unref, watch } from 'vue'
  import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
  import { Menu as AntdMenu } from 'ant-design-vue'
  
  import SubMenuItem from './components/SubMenuItem.vue'
  import { isFunction } from '@/utils/is'
  import { menuProps } from './props'
  import { useOpenKeys } from './useOpenKeys'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { getCurrentParentPath } from '@/router/menus'
  import { getAllParentPath } from '@/router/helper/menuHelper'

  export default defineComponent({
    name: 'Menu',
    components: {
      AntdMenu,
      SubMenuItem
    },
    props: menuProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false)
      const currentActiveMenu = ref('')

      const menuState = reactive<MenuState>({
        openKeys: [],

        selectedKeys: [],

        collapsedOpenKeys: []
      })

      const { items, mode, accordion } = toRefs(props)

      const { getMenuFold, getMenuSplit } = useMenuSetting()

      const { currentRoute } = useRouter()

      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion
      )

      // const getIsTopMenu = computed(() => {
      //   const { type, mode, isHorizontal } = props

      //   return (
      //     (type === MenuTypeEnum.HEADER_MENU && mode === MenuModeEnum.HORIZONTAL) ||
      //     (isHorizontal && unref(getMenuSplit))
      //   )
      // })

      const getInlineCollapsedOptions = computed(() => {
        const isInlineMenu = props.mode === MenuModeEnum.INLINE

        const inlineCollapsedOptions: { inlineCollapsed?: boolean } = {}

        if (isInlineMenu) {
          inlineCollapsedOptions.inlineCollapsed = props.hybridSider ? false : unref(getMenuFold)
        }

        return inlineCollapsedOptions
      })

      listenerRouteChange(route => {
        if (route.name === 'Redirect') return

        handleMenuChange(route)

        currentActiveMenu.value = route.meta?.currentActiveMenu as string

        if (unref(currentActiveMenu)) {
          menuState.selectedKeys = [unref(currentActiveMenu)]
          setOpenKeys(unref(currentActiveMenu))
        }
      })

      !props.hybridSider &&
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
        const path =
          (route || unref(currentRoute)).meta?.currentActiveMenu ||
          (route || unref(currentRoute)).path
        setOpenKeys(path as string)
        if (unref(currentActiveMenu)) return
        if (props.isHorizontal && unref(getMenuSplit)) {
          const parentPath = await getCurrentParentPath(path as string)
          menuState.selectedKeys = [parentPath]
        } else {
          const parentPaths = await getAllParentPath(props.items, path as string)
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

      return {
        handleOpenChange,
        handleMenuClick,
        getOpenKeys,
        ...toRefs(menuState),
        getMenuFold,
        getInlineCollapsedOptions
      }
    }
  })
</script>
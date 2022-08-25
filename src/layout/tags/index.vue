<template>
  <div :class="prefixCls">
    <AntdButton :class="`${prefixCls}__btn`" @click="handleMove(240)">
      <template #icon>
        <LeftOutlined />
      </template>
    </AntdButton>
    <div :class="`${prefixCls}__main`">
      <div :class="`${prefixCls}__main-body`">
        <TransitionGroup>
          <template
            v-for="item in getTagsList"
            :key="item.query ? item.fullPath : item.path"
          >
            <TagItem
              :name="item.meta.title"
              :active="activeKeyRef === item.path"
              :fixed="item.meta?.affix"
              @click="handleClickTag(item.path)"
              @closeTag="handleCloseTag(item.path)"
            />
          </template>
        </TransitionGroup>
      </div>
    </div>
    <AntdButton :class="`${prefixCls}__btn`" @click="handleMove(-240)">
      <template #icon>
        <RightOutlined />
      </template>
    </AntdButton>
    <AntdButton :class="[`${prefixCls}__btn`, `${prefixCls}__btn-space`]">
      <template #icon>
        <RedoOutlined />
      </template>
    </AntdButton>
    <AntdDropdown placement="bottomRight">
      <AntdButton :class="[`${prefixCls}__btn`, `${prefixCls}__btn-space`]">
        <template #icon>
          <CloseOutlined />
        </template>
      </AntdButton>
      <template #overlay>
        <AntdMenu>
          <AntdMenuItem>关闭左侧</AntdMenuItem>
          <AntdMenuItem>关闭右侧</AntdMenuItem>
          <AntdMenuItem>关闭其它</AntdMenuItem>
          <AntdMenuItem>关闭所有</AntdMenuItem>
        </AntdMenu>
      </template>
    </AntdDropdown>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { Tabs as AntdTabs, Button as AntdButton, Dropdown as AntdDropdown, Menu as AntdMenu } from 'ant-design-vue'
  import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons-vue'

  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { useTagStore } from '@/stores/modules/tags'
  import { useGo } from '@/hooks/web/usePage'
  import TagItem from './components/TagItem.vue'

  export default defineComponent({
    name: 'LayoutTags',
    components: {
      AntdTabs, AntdButton, TagItem, AntdDropdown, AntdMenu, AntdMenuItem: AntdMenu.Item,
      LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined
    },

    setup() {
      const prefixCls = 'layout_tags'

      const activeKeyRef = ref('')
      const router = useRouter()
      const tagStore = useTagStore()
      const go = useGo()

      const getTagsList = computed(() => {
        return tagStore.getVisitedTags.filter(item => !item.meta?.hideTag)
      })

      listenerRouteChange(route => {
        // const { name } = route
        if (!route) return

        const { path, fullPath, meta = {} } = route
        const { currentActiveMenu, hideTag } = meta as RouteMeta
        const isHide = !hideTag ? null :currentActiveMenu
        const currPath = isHide || fullPath || path
        if (activeKeyRef.value !== currPath) {
          activeKeyRef.value = currPath as string
        }

        if (isHide) {
          const findParentRoute = router.getRoutes().find(item => item.path === currentActiveMenu)

          findParentRoute && tagStore.addVisitedTags(findParentRoute as unknown as RouteLocationNormalized)
        } else {
          tagStore.addVisitedTags(unref(route))
        }
      })

      function handleClickTag(activeKey: string) {
        activeKeyRef.value = activeKey
        go(activeKey, false)
      }

      function handleCloseTag(targetKey: string) {
        tagStore.closeTagByKey(targetKey, router)
      }

      function handleMove(offset: number): void {
        console.log(offset)
      }

      return {
        prefixCls,
        getTagsList,
        activeKeyRef,
        handleClickTag,
        handleCloseTag,
        handleMove
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
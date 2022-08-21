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
          <template v-for="item in getTagsList" :key="item.query ? item.fullPath : item.path">
            <TagItem />
          </template>
        </TransitionGroup>
      </div>
    </div>
    <AntdButton :class="`${prefixCls}__btn`" @click="handleMove(-240)">
      <template #icon>
        <RightOutlined />
      </template>
    </AntdButton>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { Tabs as AntdTabs, Button as AntdButton } from 'ant-design-vue'
  import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { useTagsStore } from '@/stores/modules/tags'
  import TagItem from './components/TagItem.vue'

  export default defineComponent({
    name: 'LayoutTabs',
    components: { AntdTabs, AntdButton, TagItem, LeftOutlined, RightOutlined },

    setup() {
      const prefixCls = 'layout_tabs'

      const activeKeyRef = ref('')
      const router = useRouter()
      const tagsStore = useTagsStore()

      const getTagsList = computed(() => {
        return tagsStore.getVisitedTags.filter(item => !item.meta?.hideTag)
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

          findParentRoute && tagsStore.addVisitedTags(findParentRoute as unknown as RouteLocationNormalized)
        } else {
          tagsStore.addVisitedTags(unref(route))
        }
      })

      function handleMove(offset: number): void {
        console.log(offset)
      }

      return {
        prefixCls,
        getTagsList,
        handleMove
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
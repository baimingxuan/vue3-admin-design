<template>
  <div :class="prefixCls">
    <AntdButton :class="`${prefixCls}__btn`" size="small" @click="handleMove(240)">
      <template #icon>
        <LeftOutlined />
      </template>
    </AntdButton>
    <div
      ref="tagsMain"
      :class="`${prefixCls}__main`"
      @DOMMouseScroll="handleScroll"
      @mousewheel="handleScroll"
    >
      <div
        ref="tagsMainBody"
        :class="`${prefixCls}__main-body`"
        :style="getBodyStyle"
      >
        <TransitionGroup>
          <span
            v-for="item in getTagsList"
            :key="item.path"
            ref="tagRef"
          >
            <TagItem
              :name="(item.meta.title as string)"
              :active="activeKeyRef === item.path"
              :fixed="(item.meta?.affix as boolean)"
              @click="handleClickTag(item.path)"
              @closeTag="handleCloseTag(item.path)"
            />
          </span>
        </TransitionGroup>
      </div>
    </div>
    <AntdButton :class="`${prefixCls}__btn`" size="small" @click="handleMove(-240)">
      <template #icon>
        <RightOutlined />
      </template>
    </AntdButton>
    <AntdButton :class="[`${prefixCls}__btn`, `${prefixCls}__btn-space`]" size="small" @click="handleReload">
      <template #icon>
        <RedoOutlined :spin="loading" />
      </template>
    </AntdButton>
    <AntdDropdown placement="bottomRight">
      <AntdButton :class="[`${prefixCls}__btn`, `${prefixCls}__btn-space`]" size="small">
        <template #icon>
          <CloseOutlined />
        </template>
      </AntdButton>
      <template #overlay>
        <AntdMenu>
          <AntdMenuItem @click="closeLeft">关闭左侧</AntdMenuItem>
          <AntdMenuItem @click="closeRight">关闭右侧</AntdMenuItem>
          <AntdMenuItem @click="closeOther">关闭其它</AntdMenuItem>
          <AntdMenuItem @click="closeAll">关闭所有</AntdMenuItem>
        </AntdMenu>
      </template>
    </AntdDropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, unref, nextTick, CSSProperties } from 'vue'
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { Tabs as AntdTabs, Button as AntdButton, Dropdown as AntdDropdown, Menu as AntdMenu } from 'ant-design-vue'
  import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons-vue'

  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { useTagStore } from '@/stores/modules/tags'
  import { useGo } from '@/hooks/web/usePage'
  import { useTags } from '@/hooks/web/useTags'
  import { Component } from '@/router/types'
  import TagItem from './components/TagItem.vue'

  export default defineComponent({
    name: 'LayoutTags',
    components: {
      AntdTabs, AntdButton, TagItem, AntdDropdown, AntdMenu, AntdMenuItem: AntdMenu.Item,
      LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined
    },

    setup() {
      const prefixCls = 'layout_tags'

      const tagsMain = ref<ElRef>(null)
      const tagsMainBody = ref<ElRef>(null)
      const tagRef = ref<ElRef>(null)

      const tagsBodyLeft = ref(0)
      const loading = ref(false)
      const activeKeyRef = ref('')
      const router = useRouter()
      const tagStore = useTagStore()
      const go = useGo()
      const { refresh, closeLeft, closeRight, closeOther, closeAll } = useTags()

      const getTagsList = computed(() => {
        return tagStore.getVisitedTags.filter(item => !item.meta?.hideTag)
      })

      const getBodyStyle = computed((): CSSProperties => {
        return {
          left: `${unref(tagsBodyLeft)}px`
        }
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
        
        getActiveTag()
      })

      function handleClickTag(activeKey: string) {
        activeKeyRef.value = activeKey
        go(activeKey, false)
      }

      function getActiveTag() {
        nextTick(() => {
          const tagRefList = unref(tagRef) as unknown as Array<Component>
          const activeTag = tagRefList.find(item => item.__vnode.key === unref(activeKeyRef))!
          moveToActiveTag(activeTag)
        })
      }

      function handleCloseTag(targetKey: string) {
        tagStore.closeTagByKey(targetKey, router)
      }

      async function handleReload() {
        loading.value = true
        await refresh()
        setTimeout(() => {
          loading.value = false
          // Animation execution time
        }, 1000)
      }

      function moveToActiveTag(tag: any) {
        const mainBodyPadding = 4
        const mainWidth = unref(tagsMain)?.offsetWidth!
        const mainBodyWidth = unref(tagsMainBody)?.offsetWidth!
        if (mainBodyWidth < mainWidth) {
          tagsBodyLeft.value = 0
        } else if (tag?.offsetLeft! < -tagsBodyLeft.value) {
          // The active tag on the left side of the layout_tags-main
          tagsBodyLeft.value = -tag?.offsetLeft! + mainBodyPadding
        } else if (tag?.offsetLeft! > -tagsBodyLeft.value && tag?.offsetLeft! + tag?.offsetWidth! < -tagsBodyLeft.value + mainWidth) {
          // The active tag on the layout_tags-main
          tagsBodyLeft.value = Math.min(0, mainWidth - tag?.offsetWidth! - tag?.offsetLeft! - mainBodyPadding)
        } else {
          // The active tag on the right side of the layout_tags-main
          tagsBodyLeft.value = -(tag?.offsetLeft! - (mainWidth - mainBodyPadding - tag?.offsetWidth!))
        }
      }

      function handleMove(offset: number): void {
        const mainWidth = unref(tagsMain)?.offsetWidth!
        const mainBodyWidth = unref(tagsMainBody)?.offsetWidth!

        if (offset > 0) {
          tagsBodyLeft.value = Math.min(0, tagsBodyLeft.value + offset)
        } else {
          if (mainWidth < mainBodyWidth) {
            if (tagsBodyLeft.value >= -(mainBodyWidth - mainWidth)) {
              tagsBodyLeft.value = Math.max(tagsBodyLeft.value + offset, mainWidth - mainBodyWidth)
            }
          } else {
            tagsBodyLeft.value = 0
          }
        }

      }

      function handleScroll(e: any) {
        const type = e.type
        let distance: number = 0

        // Mousewheel non-Firefox mouse scroll event, DOMMouseScroll Firefox mouse scroll event
        if (type === 'mousewheel' || type === 'DOMMouseScroll') {
          /**
           * The value of the event.wheelDelta property in the mousewheel event: positive if the wheel is rolling up, negative otherwise; 
           * The returned values are all multiples of 120, that is, the magnitude = the returned value / 120 .
           * The value of the event.detail property in the DOMMouseScroll event: The value returned is the opposite of the value returned by event.wheelDelta;
           * The returned values are all multiples of 3, that is, the magnitude = the returned value / 3 .
          */
          distance = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
        }

        handleMove(distance)
      }

      return {
        prefixCls,
        tagsMain,
        tagsMainBody,
        tagRef,
        getTagsList,
        loading,
        activeKeyRef,
        getBodyStyle,
        handleClickTag,
        handleCloseTag,
        handleReload,
        closeLeft,
        closeRight,
        closeOther,
        closeAll,
        handleMove,
        handleScroll
      }
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'layout_tags';

  .@{prefix-cls} {
    z-index: 299;
    display: flex;
    justify-content: space-between;
    height: 24px;
    line-height: 24px;
    &__main {
      position: relative;
      width: calc(100% - 120px);
      height: 24px;
      overflow: hidden;
      &-body {
        position: absolute;
        padding: 0 4px;
        overflow: visible;
        white-space: nowrap;
        transition: left .5s ease;
      }
    }
    &__btn-space {
      margin-left: 4px;
    }
  }
</style>
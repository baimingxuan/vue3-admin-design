<template>
  <div class="tags-wrapper clear-fix">
    <Button type="text" class="btn-con">
      <i class="icon el-icon-arrow-left" />
    </Button>
    <div ref="tagsViews" class="tags-views" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="tagsCont" class="tags-cont" :style="{left: tagsContLeft + 'px'}">
        <transition-group>
          <router-link v-for="item in visitedViews" ref="tagsItem" :key="item.name" :to="{ path: item.path }">
            <TagItem :class="{active: isActive(item)}" :fixed="item.meta.fixed" @on-close="handleSelectedClose(item)">{{ item.title }}</TagItem>
          </router-link>
        </transition-group>
      </div>
    </div>
    <Button type="text" class="btn-con">
      <i class="icon el-icon-arrow-right" />
    </Button>
    <div class="btn-con btn-close">
      <Dropdown @command="handleCloseCtrl">
        <span class="el-dropdown-link">
          <i class="icon el-icon-circle-close" />
        </span>
        <template #dropdown>
          <DropdownMenu>
            <DropdownItem command="all">关闭所有</DropdownItem>
            <DropdownItem command="other">关闭其他</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { resolve } from 'path-browserify'
  import { useTagsStore } from '@/store/modules/tags'
  import TagItem from './TagItem.vue'
  import { ElButton as Button, ElDropdown as Dropdown, ElDropdownItem as DropdownItem, ElDropdownMenu as DropdownMenu } from 'element-plus'

  export default defineComponent({
    name: 'Tag',
    components: {
      TagItem,
      Button,
      Dropdown,
      DropdownItem,
      DropdownMenu
    },
    setup(props) {
      const route = useRoute()
      const tagsContLeft = ref(0)
      const store = useTagsStore()

      function isActive(tag) {
        return tag.path === route.path
      }

      function handlescroll() {}

      function handleSelectedClose() {}

      function handleCloseCtrl(type) {}

      return {
        tagsContLeft,
        visitedViews: store.visitedViews,
        isActive,
        handlescroll,
        handleSelectedClose,
        handleCloseCtrl
      }
    }
  })
</script>

<style lang="less">
.tags-wrapper {
  width: 100%;
  height: 40px;
  .icon {
    font-size: 18px;
  }
  .btn-con {
    float: left;
    width: 28px;
    height: 40px;
    padding: 8px 7px 8px 3px;
    border-top: solid 1px #f0f0f0;
    border-bottom: solid 1px #f0f0f0;
    box-sizing: border-box;
  }
  .btn-close {
    width: 40px;
    padding-top: 10px;
    padding-left: 11px;
    border-left: solid 1px #f0f0f0;
    cursor: pointer;
  }
  .tags-views {
    position: relative;
    float: left;
    width: calc(100% - 96px);
    height: 40px;
    background: #f0f0f0;
    box-shadow: inset 0 0 3px 2px #6464641a;
    overflow: hidden;
    .tags-cont {
      position: absolute;
      padding: 0 4px;
      overflow: visible;
      white-space: nowrap;
      transition: left .5s ease;
    }
  }
}
</style>

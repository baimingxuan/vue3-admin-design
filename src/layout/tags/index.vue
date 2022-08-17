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
          <template v-for="tag in getTabs" :key="tag">
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
  import { defineComponent, ref } from 'vue'
  import { Tabs as AntdTabs, Button as AntdButton } from 'ant-design-vue'
  import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

  import TagItem from './components/TagItem.vue'

  export default defineComponent({
    name: 'LayoutTabs',
    components: { AntdTabs, AntdButton, TagItem, LeftOutlined, RightOutlined },

    setup() {
      const prefixCls = 'layout_tabs'

      const getTabs = ref([])

      function handleMove(offset: number): void {

      }

      return {
        prefixCls,
        getTabs,
        handleMove
      }
    }
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
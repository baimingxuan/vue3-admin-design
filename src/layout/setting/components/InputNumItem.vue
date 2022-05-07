<template>
  <div class="compo_input-num-item">
    <span>{{ title }}</span>
    <AntdInputNum
      size="small"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { InputNumber as AntdInputNum } from 'ant-design-vue'

  export default defineComponent({
    name: 'InputNumItem',
    components: { AntdInputNum },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    setup(props) {}
  })
</script>

<style lang="less" scoped>
  .compo_input-num-item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-input-numbel {
      width: 120px;
    }
  }
</style>
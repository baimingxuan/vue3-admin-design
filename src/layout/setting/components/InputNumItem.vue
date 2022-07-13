<template>
  <div class="compo_input-num-item">
    <span>{{ title }}</span>
    <AntdInputNum
      class="input-number"
      size="small"
      v-bind="$attrs"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { InputNumber as AntdInputNum } from 'ant-design-vue'
  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  export default defineComponent({
    name: 'InputNumItem',
    components: { AntdInputNum },
    props: {
      title: {
        type: String,
        default: ''
      },
      event: {
        type: Number as PropType<HandlerEnum>
      }
    },
    setup(props) {
      function handleChange(value: number | string) {
        props.event && baseHandler(props.event, value)
      }

      return {
        handleChange
      }
    }
  })
</script>

<style lang="less" scoped>
  .compo_input-num-item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    .input-number {
      width: 120px;
    }
  }
</style>
<template>
  <div class="select-item">
    <span> {{ title }}</span>
    <AntdSelect
      size="small"
      v-bind="getBindValue"
      :options="options"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { PropType } from 'vue'

  import { Select as AntdSelect } from 'ant-design-vue'
  import type { SelectOptions } from '@/types'

  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  export default defineComponent({
    name: 'SelectItem',
    components: { AntdSelect },
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      def: {
        type: [String, Number] as PropType<string | number>
      },
      event: {
        type: Number as PropType<HandlerEnum>
      },
      options: {
        type: Array as PropType<SelectOptions>,
        default: () => []
      }
    },
    setup(props) {
      const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.def } : {}
      })

      function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e)
      }

      return {
        getBindValue,
        handleChange
      }
    }
  })
</script>

<style lang="less">
  .select-item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 120px
    }
  }
</style>
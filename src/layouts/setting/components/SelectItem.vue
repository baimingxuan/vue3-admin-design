<template>
  <div class="select-item">
    <span> {{ title }}</span>
    <AntdSelect
      size="small"
      v-bind="getValue"
      :options="options"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { PropType } from 'vue'

  import { Select as AntdSelect } from 'ant-design-vue'
  import type { SelectOptions } from '@/types'

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
      options: {
        type: Array as PropType<SelectOptions>,
        default: () => []
      }
    },
    setup(props) {
      const getValue = computed(() => {
        return props.def ? { value: props.def } : {}
      })

      return {
        getValue
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
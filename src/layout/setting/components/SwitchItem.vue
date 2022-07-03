<template>
  <div class="switch-item">
    <span>{{ title }}</span>
    <AntdSwitch
      v-bind="getBindValue"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { PropType } from 'vue'

  import { Switch as AntdSwitch } from 'ant-design-vue'

  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  export default defineComponent({
    name: 'SwitchItem',
    components: { AntdSwitch },
    props: {
      title: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      def: {
        type: Boolean
      },
      event: {
        type: Number as PropType<HandlerEnum>
      }
    },
    setup(props) {
      const getBindValue = computed(() => {
        return props.def ? { checked: props.def } : {}
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

<style lang="less" scoped>
  .switch-item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
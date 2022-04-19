<template>
  <div class="switch-item">
    <span>{{ title }}</span>
    <AntdSwitch
      v-bind="getChecked"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import { Switch as AntdSwitch } from 'ant-design-vue'

  export default defineComponent({
    name: 'SwitchItem',
    components: { AntdSwitch },
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const getChecked = computed(() => {
        return props.checked ? { checked: props.checked } : {}
      })

      return {
        getChecked
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
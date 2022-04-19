<template>
  <div class="select-item">
    <span> {{ title }}</span>
    <AntdSelect />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import { Select as AntdSelect } from 'ant-design-vue'

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
      options: {
        type: Array,
        default: () => []
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
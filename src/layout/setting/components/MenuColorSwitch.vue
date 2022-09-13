<template>
  <div class="compo_menu-color-switch">
    <AntdSwitch v-model:checked="checked" checked-children="白" un-checked-children="黑" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Switch as AntdSwitch } from 'ant-design-vue'

  const checked = ref(false)

</script>

<style lang="less" scoped>
  .compo_menu-color-switch {
    margin-top: 24px;
    margin-right: 24px;
  }
</style>
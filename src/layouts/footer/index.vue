<template>
  <AntdFooter>
    <div>Copyright &copy;2022 baimingxuan</div>
  </AntdFooter>
</template>

<script>
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutFooter',
    components: { AntdFooter: Layout.Footer }
  })
</script>

<style lang="less" scoped>

</style>

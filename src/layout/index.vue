<template>
  <Layout>
    <div class="side-menu">
      <Menu :items="$router.options.routes"></Menu>
    </div>
    <Setting></Setting>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { Layout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  import Menu from './menu/components/Menu.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: { Layout, Setting, Menu },
    mounted() {
      console.log(this.$router.options.routes)
    }
  })
</script>

<style lang="less">
.side-menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
}
</style>

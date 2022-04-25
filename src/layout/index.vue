<template>
  <div class="layout-wrapper">
    <aside>
      <!-- <Logo /> -->
      <Menu />
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './components/Menu/index.vue'
import Logo from './components/Logo/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Menu,
    Logo
  }
})
</script>

<style lang="less">
.layout-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  aside {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 260px;
    background-color: #263238;
  }
}
</style>

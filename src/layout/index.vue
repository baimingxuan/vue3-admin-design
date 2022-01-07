<template>
  <ElContainer>
    <ElAside width="200px">Aside</ElAside>
    <ElContainer>
      <ElHeader>Header</ElHeader>
      <ElMain>Main</ElMain>
      <ElFooter>Footer</ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAside, ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'

export default defineComponent({
  name: 'Layout',
  components: {
    ElAside,
    ElContainer,
    ElHeader,
    ElMain,
    ElFooter
  }
})
</script>

<style lang="less">

</style>

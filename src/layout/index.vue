<template>
  <div class="common-layout">
    <ElContainer>
      <ElAside width="200px">Aside</ElAside>
      <ElContainer>
        <ElHeader>Header</ElHeader>
        <ElMain>Main</ElMain>
        <ElFooter>Footer</ElFooter>
      </ElContainer>
    </ElContainer>
  </div>
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
.common-layout {
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>

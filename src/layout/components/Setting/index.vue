<template>
  <Button type="primary" @click="showDrawer">Open</Button>
  <Drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="right"
      @after-visible-change="afterVisibleChange"
  >
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Drawer, Button } from 'ant-design-vue'

export default defineComponent({
  name: 'Setting',
  components: { Drawer, Button },
  setup() {
    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
    };
  },
})
</script>


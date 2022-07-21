<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="'fade'" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LayoutPage',

    setup() {}
  })
</script>
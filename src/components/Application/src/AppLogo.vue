<template>
  <div @click="goHome">
    <img src="../../../assets/images/logo.png" alt="logo">
  </div>
</template>

<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage'

  const go = useGo()

  function goHome() {
    go('/')
  }
</script>
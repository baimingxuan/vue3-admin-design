<template>
  <div>
    <AntdBreadcrumb></AntdBreadcrumb>
  </div>
</template>

<script lang="ts">
  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  import type { AppMenu } from '@/router/types'

  import { defineComponent, ref } from 'vue'
  import { Breadcrumb as AntdBreadcrumb } from 'ant-design-vue'
</script>
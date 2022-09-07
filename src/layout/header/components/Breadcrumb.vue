<template>
  <div :class="['layout_breadcrumb', theme]">
    <AntdBreadcrumb>
      <AntdBreadcrumbItem
        v-for="route in routeMatcheds"
        :key="route.path"
      >
        <SvgIcon v-if="getIcon(route)" :name="getIcon(route)" />
        <span>{{ route.meta?.title }}</span>
      </AntdBreadcrumbItem>
    </AntdBreadcrumb>
  </div>
</template>

<script lang="ts" setup>
  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { ref, watchEffect } from 'vue'
  import { Breadcrumb as AntdBreadcrumb, BreadcrumbItem as AntdBreadcrumbItem } from 'ant-design-vue'

  import { propTypes } from '@/utils/propTypes'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  defineProps({
    theme: propTypes.oneOf(['dark', 'light'])
  })

  let routeMatcheds = ref<RouteLocationMatched[]>([])
  const { currentRoute } = useRouter()

  watchEffect(async () => {
    routeMatcheds.value = currentRoute.value.matched
  })

  function getIcon(route: any) {
    return route.icon || route.meta?.icon
  }
</script>

<style lang="less" scoped>
  .layout_breadcrumb {
    display: flex;
    padding: 0 16px;
    align-items: center;

    &:deep(.svg-icon) {
      margin-right: 8px;
    }
  }
</style>
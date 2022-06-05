<template>
  <div>
    <AntdBreadcrumb>
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.name || route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.name || route.meta.title }}
        </router-link>
      </template>
    </AntdBreadcrumb>
  </div>
</template>

<script lang="ts">
  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  import type { AppMenu } from '@/router/types'

  import { defineComponent, ref } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { Breadcrumb as AntdBreadcrumb } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { AntdBreadcrumb },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const routes = ref<RouteLocationMatched[]>([])

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault()
        const { children, redirect, meta } = route

        if (children?.length && !redirect) {
          e?.stopPropagation()
          return
        }
        if (meta?.carryParam) {
          return
        }

      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        return routes.indexOf(route) !== routes.length - 1
      }

      return {
        routes,
        hasRedirect,
        handleClick
      }
    }
  })
</script>
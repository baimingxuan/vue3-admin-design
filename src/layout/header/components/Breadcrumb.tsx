  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { defineComponent, ref, watchEffect } from 'vue'
  import { Breadcrumb as AntdBreadcrumb, BreadcrumbItem as AntdBreadcrumbItem } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  export default defineComponent({
    name: 'Breadcrumb',
    setup() {
      let routeMatcheds = ref<RouteLocationMatched[]>([])
      const { currentRoute } = useRouter()

      watchEffect(async () => {
        routeMatcheds.value = filterMatched(currentRoute.value.matched)
      })

      function filterMatched(list: RouteLocationMatched[]) {
        return list.filter(item => (!item.meta?.hideBreadcrumb && !item.meta?.hideMenu))
      }

      function getIcon(route: RouteLocationMatched) {
        return route.meta?.icon || ''
      }

      return () => (
        <div class='flex-center-v' style='padding: 0 16px;'>
          <AntdBreadcrumb>
            {
              routeMatcheds.value.map((route: RouteLocationMatched) => {
                return (
                  <AntdBreadcrumbItem>
                    {getIcon(route) ? <SvgIcon name={getIcon(route)} style='margin-right: 8px;' /> : ''}
                    <span>{ route.meta?.title }</span>
                  </AntdBreadcrumbItem>
                )
              })
            }
          </AntdBreadcrumb>
        </div>
      )
    }
  })
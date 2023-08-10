  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { defineComponent, ref, watchEffect } from 'vue'
  import { Breadcrumb } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon'

  export default defineComponent({
    name: 'LayoutBreadcrumb',
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
          <Breadcrumb>
            {
              routeMatcheds.value.map((route: RouteLocationMatched) => {
                return (
                  <Breadcrumb.Item>
                    {getIcon(route) ? <SvgIcon name={getIcon(route)} style='margin-right: 8px;' /> : ''}
                    <span>{ route.meta?.title }</span>
                  </Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
        </div>
      )
    }
  })
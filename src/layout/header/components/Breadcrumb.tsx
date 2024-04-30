import type { RouteLocationMatched } from 'vue-router'
import { useRouter } from 'vue-router'
import { defineComponent, ref, unref, watchEffect } from 'vue'
import { Flex, Space, Breadcrumb } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'LayoutBreadcrumb',
  setup() {
    const { t } = useI18n()
    const routeMatcheds = ref<RouteLocationMatched[]>([])
    const { currentRoute } = useRouter()

    watchEffect(async () => {
      if (unref(currentRoute).name === 'Redirect') return
      routeMatcheds.value = filterMatched(currentRoute.value.matched)
    })

    function filterMatched(list: RouteLocationMatched[]) {
      return list.filter(item => !item.meta?.hideMenu)
    }

    function getIcon(route: RouteLocationMatched) {
      return route.meta?.icon || ''
    }

    return () => (
      <Flex align='center'>
        <Breadcrumb>
          {unref(routeMatcheds).map((route: RouteLocationMatched) => {
            return (
              <Breadcrumb.Item>
                <Space>
                  {getIcon(route) && <SvgIcon name={getIcon(route)} />}
                  <span>{t(route.meta?.title)}</span>
                </Space>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </Flex>
    )
  }
})

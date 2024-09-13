import type { AppRoute } from '../../types'
// import { t } from '@/locales/helper'
import Layout from '@/layout'

// system module page
const ExcelRoute: AppRoute = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/account',
  meta: {
    title: '系统设置',
    icon: 'system',
    orderNo: 14
  },
  children: [
    {
      path: 'account',
      name: 'Account',
      component: () => import('@/views/system/account.vue'),
      meta: {
        title: '用户设置'
      }
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/system/role.vue'),
      meta: {
        title: '角色设置'
      }
    }
  ]
}

export default ExcelRoute

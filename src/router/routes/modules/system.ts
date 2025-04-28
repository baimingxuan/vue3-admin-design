import type { AppRoute } from '../../types'
// import { t } from '@/locales/helper'
import Layout from '@/layout'

// system module page
const ExcelRoute: AppRoute = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/user',
  meta: {
    title: '系统设置',
    icon: 'system',
    orderNo: 14
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user.vue'),
      meta: {
        title: '用户设置'
      }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/role.vue'),
      meta: {
        title: '角色设置'
      }
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/system/menu.vue'),
      meta: {
        title: '菜单设置'
      }
    },
    {
      path: 'dept',
      name: 'Dept',
      component: () => import('@/views/system/dept.vue'),
      meta: {
        title: '部门设置'
      }
    },
    {
      path: 'job',
      name: 'Job',
      component: () => import('@/views/system/job.vue'),
      meta: {
        title: '岗位设置'
      }
    },
    {
      path: 'dict',
      name: 'Dict',
      component: () => import('@/views/system/dict.vue'),
      meta: {
        title: '字典设置'
      }
    }
  ]
}

export default ExcelRoute

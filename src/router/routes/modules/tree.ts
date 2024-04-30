import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// tree module page
const TreeRoute: AppRoute = {
  path: '/tree',
  name: 'Tree',
  component: Layout,
  redirect: '/tree/org-tree',
  meta: {
    title: t('routes.tree.name'),
    icon: 'tree',
    orderNo: 9
  },
  children: [
    {
      path: 'org-tree',
      name: 'OrgTree',
      component: () => import('@/views/tree/org-tree/index'),
      meta: {
        title: t('routes.tree.org')
      }
    },
    {
      path: 'antd-tree',
      name: 'AntdTree',
      component: () => import('@/views/tree/antd-tree/index'),
      meta: {
        title: t('routes.tree.antdTree')
      }
    }
  ]
}

export default TreeRoute

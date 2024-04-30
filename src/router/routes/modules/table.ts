import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// table module page
const TableRoute: AppRoute = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/table-basic',
  meta: {
    title: t('routes.table.name'),
    icon: 'table',
    orderNo: 3
  },
  children: [
    {
      path: 'table-basic',
      name: 'TableBasic',
      component: () => import('@/views/table/table-basic'),
      meta: {
        title: t('routes.table.basic')
      }
    },
    {
      path: 'table-edit-row',
      name: 'TableEditRow',
      component: () => import('@/views/table/table-edit-row'),
      meta: {
        title: t('routes.table.editRow')
      }
    }
  ]
}

export default TableRoute

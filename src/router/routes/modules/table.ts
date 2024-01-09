import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// table module page
const TableRoute: AppRoute = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/table-basic',
  meta: {
    title: '表格',
    icon: 'table',
    orderNo: 3
  },
  children: [
    {
      path: 'table-basic',
      name: 'TableBasic',
      component: () => import('@/views/table/table-basic'),
      meta: {
        title: '基础表格'
      }
    },
    {
      path: 'table-edit-row',
      name: 'TableEditRow',
      component: () => import('@/views/table/table-edit-row'),
      meta: {
        title: '可编辑行表格'
      }
    }
  ]
}

export default TableRoute

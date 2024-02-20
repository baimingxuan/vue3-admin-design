import type { AppRoute } from '../../types'
import Layout from '@/layout'

// excel module page
const ExcelRoute: AppRoute = {
  path: '/excel',
  name: 'Excel',
  component: Layout,
  redirect: '/excel/export-excel',
  meta: {
    title: 'Excel',
    icon: 'excel',
    orderNo: 10
  },
  children: [
    {
      path: 'export-excel',
      name: 'ExportExcel',
      component: () => import('@/views/excel/export-excel'),
      meta: {
        title: '导出Excel'
      }
    },
    {
      path: 'import-excel',
      name: 'ImportExcel',
      component: () => import('@/views/excel/import-excel'),
      meta: {
        title: '导入Excel'
      }
    }
  ]
}

export default ExcelRoute

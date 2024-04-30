import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// excel module page
const ExcelRoute: AppRoute = {
  path: '/excel',
  name: 'Excel',
  component: Layout,
  redirect: '/excel/export-excel',
  meta: {
    title: t('routes.excel.name'),
    icon: 'excel',
    orderNo: 10
  },
  children: [
    {
      path: 'export-excel',
      name: 'ExportExcel',
      component: () => import('@/views/excel/export-excel'),
      meta: {
        title: t('routes.excel.export')
      }
    },
    {
      path: 'import-excel',
      name: 'ImportExcel',
      component: () => import('@/views/excel/import-excel'),
      meta: {
        title: t('routes.excel.import')
      }
    }
  ]
}

export default ExcelRoute

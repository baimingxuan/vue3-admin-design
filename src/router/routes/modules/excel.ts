import type { AppRoute } from '../../types'
import { i18n } from '@/locales'
import Layout from '@/layout'

const { t } = i18n.global

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

import type { AppRoute } from '../../types'
import { i18n } from '@/locales'
import Layout from '@/layout'

const { t } = i18n.global

// form module page
const FormRoute: AppRoute = {
  path: '/form',
  name: 'Form',
  component: Layout,
  redirect: '/form/basic-form',
  meta: {
    title: t('routes.form.name'),
    icon: 'form',
    orderNo: 2
  },
  children: [
    {
      path: 'basic-form',
      name: 'BasicForm',
      component: () => import('@/views/form/basic-form'),
      meta: {
        title: t('routes.form.basic')
      }
    },
    {
      path: 'form-designer',
      name: 'FormDesigner',
      component: () => import('@/views/form/form-designer'),
      meta: {
        title: t('routes.form.designer')
      }
    }
  ]
}

export default FormRoute

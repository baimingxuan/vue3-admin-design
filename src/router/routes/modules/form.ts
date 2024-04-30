import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

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

import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// form module page
const FormRoute: AppRoute = {
  path: '/form',
  name: 'Form',
  component: Layout,
  redirect: '/form/basic-form',
  meta: {
    title: '表单',
    icon: 'form',
    orderNo: 2
  },
  children: [
    {
      path: 'basic-form',
      name: 'BasicForm',
      component: () => import('@/views/form/basic-form'),
      meta: {
        title: '基础表单'
      }
    },
    {
      path: 'form-designer',
      name: 'FormDesigner',
      component: () => import('@/views/form/form-designer'),
      meta: {
        title: '表单设计器'
      }
    }
  ]
}

export default FormRoute

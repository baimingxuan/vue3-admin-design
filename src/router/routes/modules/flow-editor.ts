import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// flow-editor module page
const FlowEditorRoute: AppRoute = {
  path: '/flow-editor',
  name: 'FlowEditor',
  component: Layout,
  redirect: '/flow-editor/flow-approve',
  meta: {
    title: t('routes.flow.name'),
    icon: 'flow',
    orderNo: 8
  },
  children: [
    {
      path: 'flow-approve',
      name: 'FlowApprove',
      component: () => import('@/views/flow/flow-approve'),
      meta: {
        title: t('routes.flow.approve')
      }
    },
    {
      path: 'flow-bpmn',
      name: 'FlowBpmn',
      component: () => import('@/views/flow/flow-bpmn'),
      meta: {
        title: t('routes.flow.bpmn')
      }
    }
  ]
}

export default FlowEditorRoute

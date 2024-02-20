import type { AppRoute } from '../../types'
import Layout from '@/layout'

// flow-editor module page
const FlowEditorRoute: AppRoute = {
  path: '/flow-editor',
  name: 'FlowEditor',
  component: Layout,
  redirect: '/flow-editor/flow-approve',
  meta: {
    title: '流程图编辑器',
    icon: 'flow',
    orderNo: 8
  },
  children: [
    {
      path: 'flow-approve',
      name: 'FlowApprove',
      component: () => import('@/views/flow/flow-approve'),
      meta: {
        title: '审批流程图'
      }
    },
    {
      path: 'flow-bpmn',
      name: 'FlowBpmn',
      component: () => import('@/views/flow/flow-bpmn'),
      meta: {
        title: 'BPMN流程图'
      }
    }
  ]
}

export default FlowEditorRoute

import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

export const GraphEditorRoute: AppRoute = {
    path: '/graph-editor',
    name: 'GraphEditor',
    component: Layout,
    redirect: '/graph-editor/flow',
    meta: {
        title: '图形编辑器',
        icon: 'vue-dsn-icon-excel'
    },
    children: [
        {
            path: 'flow',
            name: 'Flow',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '流程图'
            }
        },
        {
            path: 'mind',
            name: 'Mind',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '思维导图'
            }
        }
    ]
}
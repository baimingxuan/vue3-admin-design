import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

export const TableRoute: AppRoute = {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/table-classic',
    meta: {
        title: '表格',
        icon: 'vue-dsn-icon-biaoge'
    },
    children: [
        {
            path: 'table-classic',
            name: 'TableClassic',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '综合表格'
            }
        },
        {
            path: 'table-inline-edit',
            name: 'TableInlineEdit',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '行内编辑表格'
            }
        }
    ]
}
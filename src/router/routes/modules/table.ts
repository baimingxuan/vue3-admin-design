import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// table module page
const TableRoute: AppRoute = {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/table-basic',
    meta: {
        title: '表格',
        icon: 'table',
        orderNo: 3
    },
    children: [
        {
            path: 'table-basic',
            name: 'TableBasic',
            component: () => import('@/views/table/table-basic'),
            meta: {
                title: '基础表格'
            }
        },
        {
            path: 'table-inline-edit',
            name: 'TableInlineEdit',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '行内编辑表格'
            }
        }
    ]
}

export default TableRoute
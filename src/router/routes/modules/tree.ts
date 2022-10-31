import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// tree module page
const TreeRoute: AppRoute = {
    path: '/tree',
    name: 'Tree',
    component: Layout,
    redirect: '/tree/org-tree',
    meta: {
        title: '树形结构',
        icon: 'tree',
        orderNo: 9
    },
    children: [
        {
            path: 'org-tree',
            name: 'OrgTree',
            component: () => import('@/views/tree/org-tree/index'),
            meta: {
                title: '组织树'
            }
        },
        {
            path: 'ele-tree',
            name: 'EleTree',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '控件树'
            }
        }
    ]
}

export default TreeRoute
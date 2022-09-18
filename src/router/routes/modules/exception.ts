import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// exception module page
const ExceptionRoute: AppRoute = {
    path: '/exception',
    name: 'Exception',
    component: Layout,
    redirect: '/exception/page-401',
    orderNo: 10,
    meta: {
        title: '异常页面',
        icon: 'bug'
    },
    children: [
        {
            path: 'page-401',
            name: 'Page401',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '401页面'
            }
        },
        {
            path: 'page-404',
            name: 'Page404',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '404页面'
            }
        }
    ]
}

export default ExceptionRoute
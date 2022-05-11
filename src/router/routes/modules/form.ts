import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// form page
export const FormRoute: AppRoute = {
    path: '/form',
    name: 'From',
    component: Layout,
    redirect: '/form/form-list',
    meta: {
        title: '表单',
        icon: 'vue-dsn-icon-biaoge'
    },
    children: [
        {
            path: 'form-list',
            name: 'FormList',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '表单列表'
            }
        },
        {
            path: 'form-marking',
            name: 'FormMarking',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '表单生成器'
            }
        }
    ]
}
import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// form module page
const FormRoute: AppRoute = {
    path: '/form',
    name: 'From',
    component: Layout,
    redirect: '/form/form-list',
    meta: {
        title: '表单',
        icon: 'form',
        orderNo: 2
    },
    children: [
        {
            path: 'form-list',
            name: 'FormList',
            component: () => import('@/views/form/form-list'),
            meta: {
                title: '表单列表'
            }
        },
        {
            path: 'form-marking',
            name: 'FormMarking',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '表单生成器'
            }
        }
    ]
}

export default FormRoute
import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// component module page
const CompoRoute: AppRoute = {
    path: '/compo',
    name: 'Compo',
    component: Layout,
    redirect: '/compo/image-upload',
    meta: {
        title: '组件',
        icon: 'vue-dsn-icon-zujian'
    },
    children: [
        {
            path: 'image-upload',
            name: 'ImageUpload',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '图片上传'
            }
        },
        {
            path: 'drag',
            name: 'Drag',
            component: () => import('@/views/home.vue'),
            redirect: '/tools/drag/drag-list',
            meta: {
                title: '拖拽'
            },
            children: [
                {
                    path: 'drag-list',
                    name: 'DragList',
                    component: () => import('@/views/home.vue'),
                    meta: {
                        title: '列表拖拽'
                    }
                },
                {
                    path: 'vue-drr',
                    name: 'VueDrr',
                    component: () => import('@/views/home.vue'),
                    meta: {
                        title: '组件拖拽'
                    }
                }
            ]
        },
        {
            path: 'transfer',
            name: 'Transfer',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '穿梭框'
            }
        },
        {
            path: 'count-to',
            name: 'CountTo',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '数字滚动'
            }
        }
    ]
}

export default CompoRoute
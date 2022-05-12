import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

export const ImageRoute: AppRoute = {
    path: '/image',
    name: 'Image',
    component: Layout,
    redirect: '/image/image-cropper',
    meta: {
        title: '图片处理',
        icon: 'vue-dsn-icon-picture'
    },
    children: [
        {
            path: 'image-cropper',
            name: 'ImageCropper',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '图片裁剪'
            }
        },
        {
            path: 'image-compress',
            name: 'ImageCompress',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '图片压缩'
            }
        },
        {
            path: 'image-synthesizer',
            name: 'ImageSynthesizer',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '图片合成'
            }
        }
    ]
}
import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// image module page
const ImageRoute: AppRoute = {
  path: '/image',
  name: 'Image',
  component: Layout,
  redirect: '/image/image-cropper',
  meta: {
    title: '图片处理',
    icon: 'image',
    orderNo: 4
  },
  children: [
    {
      path: 'image-cropper',
      name: 'ImageCropper',
      component: () => import('@/views/image/image-cropper'),
      meta: {
        title: '图片裁剪'
      }
    },
    {
      path: 'image-compress',
      name: 'ImageCompress',
      component: () => import('@/views/image/image-compress'),
      meta: {
        title: '图片压缩'
      }
    },
    {
      path: 'image-composition',
      name: 'ImageComposition',
      component: () => import('@/views/image/image-composition'),
      meta: {
        title: '图片合成'
      }
    }
  ]
}

export default ImageRoute

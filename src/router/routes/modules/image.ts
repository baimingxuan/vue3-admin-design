import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// image module page
const ImageRoute: AppRoute = {
  path: '/image',
  name: 'Image',
  component: Layout,
  redirect: '/image/image-cropper',
  meta: {
    title: t('routes.image.name'),
    icon: 'image',
    orderNo: 4
  },
  children: [
    {
      path: 'image-cropper',
      name: 'ImageCropper',
      component: () => import('@/views/image/image-cropper'),
      meta: {
        title: t('routes.image.cropper')
      }
    },
    {
      path: 'image-compress',
      name: 'ImageCompress',
      component: () => import('@/views/image/image-compress'),
      meta: {
        title: t('routes.image.compress')
      }
    },
    {
      path: 'image-composition',
      name: 'ImageComposition',
      component: () => import('@/views/image/image-composition'),
      meta: {
        title: t('routes.image.composition')
      }
    }
  ]
}

export default ImageRoute

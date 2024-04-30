import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// component module page
const CompoRoute: AppRoute = {
  path: '/compo',
  name: 'Compo',
  component: Layout,
  redirect: '/compo/image-upload',
  meta: {
    title: t('routes.compo.name'),
    icon: 'compo',
    orderNo: 6
  },
  children: [
    {
      path: 'image-upload',
      name: 'ImageUpload',
      component: () => import('@/views/compo/image-upload'),
      meta: {
        title: t('routes.compo.upload')
      }
    },
    {
      path: 'drag',
      name: 'Drag',
      redirect: '/compo/drag/drag-list',
      meta: {
        title: t('routes.compo.drag.name')
      },
      children: [
        {
          path: 'drag-list',
          name: 'DragList',
          component: () => import('@/views/compo/drag/drag-list'),
          meta: {
            title: t('routes.compo.drag.list')
          }
        },
        {
          path: 'drag-resize',
          name: 'VueDragResize',
          component: () => import('@/views/compo/drag/drag-resize'),
          meta: {
            title: t('routes.compo.drag.resize')
          }
        }
      ]
    },
    {
      path: 'transfer',
      name: 'TransferPage',
      component: () => import('@/views/compo/transfer'),
      meta: {
        title: t('routes.compo.transfer')
      }
    },
    {
      path: 'count-to',
      name: 'CountToPage',
      component: () => import('@/views/compo/count-to'),
      meta: {
        title: t('routes.compo.countTo')
      }
    }
  ]
}

export default CompoRoute

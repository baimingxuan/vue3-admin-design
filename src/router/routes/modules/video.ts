import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// video module page
const VideoRoute: AppRoute = {
  path: '/video',
  name: 'Video',
  component: Layout,
  redirect: '/video/video-player',
  meta: {
    title: t('routes.video.name'),
    icon: 'video',
    orderNo: 5
  },
  children: [
    {
      path: 'video-player',
      name: 'VideoPlayer',
      component: () => import('@/views/video/video-player'),
      meta: {
        title: t('routes.video.player')
      }
    },
    {
      path: 'video-watermark',
      name: 'VideoWatermark',
      component: () => import('@/views/video/video-watermark'),
      meta: {
        title: t('routes.video.watermark')
      }
    }
  ]
}

export default VideoRoute

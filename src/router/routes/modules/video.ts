import type { AppRoute } from '../../types'
import Layout from '@/layout'

// video module page
const VideoRoute: AppRoute = {
  path: '/video',
  name: 'Video',
  component: Layout,
  redirect: '/video/video-player',
  meta: {
    title: '视频处理',
    icon: 'video',
    orderNo: 5
  },
  children: [
    {
      path: 'video-player',
      name: 'VideoPlayer',
      component: () => import('@/views/video/video-player'),
      meta: {
        title: '视频播放器'
      }
    },
    {
      path: 'video-watermark',
      name: 'VideoWatermark',
      component: () => import('@/views/video/video-watermark'),
      meta: {
        title: '视频水印'
      }
    }
  ]
}

export default VideoRoute

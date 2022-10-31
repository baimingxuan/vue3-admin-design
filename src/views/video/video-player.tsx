import { defineComponent, ref } from 'vue'
import { PageWrapper } from '@/components/Page'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'VideoPlayer',
  setup() {

    return () => (
      <PageWrapper name='视频播放器'>
        {{
          header: () => <>
            <p>Vue-Video-Player: 一个使用Vue对video.js进行二次封装的视频播放插件, 适用于目前主流网络视频的播放。</p>
            <p>github地址: 立即访问 </p>
          </>,
          default: () => <VideoPlayer
              src="https://cdn.jsdelivr.net/gh/baimingxuan/media-store/videos/houlang.mp4"
              controls
              loop={false}
            />
        }}
      </PageWrapper>
    )
  }
})
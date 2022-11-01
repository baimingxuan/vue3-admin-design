import { defineComponent } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VIDEO_RES_SRC, VIDEO_PLUGIN_SRC } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'VideoPlayer',
  setup() {
    function openGithub() {
      openWindow(VIDEO_PLUGIN_SRC)
    }
    
    return () => (
      <PageWrapper name='视频播放器'>
        {{
          header: () => <>
            <p>videojs-player: 一个支持 vue3 的 video.js 视频播放器组件, 适用于目前主流网络视频的播放。</p>
            <p>github源码:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={12}>
                <AntdCard title='传统视频播放器' bordered={false}>
                  <video 
                    src={VIDEO_RES_SRC}
                    controls
                    style='width: 100%; outline: none;'
                  />
                </AntdCard>
              </AntdCol>
              <AntdCol span={12}>
                <AntdCard title='视频播放插件' bordered={false}>
                  <VideoPlayer
                    src={VIDEO_RES_SRC}
                    playbackRates={[0.5, 1.0, 1.5, 2.0]}
                    controls
                    fluid
                    loop={false}
                    preload='auto'
                    aspectRatio='16:9'
                  />
                </AntdCard>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})
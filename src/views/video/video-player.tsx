import { defineComponent } from 'vue'
import { Row, Col, Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VIDEO_RES_SRC, VIDEO_PLUGIN } from '@/settings/websiteSetting'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'VideoPlayer',
  setup() {
    return () => (
      <PageWrapper plugin={VIDEO_PLUGIN}>
        <Row gutter={12}>
          <Col span={12}>
            <Card title='传统视频播放器'>
              <video src={VIDEO_RES_SRC} controls style='width: 100%; outline: none;' />
            </Card>
          </Col>
          <Col span={12}>
            <Card title='视频播放插件'>
              <VideoPlayer
                src={VIDEO_RES_SRC}
                playbackRates={[0.5, 1.0, 1.5, 2.0]}
                controls
                fluid
                loop={false}
                preload='auto'
                aspectRatio='16:9'
              />
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})

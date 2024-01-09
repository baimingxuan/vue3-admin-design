import type { CSSProperties } from 'vue'
import { defineComponent, reactive, unref, computed } from 'vue'
import { Row, Col, Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'ImageComposition',
  setup() {
    const container = reactive({
      width: 0,
      height: 0,
      bgImgSrc: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img01.jpg'
    })

    const getWrapStyle = computed(
      (): CSSProperties => ({
        width: container.width + 'px',
        height: container.height + 'px',
        backgroundImage: "url('" + container.bgImgSrc + "')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      })
    )

    return () => (
      <PageWrapper plugin={IMAGE_COMPOSITION}>
        {{
          default: () => (
            <Row gutter={12}>
              <Col span={16}>
                <Card title='合成区域' bordered={false} bodyStyle={{ height: '550px' }}>
                  <div class='flex-center' style='overflow: hidden'>
                    <div style={unref(getWrapStyle)}></div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='设置区域' bordered={false} bodyStyle={{ height: '550px' }}></Card>
              </Col>
            </Row>
          )
        }}
      </PageWrapper>
    )
  }
})

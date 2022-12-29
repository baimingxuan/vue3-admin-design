import { defineComponent, ref } from 'vue'
import { Row, Col, Card, Button, Space } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUECROPPER_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'ImageComposition',
  setup() {
    
    function openGithub() {
      openWindow(VUECROPPER_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='图片合成'>
        {{
          header: () => <>
            <p>图片合成: 基于VueDRR拖拽功能, 在其上通过叠加图片、文字等, 实现图片的叠加伪合成功能。</p>
            <p>组件地址:<Button type='link' onClick={openGithub}>立即访问</Button></p>
          </>,
          default: () => (
            <Row gutter={12}>
              <Col span={16}>
                <Card title='合成区域' bordered={false} bodyStyle={{height: '550px'}}>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='设置区域' bordered={false} bodyStyle={{height: '550px'}}>
                </Card>
              </Col>
            </Row>
          )
        }}
      </PageWrapper>
    )
  }
})
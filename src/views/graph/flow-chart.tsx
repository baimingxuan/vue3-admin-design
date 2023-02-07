import { defineComponent } from 'vue'
import { Card, Button } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { ANTV_G6_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'FlowChart',
  setup() {

    function openGithub() {
      openWindow(ANTV_G6_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='AntV-G6流程图'>
        {{
          header: () => <>
            <p>antv-g6: 一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。</p>
            <p>github源码:<Button type='link' onClick={openGithub}>立即访问</Button></p>
          </>,
          default: () => <Card bordered={false}>
            
          </Card>
        }}
      </PageWrapper>
    )
  }
})
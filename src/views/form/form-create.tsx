import { defineComponent } from 'vue'
import { Card as AntdCard, Button as AntdButton } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { FORM_CREATE_DESIGNER_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'Markdown',
  setup() {

    function openGithub() {
      openWindow(FORM_CREATE_DESIGNER_URL)
    }

    return () => (
      <PageWrapper name='Markdown编辑器'>
        {{
          header: () => <>
            <p>form-create-designer: 一个通过拖拽的方式快速创建表单的设计器组件, 能提高开发者对表单的开发效率, 节省开发者的时间。</p>
            <p>github源码:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
            <fc-designer />
          </AntdCard>
        }}
      </PageWrapper>
    )
  }
})
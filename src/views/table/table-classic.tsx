import { defineComponent } from 'vue'
import { Button as AntdButton, Table as AntdTable } from 'ant-design-vue'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'Markdown',
  setup() {

    function openGithub() {
      openWindow(TABLE_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='Table 表格'>
        {{
          header: () => <>
            <p>ant-design-table: 使用 ant-design 的 table 组件, 可用于展示多条结构类似的数据, 并对其进行相关操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <div>
            <AntdTable />
          </div>
        }}
      </PageWrapper>
    )
  }
})
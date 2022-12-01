import { defineComponent } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton, Transfer as AntdTransfer } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { TRANSFER_COMPO_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'TransferPage',
  setup() {

    function openGithub() {
      openWindow(TRANSFER_COMPO_URL)
    }

    return () => (
      <PageWrapper name='Transfer 穿梭框'>
        {{
          header: () => <>
            <p>ant-design-transfer: 使用 ant-design 的 transfer 组件, 可用于对列表数据进行选中、取消等操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={12}>
                <AntdCard bordered={false}>
                  <AntdTransfer />
                </AntdCard>
              </AntdCol>
              <AntdCol span={12}>
                <AntdCard bordered={false}>
                </AntdCard>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})
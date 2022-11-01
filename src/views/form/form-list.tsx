import { defineComponent, reactive } from 'vue'
import { Card as AntdCard, Form as AntdForm, FormItem as AntdFormItem, Input as AntdInput,
  InputNumber as AntdInputNumber, Button as AntdButton } from 'ant-design-vue'
import { FORM_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'FormList',
  setup() {
    const formState = reactive<Record<string, any>>({
      inputLimit: '',
      inputNum: '',
    })

    function openGithub() {
      openWindow(FORM_PLUGIN_URL)
    }
    
    return () => (
      <PageWrapper name='Form 表单'>
        {{
          header: () => <>
             <p>ant-design-form: 使用 ant-design 的 form 组件, 可用以收集、校验和提交数据等操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
              <AntdForm model={formState} style='width: 40%; margin: 0 auto;'>
                <AntdFormItem label='输入框(长度限制):'>
                  <AntdInput showCount maxlength={20} defaultValue='请输入内容' />
                </AntdFormItem>
                <AntdFormItem label='输入框(纯数字):'>
                  <AntdInputNumber min={0} style='width: 100%;' defaultValue={0} />
                </AntdFormItem>
              </AntdForm>
            </AntdCard>
        }}
      </PageWrapper>
    )
  }
})
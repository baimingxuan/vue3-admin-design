import { defineComponent, reactive } from 'vue'
import { Card as AntdCard, Form as AntdForm, FormItem as AntdFormItem, Input as AntdInput,
  InputNumber as AntdInputNumber, InputPassword as AntdInputPassword, Button as AntdButton } from 'ant-design-vue'
import { FORM_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'FormList',
  setup() {
    const formState = reactive<Record<string, any>>({
      inputLimit: '',
      inputNum: '',
      password: ''
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
              <AntdForm model={formState} labelCol={{span: 6}} wrapperCol={{span: 18}} style='width: 42%; margin: 0 auto;'>
                <AntdFormItem label='输入框(长度限制):'>
                  <AntdInput
                    v-model={[formState.inputLimit, 'value']}
                    showCount
                    maxlength={20}
                    placeholder='请输入内容'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(纯数字):'>
                  <AntdInputNumber
                    v-model={[formState.inputNum, 'value']}
                    style='width: 100%;'
                    placeholder='请输入数字'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(密码隐藏):'>
                  <AntdInputPassword
                    v-model={[formState.password, 'value']}
                    maxlength={16}
                    placeholder="请输入密码"
                  />
                </AntdFormItem>
              </AntdForm>
            </AntdCard>
        }}
      </PageWrapper>
    )
  }
})
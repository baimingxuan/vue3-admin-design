import { defineComponent, reactive, ref, unref } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton,
  Form as AntdForm, FormItem as AntdFormItem, Input as AntdInput, InputNumber as AntdInputNumber,
  Space as AntdSpace } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { CountTo } from '@/components/CountTo'
import { TRANSFER_COMPO_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'

export default defineComponent({
  name: 'CountToPage',
  setup() {
    const countRef = ref()
    const formRef = reactive({
      startVal: 0,
      endVal: 2020,
      duration: 4000,
      decimals: 0,
      separator: ',',
      prefix: '￥ ',
      suffix: ' rmb'
    })
    
    function openGithub() {
      openWindow(TRANSFER_COMPO_URL)
    }

    function handleStart() {
      unref(countRef).start()
    }

    function handleReset() {
      unref(countRef).reset()
    }

    return () => (
      <PageWrapper name='CountTo 数字滚动'>
        {{
          header: () => <>
            <p>CountTo: 一个无依赖、轻量级的vue3数字滚动插件, 可以通过你自己的方式轻松编写。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={6}>
                <AntdCard title='正向增加' bordered={false} bodyStyle={{height: '300px'}}>
                  <CountTo
                    startVal={0}
                    endVal={2020}
                    duration={4000}
                    size={40}
                    style='height: 100%;'
                    class='flex-center'
                  />
                </AntdCard>
              </AntdCol>
              <AntdCol span={12}>
                <AntdCard title='自定义配置' bordered={false} bodyStyle={{height: '300px'}}>
                  <div class='flex-center' style='margin-bottom: 30px'>
                    <CountTo
                      ref={countRef}
                      startVal={formRef.startVal}
                      endVal={formRef.endVal}
                      duration={formRef.duration}
                      decimals={formRef.decimals}
                      separator={formRef.separator}
                      prefix={formRef.prefix}
                      suffix={formRef.suffix}
                      size={40}
                      autoplay={false}
                    />
                  </div>
                  <AntdForm
                    model={formRef}
                    layout='inline'
                    labelAlign='left'
                    labelCol={{style: {width: '80px', marginBottom: '12px'}}}
                  >
                    <AntdFormItem label='startVal:' name='startVal'>
                      <AntdInputNumber
                        v-model:value={formRef.startVal}
                        min={0}
                        max={10000}
                        style='width: 100px'
                      />
                    </AntdFormItem>
                    <AntdFormItem label='endVal:' name='endVal'>
                      <AntdInputNumber
                        v-model:value={formRef.endVal}
                        min={0}
                        max={10000}
                        style='width: 100px'
                      />
                    </AntdFormItem>
                    <AntdFormItem label='duration:' name='duration'>
                      <AntdInputNumber
                        v-model:value={formRef.duration}
                        min={100}
                        max={100000}
                        style='width: 100px'
                      />
                    </AntdFormItem>
                    <AntdFormItem label='decimals:' name='decimals'>
                      <AntdInputNumber
                        v-model:value={formRef.decimals}
                        min={0}
                        max={100}
                        style='width: 100px'
                      />
                    </AntdFormItem>
                    <AntdFormItem label='separator:' name='separator'>
                      <AntdInput v-model:value={formRef.separator} style='width: 100px' />
                    </AntdFormItem>
                    <AntdFormItem label='prefix:' name='prefix'>
                      <AntdInput v-model:value={formRef.prefix} style='width: 100px' />
                    </AntdFormItem>
                    <AntdFormItem label='suffix:' name='suffix'>
                      <AntdInput v-model:value={formRef.suffix} style='width: 100px' />
                    </AntdFormItem>
                    <AntdFormItem>
                      <AntdSpace>
                        <AntdButton type='primary' onClick={handleStart}>开始</AntdButton>
                        <AntdButton type='primary' danger onClick={handleReset}>重置</AntdButton>
                      </AntdSpace>
                    </AntdFormItem>
                  </AntdForm>
                </AntdCard>
              </AntdCol>
              <AntdCol span={6}>
                <AntdCard title='反向减少' bordered={false} bodyStyle={{height: '300px'}}>
                  <CountTo
                    startVal={2020}
                    endVal={0}
                    duration={4000}
                    size={40}
                    color='#30b08f'
                    style='height: 100%;'
                    class='flex-center'
                  />
                </AntdCard>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})
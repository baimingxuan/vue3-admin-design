import { defineComponent, reactive, ref, unref } from 'vue'
import { Row, Col, Card, Button, Form, FormItem, Input, InputNumber, Space } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { CountTo } from '@/components/CountTo'
import { COUNTTO_PLUGIN } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'CountToPage',
  setup() {
    const countRef = ref()
    const formState = reactive({
      startVal: 0,
      endVal: 2020,
      duration: 4000,
      decimals: 0,
      separator: ',',
      prefix: '￥ ',
      suffix: ' rmb'
    })

    function handleStart() {
      unref(countRef).start()
    }

    function handleReset() {
      unref(countRef).reset()
    }

    return () => (
      <PageWrapper plugin={COUNTTO_PLUGIN}>
        <Row gutter={12}>
          <Col span={6}>
            <Card title='正向增加' bodyStyle={{ height: '300px' }}>
              <CountTo startVal={0} endVal={2020} duration={4000} size={40} style='height: 100%;' class='flex-center' />
            </Card>
          </Col>
          <Col span={12}>
            <Card title='自定义配置' bodyStyle={{ height: '300px' }}>
              <div class='flex-center' style='margin-bottom: 30px'>
                <CountTo
                  ref={countRef}
                  startVal={formState.startVal}
                  endVal={formState.endVal}
                  duration={formState.duration}
                  decimals={formState.decimals}
                  separator={formState.separator}
                  prefix={formState.prefix}
                  suffix={formState.suffix}
                  size={40}
                  autoplay={false}
                />
              </div>
              <Form
                model={formState}
                layout='inline'
                labelAlign='left'
                labelCol={{ style: { width: '80px', marginBottom: '12px' } }}
              >
                <FormItem label='startVal:' name='startVal'>
                  <InputNumber v-model:value={formState.startVal} min={0} max={10000} style='width: 100px' />
                </FormItem>
                <FormItem label='endVal:' name='endVal'>
                  <InputNumber v-model:value={formState.endVal} min={0} max={10000} style='width: 100px' />
                </FormItem>
                <FormItem label='duration:' name='duration'>
                  <InputNumber v-model:value={formState.duration} min={100} max={100000} style='width: 100px' />
                </FormItem>
                <FormItem label='decimals:' name='decimals'>
                  <InputNumber v-model:value={formState.decimals} min={0} max={100} style='width: 100px' />
                </FormItem>
                <FormItem label='separator:' name='separator'>
                  <Input v-model:value={formState.separator} style='width: 100px' />
                </FormItem>
                <FormItem label='prefix:' name='prefix'>
                  <Input v-model:value={formState.prefix} style='width: 100px' />
                </FormItem>
                <FormItem label='suffix:' name='suffix'>
                  <Input v-model:value={formState.suffix} style='width: 100px' />
                </FormItem>
                <FormItem>
                  <Space>
                    <Button type='primary' onClick={handleStart}>
                      开始
                    </Button>
                    <Button type='primary' danger onClick={handleReset}>
                      重置
                    </Button>
                  </Space>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span={6}>
            <Card title='反向减少' bodyStyle={{ height: '300px' }}>
              <CountTo
                startVal={2020}
                endVal={0}
                duration={4000}
                size={40}
                color='#30b08f'
                style='height: 100%;'
                class='flex-center'
              />
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})

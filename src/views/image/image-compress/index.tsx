import type { CSSProperties } from 'vue'
import { defineComponent, ref, reactive, computed } from 'vue'
import { Row, Col as Col, Card, Button, Space as AntdSpace, Form, FormItem, InputNumber, Select } from 'ant-design-vue'
import { COMPRESS_IMG_SRC } from '@/settings/websiteSetting'
import { PageWrapper } from '@/components/Page'
import { UploadImage } from '@/components/Upload'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'ImageCompress',
  setup() {
    const imageBase = reactive({
      width: 1920,
      height: 1080,
      src: COMPRESS_IMG_SRC
    })

    const imageCompr = reactive({
      width: 0,
      height: 0,
      ratio: 100,
      quality: 1
    })

    function handleSuccess(data: any) {
      imageBase.src = data
      const image = new Image()
      image.src = data
      image.onload = () => {
        imageBase.width = image.width
        imageBase.height = image.height
      }
    }

    return () => (
      <PageWrapper name='Image 图片压缩'>
        {{
          header: () => <>
            <p>ImageCompress: 纯JS实现对图片的等比压缩和放大的功能, 并能对图片进行下载。</p>
            <p>github地址: 立即访问 </p>
          </>,
          default: () => (
            <Row gutter={12}>
              <Col span={16}>
                <Card title='图片区域' bordered={false} bodyStyle={{height: '400px'}}>
                  
                </Card>
              </Col>
              <Col span={8}>
                <Card title='设置区域' bordered={false} bodyStyle={{height: '400px'}}>
                  <Form>
                    <FormItem label='上传图片: '>
                      <UploadImage onSuccess={handleSuccess} />
                    </FormItem>
                    <FormItem label='图片尺寸: '>
                      <div>
                        <InputNumber min={0} max={10000} />
                        <SvgIcon name='linking' size={20} />
                        <InputNumber min={0} max={10000} />
                      </div>
                    </FormItem>
                    <FormItem label='压缩比例: '>
                      <InputNumber
                        v-model:value={imageCompr.ratio}
                        min={0}
                        max={100}
                        disabled
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                      />
                    </FormItem>
                    <FormItem label='图片质量: '>
                      <Select />
                    </FormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          )
        }}
      </PageWrapper>
    )
  }
})
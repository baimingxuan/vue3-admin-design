import type { CSSProperties } from 'vue'
import type {
  TextElementState,
  ImageElementState,
  ElementState,
  ContainerState,
  ImageObjState,
  handlerType
} from './types'
import { defineComponent, reactive, ref, unref, computed } from 'vue'
import { Row, Col, Card, Form, FormItem, Button } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { UploadImage } from '@/components/Upload'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'
import { textElement, imageElement, containerObj } from './data'

export default defineComponent({
  name: 'ImageComposition',
  setup() {
    const container = reactive<ContainerState>(containerObj)

    const elements = ref<Array<ElementState>>([textElement, imageElement])

    const containerStyle = computed(
      (): CSSProperties => ({
        position: 'relative',
        width: container.width,
        height: container.height,
        backgroundImage: `url(${container.bgImgUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      })
    )

    function changeBgImg(url: string) {}

    function uploadImage(url: string) {}

    function handleAddText() {}

    function handleDeleteElement() {}

    return () => (
      <PageWrapper plugin={IMAGE_COMPOSITION}>
        {{
          default: () => (
            <Row gutter={12}>
              <Col span={16}>
                <Card title='合成区域' bodyStyle={{ height: '550px' }}>
                  <div class='flex-center'>
                    <div style={{ ...containerStyle }}></div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='设置区域' bodyStyle={{ height: '600px' }}>
                  <Form
                    colon={false}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign='left'
                    style={{ width: '300px', margin: '0 auto' }}
                  >
                    <FormItem label='选择底图'>
                      <UploadImage name='选择底图' isFull onSuccess={changeBgImg} />
                    </FormItem>
                    <FormItem label='添加文本'>
                      <Button block style={{ width: '100%' }} onClick={handleAddText}>
                        添加文本
                      </Button>
                    </FormItem>
                    <FormItem label='添加图片'>
                      <UploadImage name='添加图片' isFull onSuccess={uploadImage} />
                    </FormItem>
                    <FormItem label='删除元素'>
                      <Button type='primary' danger style={{ width: '100%' }} onClick={handleDeleteElement}>
                        删除元素
                      </Button>
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

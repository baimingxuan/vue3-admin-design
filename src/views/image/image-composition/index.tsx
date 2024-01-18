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
import { Row, Col, Card, Form, FormItem, Button, message } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { UploadImage } from '@/components/Upload'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { getImageSize, calcImageSize } from '@/utils/image'
import { textElement, imageElement, containerObj } from './data'

export default defineComponent({
  name: 'ImageComposition',
  setup() {
    const container = reactive<ContainerState>(containerObj)
    const elements = ref<Array<ElementState>>([textElement, imageElement])
    const activeElementTag = ref<string>(elements.value[0]?.tag || '')
    const elementIndex = ref<number>(elements.value.length)

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

    const activeElement = computed(() => {
      return elements.value.find(item => item.tag === activeElementTag.value)
    })

    const activeTextEle = computed(() => {
      return activeElement.value?.type === 'text' ? (activeElement.value as TextElementState) : null
    })

    function handleAddText() {
      const tagIndex = elementIndex.value + 1

      const textElement: TextElementState = {
        x: 300,
        y: 100,
        z: elements.value.length,
        w: 180,
        h: 36,
        type: 'text',
        tag: `text_${tagIndex}`,
        active: false,
        text: '请输入文本',
        style: {
          fontFamily: '微软雅黑',
          fontSize: '24px',
          lineHeight: '24px',
          color: '#f70707',
          backgroundColor: '#05f8e8',
          fontWeight: '',
          fontStyle: '',
          textShadow: '',
          textAlign: 'left'
        }
      }

      if (elements.value.length > 4) {
        message.warning('图片上最多叠加5个元素!')
        return
      } else {
        elements.value.push(textElement)
        elementIndex.value = tagIndex
      }
    }

    function handleAddImage(imgObj: ImageObjState) {
      const tagIndex = elementIndex.value + 1

      const imageElement: ImageElementState = {
        x: 320,
        y: 300,
        z: elements.value.length,
        w: imgObj.width,
        h: imgObj.height,
        type: 'image',
        tag: `image_${tagIndex}`,
        active: false,
        url: imgObj.url
      }
      if (elements.value.length > 4) {
        message.warning('图片上最多叠加5个元素!')
        return
      } else {
        elements.value.push(imageElement)
        elementIndex.value = tagIndex
      }
    }

    function changeBgImg(url: string) {}

    function uploadImage(url: string) {}

    function handleSettingText(val: string) {
      elements.value.forEach((item: any) => {
        if (item.tag === unref(activeElementTag)) {
          item.text = val
        }
      })
    }

    function handleSettingStyles(style: any) {
      elements.value.forEach((item: any) => {
        if (item.tag === unref(activeElementTag)) {
          item.style = style
        }
      })
    }

    function handleDeleteElement() {}

    function handleComposition() {}

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
                <Card title='设置区域' bodyStyle={{ height: '550px' }}>
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
                  {unref(activeTextEle) ? (
                    <RichTextSetting
                      textValue={unref(activeTextEle)?.text}
                      textStyles={unref(activeTextEle)?.style}
                      onChangeValue={val => handleSettingText(val)}
                      onChangeStyles={style => handleSettingStyles(style)}
                    />
                  ) : (
                    <></>
                  )}
                  <div style={{ width: '300px', margin: '0 auto' }}>
                    <Button type='primary' style={{ width: '100%' }} onClick={handleComposition}>
                      合成图片
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          )
        }}
      </PageWrapper>
    )
  }
})

import type { CSSProperties } from 'vue'
import type {
  TextElementState,
  ImageElementState,
  ElementState,
  ContainerState,
  ImageObjState,
  handlerType
} from './types'
import type { styleState } from '@/types'
import { defineComponent, reactive, ref, unref, computed } from 'vue'
import { Row, Col, Card, Form, Button, message } from 'ant-design-vue'
import { DndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { UploadImage } from '@/components/Upload'
import { getImageSize, calcImageSize } from '@/utils/image'
import { textElement, imageElement, containerObj } from './data'
import dom2image from 'dom-to-image'

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
        width: container.width + 'px',
        height: container.height + 'px',
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

    const elementHandler = (type: 'text' | 'image'): handlerType[] => {
      if (type === 'text') {
        return ['e', 'w']
      }
      return ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw']
    }

    const handleAddText = () => {
      const tagIndex = ++elementIndex.value

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
        activeElementTag.value = textElement.tag
      }
    }

    const handleAddImage = (imgObj: ImageObjState) => {
      const tagIndex = ++elementIndex.value

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
        activeElementTag.value = textElement.tag
      }
    }

    const handleDeleteElement = () => {
      if (!unref(activeElementTag)) {
        message.warning('请先选择元素!')
        return
      }
      const activeElementIndex = elements.value.findIndex(item => item.tag === unref(activeElementTag))
      elements.value.splice(activeElementIndex, 1)
      activeElementTag.value = ''
    }

    const changeBgImg = (url: string) => {
      getImageSize(url).then(({ width, height }) => {
        const { width: containerWidth, height: containerHeight } = calcImageSize(width, height, 850, 550)

        container.bgImgUrl = url
        container.width = containerWidth
        container.height = containerHeight
      })
    }

    const uploadImage = (url: string) => {
      getImageSize(url).then(({ width, height }) => {
        const { width: imgWidth, height: imgHeight } = calcImageSize(
          width,
          height,
          Math.floor(container.width / 4),
          Math.floor(container.height / 4)
        )

        handleAddImage({
          url,
          width: imgWidth,
          height: imgHeight
        })
      })
    }

    const handleSettingText = (val: string) => {
      elements.value.forEach((item: any) => {
        if (item.tag === unref(activeElementTag)) {
          item.text = val
        }
      })
    }

    const handleSettingStyles = (style: any) => {
      elements.value.forEach((item: any) => {
        if (item.tag === unref(activeElementTag)) {
          item.style = style
        }
      })
    }

    const handleChangeElement = (ele: any, index: number) => {
      elements.value[index] = ele
      if (ele.active) {
        activeElementTag.value = ele.tag
        elements.value.forEach((item: any) => {
          if (item.tag !== ele.tag) {
            item.active = false
          }
        })
      }
      // console.log('ele, index', elements.value)
    }

    const handleComposition = async () => {
      dom2image.toPng(document.getElementById('imageComposition')!).then(dataUrl => {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `composition-image.png`
        a.click()
      })
    }

    return () => (
      <PageWrapper plugin={IMAGE_COMPOSITION}>
        <Row gutter={12}>
          <Col span={16}>
            <Card title='合成区域' bodyStyle={{ height: '600px' }}>
              <div class='flex-center'>
                <div id='imageComposition' class='dnd-container' style={{ ...unref(containerStyle) }}>
                  {elements.value.map((item, index) => {
                    return (
                      <DndNode
                        key={item.tag}
                        element={item}
                        handlers={elementHandler(item.type)}
                        onChange={(ele: any) => handleChangeElement(ele, index)}
                      >
                        {item.type === 'text' ? (
                          <RichTextInput v-model:value={item.text} style={item.style} />
                        ) : item.type === 'image' ? (
                          <img src={item.url} draggable='false' />
                        ) : (
                          <></>
                        )}
                      </DndNode>
                    )
                  })}
                </div>
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
                <Form.Item label='选择底图'>
                  <UploadImage name='选择底图' isFull onSuccess={changeBgImg} />
                </Form.Item>
                <Form.Item label='添加文本'>
                  <Button block style={{ width: '100%' }} onClick={handleAddText}>
                    添加文本
                  </Button>
                </Form.Item>
                <Form.Item label='添加图片'>
                  <UploadImage name='添加图片' isFull onSuccess={uploadImage} />
                </Form.Item>
                <Form.Item label='删除元素'>
                  <Button type='primary' danger style={{ width: '100%' }} onClick={handleDeleteElement}>
                    删除元素
                  </Button>
                </Form.Item>
              </Form>
              {unref(activeTextEle) ? (
                <RichTextSetting
                  textValue={unref(activeTextEle)?.text}
                  textStyles={unref(activeTextEle)?.style}
                  onChangeValue={(val: string) => handleSettingText(val)}
                  onChangeStyles={(style: styleState) => handleSettingStyles(style)}
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
      </PageWrapper>
    )
  }
})

/**
 * 待修复的问题：
 * 1. 文本元素激活时，边框颜色不能随主题色改变，输入框未聚焦且无法输入内容
 * 2. 文本元素至于底部时，宽度变窄后，元素内容溢出了
 * 3. 富文本输入框在输入内容时，光标位置不对
 * 4. 文本颜色和背景色的选择器，颜色值未能实时更新
 */

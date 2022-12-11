import type { CSSProperties } from 'vue'
import { defineComponent, unref, reactive, computed, watch, onMounted } from 'vue'
import { Row, Col as Col, Card, Button, Form, FormItem, InputNumber, Select } from 'ant-design-vue'
import { COMPRESS_IMG_SRC } from '@/settings/websiteSetting'
import { PageWrapper } from '@/components/Page'
import { UploadImage } from '@/components/Upload'
import { getComputedImageProp, base64toBlob } from '@/utils/image'
import SvgIcon from '@/components/SvgIcon/index.vue'

interface OptionState {
  label: number
  value: number
}
const qualityOptions: OptionState[] = (() => {
  const list: OptionState[] = []
  for (let i = 10; i > 4; i--) {
    list.push({
      label: 10 * i,
      value: i / 10
    })
  }
  return list
})()

export default defineComponent({
  name: 'ImageCompress',
  setup() {
    const imageBase = reactive({
      width: 1920,
      height: 1080,
      src: COMPRESS_IMG_SRC
    })

    const imageShow = reactive({
      width: 0,
      height: 0,
      imgSrc: ''
    })

    // Compress settings
    const imageCompr = reactive({
      width: 0,
      height: 0,
      ratio: 100,
      quality: 1
    })

    const getImageStyle = computed((): CSSProperties => ({
      position: 'relative',
      width: imageShow.width + 'px',
      height: imageShow.height + 'px',
      backgroundImage: 'url(\'' + imageShow.imgSrc + '\')',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }))

    const getImageRatio = computed(() => imageBase.width / imageBase.height)

    watch(
      () => imageBase,
      (value) => {
        getContainerSize(value.width, value.height)
        imageShow.imgSrc = value.src
        imageCompr.width = value.width
        imageCompr.height = value.height
        imageCompr.ratio = 100
        imageCompr.quality = 1
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      getContainerSize(imageBase.width, imageBase.height)
      imageShow.imgSrc = imageBase.src
      imageCompr.width = imageBase.width
      imageCompr.height = imageBase.height
    })

    // 输入宽高关联
    function bindInput(type: 'w'|'h') {
      if (type === 'h') {
        imageCompr.height = Number(Math.round(imageCompr.width / unref(getImageRatio)).toFixed(0))
      } else if (type === 'w') {
        imageCompr.width = Number(Math.round(imageCompr.height * unref(getImageRatio)).toFixed(0))
      }
      imageCompr.ratio = Number((imageCompr.width / imageBase.width * 100).toFixed(2))
    }

    // 计算图片显示宽高
    function getContainerSize(imageW: number, imageH: number) {
      const [showAreaW, showAreaH] = [850, 550]
      const sizeObj = getComputedImageProp(imageW, imageH, showAreaW, showAreaH)
      // 更新图片展示区宽高
      imageShow.width = sizeObj.width
      imageShow.height = sizeObj.height
    }

    function handleSuccess(data: any) {
      imageBase.src = data
      const image = new Image()
      image.src = data
      image.onload = () => {
        imageBase.width = image.width
        imageBase.height = image.height
      }
    }

    // 图片压缩
    function handleCompressImage() {
      const width = imageCompr.width
      const height = imageCompr.height
      const quality = imageCompr.quality
      const img = new Image()
      img.src = imageBase.src
      img.onload = () => {
        // 创建canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        // 创建属性节点
        const anw = document.createAttribute('width')
        anw.nodeValue = String(width)
        const anh = document.createAttribute('height')
        anh.nodeValue = String(height)
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        // 绘制图片
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        // 生成base64图片
        const imageBase64 = canvas.toDataURL('image/png', quality)
        handleDownloadImage(imageBase64)
      }
    }

    // 下载压缩的图片
    function handleDownloadImage(imageBase64) {
      const imageBlob = base64toBlob(imageBase64)
      const link = document.createElement('a')
      const event = document.createEvent('HTMLEvents')
      // initEvent 不加后两个参数会在火狐下报错 事件类型，是否冒泡，是否阻止浏览器的默认行为
      event.initEvent('click', true, true)
      link.download = 'image.png'
      link.href = URL.createObjectURL(imageBlob)
      // 兼容火狐
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
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
                <Card title='图片区域' bordered={false}>
                  <div class='flex-center' style='height: 550px; overflow: hidden'>
                    <div style={unref(getImageStyle)} />
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='设置区域' bordered={false} bodyStyle={{height: '598px'}}>
                  <Form>
                    <FormItem label='上传图片: '>
                      <UploadImage onSuccess={handleSuccess} />
                    </FormItem>
                    <FormItem label='图片尺寸: '>
                      <div>
                        <InputNumber
                          v-model:value={imageCompr.width}
                          min={0}
                          max={10000}
                          onKeyupNative={bindInput('h')}
                        />
                        <SvgIcon name='linking' size={20} />
                        <InputNumber
                          v-model:value={imageCompr.height}
                          min={0} 
                          max={10000} 
                          onKeyupNative={bindInput('w')}
                        />
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
                      <Select v-model:value={imageCompr.quality} options={qualityOptions} />
                    </FormItem>
                    <FormItem>
                      <Button type='primary' onClick={handleCompressImage}>压缩图片</Button>
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
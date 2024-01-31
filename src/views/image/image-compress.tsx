import { defineComponent, reactive, onMounted } from 'vue'
import { Row, Col, Card, Button, Form, InputNumber, Select, Space } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { UploadImage } from '@/components/Upload'
import { getImageSize, compressImage } from '@/utils/image'
import { downloadImgByBase64 } from '@/utils/download'
import { IMAGE_COMPRESS, COMPRESS_IMG_SRC } from '@/settings/websiteSetting'
import SvgIcon from '@/components/SvgIcon'

interface FormState {
  width: number
  height: number
  ratio: number
  quality: number
  mimeType: string
}

interface ImageState {
  width: number
  height: number
  aspectRatio: number
  imgSrc: string
}

export default defineComponent({
  name: 'ImageCompress',
  setup() {
    const imageInfo = reactive<ImageState>({
      width: 1920,
      height: 1080,
      aspectRatio: 1920 / 1080,
      imgSrc: COMPRESS_IMG_SRC
    })

    const imageForm = reactive<FormState>({
      width: 1920,
      height: 1080,
      ratio: 100,
      quality: 1,
      mimeType: 'image/png'
    })

    onMounted(() => {
      getImageSize(COMPRESS_IMG_SRC).then(({ width, height }) => {
        imageForm.width = width
        imageForm.height = height
        imageInfo.width = width
        imageInfo.height = height
        imageInfo.aspectRatio = width / height
      })
    })

    const handleSuccess = (url: string) => {
      imageInfo.imgSrc = url
      getImageSize(url).then(({ width, height }) => {
        imageForm.width = width
        imageForm.height = height
        imageInfo.width = width
        imageInfo.height = height
        imageInfo.aspectRatio = width / height
      })
    }

    const handleChange = (value: number, type: 'width' | 'height') => {
      const getCalcVal =
        type === 'width'
          ? Number(Math.round(value * imageInfo.aspectRatio).toFixed(0))
          : Number(Math.round(value / imageInfo.aspectRatio).toFixed(0))
      const ratio = Number(Math.round((getCalcVal / imageInfo[type]) * 100).toFixed(2))
      imageForm[type] = getCalcVal
      console.log(getCalcVal, type)
      imageForm.ratio = ratio
    }

    const handleCompress = () => {
      const { width, height, quality, mimeType } = imageForm
      const fileType = mimeType.replace(/image\//, '') || 'png'
      compressImage(imageInfo.imgSrc, { width, height, quality, mimeType }).then((img: string) => {
        downloadImgByBase64(img, `compress-image.${fileType}`)
      })
    }

    return () => (
      <PageWrapper plugin={IMAGE_COMPRESS}>
        <Row gutter={12}>
          <Col span={16}>
            <Card title='图片区域' bodyStyle={{ height: '500px' }}>
              <div className='flex-center'>
                <div
                  style={{
                    width: '800px',
                    height: '450px',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${imageInfo.imgSrc})`
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='设置区域' bodyStyle={{ height: '500px' }}>
              <Form
                colon={false}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign='left'
                style={{ width: '300px', margin: '50px auto' }}
              >
                <Form.Item label='上传图片'>
                  <UploadImage name='选择图片' isFull onSuccess={handleSuccess} />
                </Form.Item>
                <Form.Item label='图片尺寸' style={{ marginBottom: 0 }}>
                  <Space>
                    <Form.Item name='width' noStyle>
                      <InputNumber
                        v-model:value={imageForm.width}
                        min={0}
                        max={imageInfo.width}
                        controls={false}
                        addonBefore={<span>宽</span>}
                        onChange={(value: any) => handleChange(value, 'height')}
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <SvgIcon name='linking' />
                    </Form.Item>
                    <Form.Item name='height' noStyle>
                      <InputNumber
                        v-model:value={imageForm.height}
                        min={0}
                        max={imageInfo.height}
                        controls={false}
                        addonBefore={<span>高</span>}
                        onChange={(value: any) => handleChange(value, 'width')}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label='压缩比例' name='ratio'>
                  <InputNumber
                    v-model:value={imageForm.ratio}
                    min={0}
                    max={100}
                    disabled
                    controls={false}
                    formatter={value => `${value}%`}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label='图片质量' name='quality'>
                  <Select
                    v-model:value={imageForm.quality}
                    options={[
                      { value: 1, label: 100 },
                      { value: 0.8, label: 80 },
                      { value: 0.6, label: 60 },
                      { value: 0.4, label: 40 }
                    ]}
                  />
                </Form.Item>
                <Form.Item label='图片格式' name='mimeType'>
                  <Select
                    v-model:value={imageForm.mimeType}
                    options={[
                      { value: 'image/png', label: 'PNG' },
                      { value: 'image/jpg', label: 'JPG' },
                      { value: 'image/bmp', label: 'BMP' }
                    ]}
                  />
                </Form.Item>
                <Form.Item label=' '>
                  <Button type='primary' style={{ width: '100%' }} onClick={handleCompress}>
                    压缩图片
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})

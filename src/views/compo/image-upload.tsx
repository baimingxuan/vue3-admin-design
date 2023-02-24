import type { UploadProps } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { Row, Col, Card, Button, Upload, Modal } from 'ant-design-vue'
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { PageWrapper } from '@/components/Page'
import { UPLOAD_COMPO } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')

    const dragImgs = ref<UploadProps['fileList']>([
      { uid: '-1', name: 'beautiful-girl.jpg' },
      { uid: '-2', name: 'beautiful-sunshine.jpg' }
    ])

    const listImgs = ref<UploadProps['fileList']>([
      {
        uid: '-1',
        name: 'beautiful-girl.jpg',
        status: 'done',
        url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img04.jpg',
        thumbUrl: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img04.jpg'
      },
      {
        uid: '-2',
        name: 'beautiful-sunshine.jpg',
        status: 'done',
        url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img03.jpg',
        thumbUrl: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img03.jpg'
      }
    ])

    async function handlePreview(file: any) {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }

    function getBase64(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    function handleCancle() {
      previewVisible.value = false
      previewTitle.value = ''
    }

    return () => (
      <PageWrapper plugin={UPLOAD_COMPO}>
        {{
          default: () => <Row gutter={12}>
              <Col span={8}>
                <Card title='拖拽上传' bordered={false} bodyStyle={{height: '300px'}}>
                  <Upload.Dragger
                    v-model:fileList={dragImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    multiple
                    class='muti-upload'
                  >
                    <p class="ant-upload-drag-icon" style='margin-bottom: 0;'>
                      <CloudUploadOutlined />
                    </p>
                    <p>将图片拖到此处, 或<span style='color: #1890ff;'>点击上传</span></p>
                    <p class="ant-upload-hint">只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
                  </Upload.Dragger>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='列表样式' bordered={false} bodyStyle={{height: '300px'}}>
                  <Upload
                    v-model:fileList={listImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture'
                    class='list-upload'
                  >
                    <Button type='primary'>
                      <CloudUploadOutlined />
                      <span>点击上传</span>
                    </Button>
                    <p class="ant-upload-hint">只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
                  </Upload>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='照片墙' bordered={false} bodyStyle={{height: '300px'}}>
                  <Upload
                    v-model:fileList={listImgs.value}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture-card'
                    class='list-upload'
                    onPreview={handlePreview}
                  >
                    <div>
                      <PlusOutlined />
                      <div style="margin-top: 8px">点击上传</div>
                    </div>
                  </Upload>
                </Card>
                <Modal
                  visible={previewVisible.value}
                  title={previewTitle.value}
                  footer={null}
                  onCancel={handleCancle}
                >
                  <img src={previewImage.value} style='width: 100%' />
                </Modal>
              </Col>
            </Row>
        }}
      </PageWrapper>
    )
  }
})
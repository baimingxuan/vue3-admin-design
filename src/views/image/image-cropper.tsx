import { defineComponent, reactive, ref, unref, nextTick } from 'vue'
import { Row, Col, Card, Button, Space } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUE_CROPPER_PLUGIN, CROPPER_IMG_SRC } from '@/settings/websiteSetting'
import { VueCropper } from 'vue-cropper'
import { UploadImage } from '@/components/Upload'
import 'vue-cropper/dist/index.css'

export default defineComponent({
  name: 'ImageCropper',
  setup() {
    const cropperRef = ref()
    const downloadDom = ref()
    const config = reactive({
      imgSrc: CROPPER_IMG_SRC,
      canMove: false,
      autoCrop: true,
      centerBox: true,
      info: true,
      infoTrue: true,
      full: true,
      autoCropWidth: 300,
      autoCropHeight: 200,
      outputType: 'png'
    })
    const downImg = ref('#')
    const previews = ref<Record<string, any>>({})

    function realTime(data: any) {
      previews.value = data
    }

    function handleSuccess(data: any) {
      config.imgSrc = data
    }

    function downloadImage() {
      cropperRef.value.getCropBlob(data => {
        downImg.value = window.URL.createObjectURL(data)
        nextTick(() => {
          downloadDom.value.click()
        })
      })
    }

    return () => (
      <PageWrapper plugin={VUE_CROPPER_PLUGIN}>
        <Row gutter={12}>
          <Col span={10}>
            <Card title='裁剪区域' bodyStyle={{ height: '400px' }}>
              <VueCropper
                ref={cropperRef}
                img={config.imgSrc}
                canMove={config.canMove}
                centerBox={config.centerBox}
                info={config.info}
                infoTrue={config.infoTrue}
                full={config.full}
                autoCrop={config.autoCrop}
                autoCropWidth={config.autoCropWidth}
                autoCropHeight={config.autoCropHeight}
                outputType={config.outputType}
                onRealTime={realTime}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card title='设置区域'>
              <div class='flex-center' style='height: 352px'>
                <Space direction='vertical'>
                  <UploadImage onSuccess={handleSuccess} />
                  <Button type='primary'>
                    <a onClick={downloadImage}>下载图片</a>
                  </Button>
                  <a ref={downloadDom} href={unref(downImg)} download='demo.png' />
                </Space>
              </div>
            </Card>
          </Col>
          <Col span={10}>
            <Card title='预览区域' bodyStyle={{ height: '400px' }}>
              <div
                style={{
                  width: unref(previews).w + 'px',
                  height: unref(previews).h + 'px',
                  overflow: 'hidden',
                  margin: 'auto',
                  zoom: 350 / unref(previews).h
                }}
              >
                <div style={unref(previews).div}>
                  <img src={unref(previews).url} style={unref(previews).img} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})

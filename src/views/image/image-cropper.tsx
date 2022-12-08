import { defineComponent, reactive, ref, unref, nextTick } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton, Space as AntdSpace } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUECROPPER_PLUGIN_URL, CROPPER_IMG_SRC } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import 'vue-cropper/dist/index.css'
import { VueCropper }  from 'vue-cropper'
import { UploadImage } from '@/components/Upload'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const cropper = ref()
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

    function openGithub() {
      openWindow(VUECROPPER_PLUGIN_URL)
    }

    function realTime(data: any) {
      previews.value = data
    }

    function handleSuccess(data: any) {
      config.imgSrc = data
    }

    function downloadImage() {
      cropper.value.getCropBlob(data => {
        downImg.value = window.URL.createObjectURL(data)
        nextTick(() => {
          downloadDom.value.click()
        })
      })
    }

    return () => (
      <PageWrapper name='Vue-Cropper 图片裁剪'>
        {{
          header: () => <>
            <p>vue-cropper: 一个优雅的图片裁剪插件, 可实现图片裁剪、图片生成等功能, 并支持生成png、jpeg、webp等图片格式。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => (
            <AntdRow gutter={12}>
              <AntdCol span={10}>
                <AntdCard title='裁剪区域' bordered={false} bodyStyle={{height: '400px'}}>
                  <VueCropper
                    ref={cropper}
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
                </AntdCard>
              </AntdCol>
              <AntdCol span={4}>
                <AntdCard title='设置区域' bordered={false}>
                  <div class='flex-center' style='height: 352px'>
                    <AntdSpace direction='vertical'>
                      <UploadImage onSuccess={handleSuccess} />
                      <AntdButton type='primary'>
                        <a onClick={downloadImage}>下载图片</a>
                      </AntdButton>
                      <a ref={downloadDom} href={unref(downImg)} download='demo.png' />
                    </AntdSpace>
                  </div>
                </AntdCard>
              </AntdCol>
              <AntdCol span={10}>
                <AntdCard title='预览区域' bordered={false} bodyStyle={{height: '400px'}}>
                  <div style={{
                    width: unref(previews).w + 'px',
                    height: unref(previews).h + 'px',
                    overflow: 'hidden',
                    margin: 'auto',
                    zoom: (350 / unref(previews).h)
                  }}>
                    <div style={unref(previews).div}>
                      <img src={unref(previews).url} style={unref(previews).img} />
                    </div>
                  </div>
                </AntdCard>
              </AntdCol>
            </AntdRow>
          )
        }}
      </PageWrapper>
    )
  }
})
import { defineComponent, ref } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUEDRAGRESIZE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import 'vue-cropper/dist/index.css'
import { VueCropper }  from 'vue-cropper'

export default defineComponent({
  name: 'Markdown',
  setup() {

    function openGithub() {
      openWindow(VUEDRAGRESIZE_PLUGIN_URL)
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
              <AntdCol span={5}>
                <AntdCard title='列表1事项' bordered={false} bodyStyle={{height: '400px'}}>
                  <VueCropper />
                </AntdCard>
              </AntdCol>
            </AntdRow>
          )
        }}
      </PageWrapper>
    )
  }
})
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { Card as AntdCard, Button as AntdButton } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUEDRAGRESIZE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import VueDragResize from 'vue-drag-resize'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const rectWrapper = ref()
    const config = reactive({
      x: 650,
      y: 130,
      width: 180,
      height: 180
    })
    const wrapperSize = reactive({
      width: 0,
      height: 0
    })

    onMounted(() => {
      changeWrapperSize()
      window.addEventListener('resize', changeWrapperSize)
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', changeWrapperSize)
    })
    
    function openGithub() {
      openWindow(VUEDRAGRESIZE_PLUGIN_URL)
    }

    function changeWrapperSize() {
      wrapperSize.width = rectWrapper.value.clientWidth
      wrapperSize.height = rectWrapper.value.clientHeight
    }

    function handleResize(newRect: any) {
      config.width = newRect.width
      config.height = newRect.height
      config.x = newRect.left
      config.y = newRect.top
    }
    
    return () => (
      <PageWrapper name='Vue-Drag-Resize 拖拽组件'>
        {{
          header: () => <>
            <p>vue-drag-resize: 一款用于可拖动和调整元素大小的 vue3 组件。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => (
              <AntdCard bordered={false} bodyStyle={{padding: 0}}>
                <div ref={rectWrapper} style='width: 100%; height: 500px;'>
                  <VueDragResize
                    isActive={true}
                    x={config.x}
                    y={config.y}
                    w={config.width}
                    h={config.height}
                    minw={100}
                    minh={100}
                    parentW={wrapperSize.width}
                    parentH={wrapperSize.height}
                    parentLimitation={true}
                    preventActiveBehavior={true}
                    onDragging={handleResize}
                    onResizing={handleResize}
                    style='background: #1890ff'
                  >
                    <div class='flex-center' style='height: 100%'>
                      <div style='width: 90px; color: #fff;'>
                        <p>x: {config.x}</p>
                        <p>y: {config.y}</p>
                        <p>width: {config.width}</p>
                        <p>height: {config.height}</p>
                      </div>
                    </div>
                  </VueDragResize>
                </div>
              </AntdCard>
            )
        }}
      </PageWrapper>
    )
  }
})
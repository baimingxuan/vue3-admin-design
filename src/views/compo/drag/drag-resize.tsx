import { defineComponent, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { VUE_DRAG_RESIZE_PLUGIN } from '@/settings/websiteSetting'
import VueDragResize from 'vue-drag-resize/src'

export default defineComponent({
  name: 'DragResize',
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
      <PageWrapper plugin={VUE_DRAG_RESIZE_PLUGIN}>
        {{
          default: () => (
              <Card bordered={false} bodyStyle={{padding: 0}}>
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
              </Card>
            )
        }}
      </PageWrapper>
    )
  }
})
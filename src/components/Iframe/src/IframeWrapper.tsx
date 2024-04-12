import type { PropType } from 'vue'
import { defineComponent, defineExpose, ref, unref, onMounted, onUnmounted } from 'vue'
import { Card } from 'ant-design-vue'

export default defineComponent({
  name: 'IframeWrapper',
  props: {
    iframeSrc: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { emit }) {
    const iframeRef = ref<HTMLIFrameElement>()
    const loading = ref(true)

    function handleLoading() {
      loading.value = false
    }

    function postMessage(message: any) {
      const iframe = unref(iframeRef)
      if (!iframe) return
      iframe.contentWindow?.postMessage(message, '*')
    }

    function reload() {
      loading.value = true
      const iframe = unref(iframeRef)
      if (!iframe) return
      iframe.contentWindow?.location.reload()
      loading.value = false
    }

    function messageHandler(e: MessageEvent) {
      emit('message', e.data)
    }

    onMounted(() => {
      window.addEventListener('message', messageHandler)
    })

    onUnmounted(() => {
      window.removeEventListener('message', messageHandler)
    })

    defineExpose({
      postMessage,
      reload
    })

    return () => (
      <div class='iframe-wrapper'>
        <Card loading={unref(loading)} bodyStyle={{ padding: 0 }}>
          <iframe
            ref={iframeRef}
            src={props.iframeSrc}
            width='100%'
            height='100%'
            style='border: none; overflow: hidden;'
            sandbox='allow-scripts allow-same-origin allow-popups'
            onLoad={handleLoading}
          />
        </Card>
      </div>
    )
  }
})

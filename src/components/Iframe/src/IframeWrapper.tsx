import type { PropType, CSSProperties } from 'vue'
import { defineComponent, ref, unref, computed, onMounted, onUnmounted } from 'vue'
import { Spin } from 'ant-design-vue'
import { useLayout } from '@/layout/useLayout'

export default defineComponent({
  name: 'IframeWrapper',
  props: {
    iframeSrc: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { emit, expose }) {
    const iframeRef = ref<HTMLIFrameElement>()
    const loading = ref(true)
    const { getContentHeight } = useLayout()

    const getWrapStyle = computed(
      (): CSSProperties => ({
        height: `calc(${unref(getContentHeight)} - 24px)`
      })
    )

    function handleLoaded() {
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

    expose({
      postMessage,
      reload
    })

    return () => (
      <div class='iframe-wrapper' style={unref(getWrapStyle)}>
        <Spin spinning={unref(loading)} size='large'>
          <iframe
            ref={iframeRef}
            src={props.iframeSrc}
            width='100%'
            height='100%'
            style={{ border: 'none', overflow: 'hidden', borderRadius: '4px', ...unref(getWrapStyle) }}
            sandbox='allow-scripts allow-same-origin allow-popups'
            onLoad={handleLoaded}
          />
        </Spin>
      </div>
    )
  }
})

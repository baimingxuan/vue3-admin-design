import type { PropType } from 'vue'
import { defineComponent, ref, unref, computed, onMounted, onUnmounted } from 'vue'
import { Card } from 'ant-design-vue'
import { useLayout } from '@/layout/useLayout'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'

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
    const loading = ref(false)
    const { getContentHeight } = useLayout()

    const iframeHeight = computed(() => `calc(${unref(getContentHeight)} - 32px)`)

    useWindowSizeFn(calcIframeHeight, { wait: 150, immediate: true })

    function calcIframeHeight() {
      const iframe = unref(iframeRef)
      if (!iframe) return

      iframe.style.height = unref(iframeHeight)
    }

    function handleLoaded() {
      loading.value = false
      calcIframeHeight()
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
      <div class='iframe-wrapper'>
        <Card loading={unref(loading)} bodyStyle={{ padding: 0 }}>
          <iframe
            ref={iframeRef}
            src={props.iframeSrc}
            width='100%'
            height='100%'
            style='border: none; overflow: hidden;'
            sandbox='allow-scripts allow-same-origin allow-popups'
            onLoad={handleLoaded}
          />
        </Card>
      </div>
    )
  }
})

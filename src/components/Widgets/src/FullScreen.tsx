import type { PropType } from 'vue'
import type { MaybeElementRef } from '@vueuse/core'
import { defineComponent, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FullScreen',
  props: {
    targetElement: {
      type: Object as PropType<MaybeElementRef>,
      default: document.body
    }
  },
  setup(props) {
    const { t } = useI18n()
    const { isFullscreen, toggle } = useFullscreen(props.targetElement)

    return () => (
      <span onClick={toggle}>
        <Tooltip
          title={
            unref(isFullscreen) ? `${t('components.widgets.exitFullScreen')}` : `${t('components.widgets.fullScreen')}`
          }
          placement='top'
          mouseEnterDelay={0.5}
        >
          <span class='icon-btn'>{!unref(isFullscreen) ? <ExpandOutlined /> : <CompressOutlined />}</span>
        </Tooltip>
      </span>
    )
  }
})

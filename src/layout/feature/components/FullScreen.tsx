import { defineComponent, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useFullscreen } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const { t } = useI18n()
    const { isFullscreen, toggle } = useFullscreen()

    return () => (
      <span onClick={toggle}>
        <Tooltip
          title={unref(isFullscreen) ? `${t('layout.feature.exitFullScreen')}` : `${t('layout.feature.fullScreen')}`}
          placement='bottom'
          mouseEnterDelay={0.5}
        >
          <span class='icon-btn'>
            {!unref(isFullscreen) ? (
              <SvgIcon name='screen-full' size={20} />
            ) : (
              <SvgIcon name='screen-normal' size={20} />
            )}
          </span>
        </Tooltip>
      </span>
    )
  }
})

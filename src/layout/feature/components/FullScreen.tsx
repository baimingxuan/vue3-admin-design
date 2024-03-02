import { defineComponent, computed, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useFullscreen } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon'

const { isFullscreen, toggle } = useFullscreen()

const getTitle = computed(() => {
  return unref(isFullscreen) ? '退出全屏' : '全屏'
})

export default defineComponent({
  name: 'FullScreen',
  setup() {
    return () => (
      <span onClick={toggle}>
        <Tooltip title={unref(getTitle)} placement='bottom' mouseEnterDelay={0.5}>
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

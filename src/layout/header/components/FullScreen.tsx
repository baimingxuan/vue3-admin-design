  import { defineComponent, computed, unref } from 'vue'
  
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { useFullscreen } from '@vueuse/core'
  import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'FullScreen',
    components: { AntdTooltip, ExpandOutlined, CompressOutlined },

    setup() {
      const { isFullscreen, toggle } = useFullscreen()

      const getTitle = computed(() => {
        return unref(isFullscreen) ? '退出全屏' : '全屏'
      })

      return () => (
        <AntdTooltip title={ getTitle } placement='bottom' mouseEnterDelay={ 0.5 }>
          <span onClick={ toggle }>
            <ExpandOutlined v-if={ !isFullscreen } />
            <CompressOutlined v-else />
          </span>
        </AntdTooltip>
      )
    }
  })
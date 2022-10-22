  import { defineComponent } from 'vue'
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  export default defineComponent({
    name: 'AppSearch',
    setup() {
      return () => (
        <AntdTooltip
          title="搜索"
          placement='bottom'
          mouseEnterDelay={0.5}
        >
          <span class='icon-btn'>
            <SvgIcon name='search' size={20} />
          </span>
        </AntdTooltip>
      )
    }
  })
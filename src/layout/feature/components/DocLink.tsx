import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'DocLink',

  setup() {
    return () => (
      <Tooltip title='文档' placement='bottom' mouseEnterDelay={0.5}>
        <span class='icon-btn'>
          <SvgIcon name='document' size={20} />
        </span>
      </Tooltip>
    )
  }
})

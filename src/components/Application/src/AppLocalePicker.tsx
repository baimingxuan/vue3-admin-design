import { defineComponent } from 'vue'
import { Dropdown, Menu, Tooltip } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'AppLocalePicker',

  setup() {

    return () => (
      <Dropdown trigger='click' placement='bottom'>
        {{
          default: () => (
            <Tooltip title='多语言' placement='bottom' mouseEnterDelay={0.5}>
              <span class='icon-btn'>
                <SvgIcon name='locale' size={20} />
              </span>
            </Tooltip>
          ),
          overlay: () => (
            <Menu>
              <Menu.Item>简体中文</Menu.Item>
              <Menu.Item>繁體中文</Menu.Item>
              <Menu.Item>English</Menu.Item>
            </Menu>
          )
        }}
      </Dropdown>
    )
  }
})

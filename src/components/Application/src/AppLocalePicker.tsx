import { defineComponent } from 'vue'
import { Dropdown,
  Menu,
  MenuItem,
  Tooltip
} from 'ant-design-vue'
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
              <MenuItem>简体中文</MenuItem>
              <MenuItem>繁體中文</MenuItem>
              <MenuItem>English</MenuItem>
            </Menu>
          )
        }}
      </Dropdown>
    )
  }
})

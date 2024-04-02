import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon'
import { openWindow } from '@/utils'
import { GITHUB_URL } from '@/settings/websiteSetting'

function openGithub() {
  openWindow(GITHUB_URL)
}

export default defineComponent({
  name: 'GithubLink',
  setup() {
    return () => (
      <span>
        <Tooltip title='Github' placement='bottom' mouseEnterDelay={0.5}>
          <span class='icon-btn' onClick={openGithub}>
            <SvgIcon name='github' size={20} />
          </span>
        </Tooltip>
      </span>
    )
  }
})

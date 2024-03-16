import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import { GithubFilled } from '@ant-design/icons-vue'
import { openWindow } from '@/utils'
import { GITHUB_URL } from '@/settings/websiteSetting'
import style from './index.module.less'

export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    return () => (
      <Layout.Footer class={[style['layout-footer'], 'flex-center']}>
        <div class={style['content']}>
          <span>Copyright &copy;2024</span>
          <GithubFilled onClick={() => openWindow(GITHUB_URL)} />
          <span>Baimingxuan</span>
        </div>
      </Layout.Footer>
    )
  }
})

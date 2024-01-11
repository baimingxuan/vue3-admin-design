import { defineComponent, unref } from 'vue'
import { Divider } from 'ant-design-vue'
import { AppSearch, AppLocalePicker } from '@/components/Application'
import { FullScreen, DocLink, GithubLink, UserDropdown } from './components'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import moduleStyle from './index.module.less'

export default defineComponent({
  name: 'LayoutFeature',

  setup() {
    const prefixCls = 'layout_feature'
    const { getShowSearch, getShowFullScreen, getShowLocale, getShowDoc, getShowGithub } = useHeaderSetting()

    return () => (
      <div class={moduleStyle[prefixCls]}>
        <div class={moduleStyle[`${prefixCls}-main`]}>
          {unref(getShowSearch) && <AppSearch />}
          {unref(getShowFullScreen) && <FullScreen />}
          {unref(getShowLocale) && <AppLocalePicker />}
          {unref(getShowDoc) && <DocLink />}
          {unref(getShowGithub) && <GithubLink />}
        </div>
        <Divider type='vertical' class='feature-divider' />
        <UserDropdown />
      </div>
    )
  }
})

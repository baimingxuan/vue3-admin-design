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
        { unref(getShowSearch) && <AppSearch class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowFullScreen) && <FullScreen class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowLocale) && <AppLocalePicker class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowDoc) && <DocLink class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowGithub) && <GithubLink /> }
        <Divider type='vertical' class={moduleStyle[`${prefixCls}-divider`]} />
        <UserDropdown />
      </div>
    )
  }
})
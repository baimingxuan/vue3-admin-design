import { defineComponent, unref } from 'vue'
import { Divider } from 'ant-design-vue'
import { Search, FullScreen, LocalePicker, DocLink, GithubLink, UserDropdown } from './components'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import moduleStyle from './index.module.less'

export default defineComponent({
  name: 'LayoutFeature',

  setup() {
    const prefixCls = 'layout_feature'
    const { getShowSearch, getShowFullScreen, getShowLocale, getShowDoc, getShowGithub } = useHeaderSetting()

    return () => (
      <div class={moduleStyle[prefixCls]}>
        { unref(getShowSearch) && <Search class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowFullScreen) && <FullScreen class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowLocale) && <LocalePicker class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowDoc) && <DocLink class={moduleStyle[`${prefixCls}-item`]} /> }
        { unref(getShowGithub) && <GithubLink /> }
        <Divider type='vertical' class={moduleStyle[`${prefixCls}-divider`]} />
        <UserDropdown />
      </div>
    )
  }
})
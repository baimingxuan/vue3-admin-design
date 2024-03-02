import { defineComponent, unref, computed } from 'vue'
import { Divider } from 'ant-design-vue'
import { AppSearch, AppLocalePicker } from '@/components/Application'
import { FullScreen, DocLink, GithubLink, UserDropdown } from './components'
import { AppModeEnum, ThemeEnum } from '@/enums/appEnum'
import { MenuTypeEnum } from '@/enums/menuEnum'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import moduleStyle from './index.module.less'

export default defineComponent({
  name: 'LayoutFeature',

  setup() {
    const prefixCls = 'layout_feature'
    const { getAppMode } = useBaseSetting()
    const { getMenuTheme, getMenuType } = useMenuSetting()
    const { getShowSearch, getShowFullScreen, getShowLocale, getShowDoc, getShowGithub } = useHeaderSetting()

    const getColor = computed((): string => {
      if (
        unref(getAppMode) === AppModeEnum.LIGHT &&
        unref(getMenuTheme) === ThemeEnum.DARK &&
        unref(getMenuType) === MenuTypeEnum.HEADER_MENU
      ) {
        return 'rgba(255, 255, 255, 0.65)'
      }
      return ''
    })

    return () => (
      <div class={moduleStyle[prefixCls]}>
        <div class={moduleStyle[`${prefixCls}-main`]} style={{ color: unref(getColor) }}>
          {unref(getShowSearch) && <AppSearch />}
          {unref(getShowFullScreen) && <FullScreen />}
          {unref(getShowLocale) && <AppLocalePicker />}
          {unref(getShowDoc) && <DocLink />}
          {unref(getShowGithub) && <GithubLink />}
        </div>
        <Divider type='vertical' class='feature-divider' style={{ borderColor: unref(getColor) }} />
        <UserDropdown />
      </div>
    )
  }
})

import { defineComponent, ref, unref } from 'vue'
import { Drawer, Divider, Button } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { AppDarkMode } from '@/components/Application'
import { useI18n } from 'vue-i18n'
import {
  MenuThemeRadio,
  MenuTypePicker,
  ThemeColorPicker,
  SwitchItem,
  SelectItem,
  InputNumItem,
  SettingFooter
} from './components'
import { menuTypeList, appThemeColorList } from './enum'
import Container from '@/components/Container'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { MenuTypeEnum } from '@/enums/menuEnum'
import { HandlerEnum, menuFoldBtnOptions, pageTransitionOptions } from './enum'
import styles from './index.module.less'

export default defineComponent({
  name: 'LayoutSetting',
  setup() {
    const { t } = useI18n()
    const drawerVisible = ref<boolean>(false)

    const toggleDrawer = () => {
      drawerVisible.value = !unref(drawerVisible)
    }

    const {
      getMenuType,
      getThemeColor,
      getMenuSplit,
      getMenuCanDrag,
      getMenuFixed,
      getMenuFold,
      getMenuFoldShowTitle,
      getMenuFoldBtn,
      getMenuWidth
    } = useMenuSetting()

    const { getLockScreenTime, getShowFooter, getColorWeak, getGrayMode, getTagsCached } = useBaseSetting()

    const {
      getShowBreadCrumb,
      getShowTags,
      getShowSearch,
      getShowFullScreen,
      getShowLocale,
      getShowDoc,
      getShowGithub
    } = useHeaderSetting()

    const { getOpenNProgress, getOpenTransition, getBasicTransition } = useTransitionSetting()

    function renderInterfaceFunc() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.menuSplit')}
            def={unref(getMenuSplit)}
            event={HandlerEnum.MENU_SPLIT}
            disabled={unref(getMenuType) !== MenuTypeEnum.HEADER_MENU}
          />
          <SwitchItem
            title={t('layout.setting.menuDrag')}
            def={unref(getMenuCanDrag)}
            event={HandlerEnum.MENU_CAN_DRAG}
            disabled={unref(getMenuType) !== MenuTypeEnum.SIDER_MENU}
          />
          <SwitchItem
            title={t('layout.setting.menuFixed')}
            def={unref(getMenuFixed)}
            event={HandlerEnum.MENU_FIXED}
            disabled={unref(getMenuType) !== MenuTypeEnum.HYBRID_MENU}
          />
          <SwitchItem
            title={t('layout.setting.menuCollapse')}
            def={unref(getMenuFold)}
            event={HandlerEnum.MENU_FOLD}
            disabled={unref(getMenuType) === MenuTypeEnum.HEADER_MENU}
          />
          <SwitchItem
            title={t('layout.setting.menuCollapseShowTitle')}
            def={unref(getMenuFoldShowTitle)}
            event={HandlerEnum.MENU_FOLD_SHOW_TITLE}
            disabled={unref(getMenuType) !== MenuTypeEnum.SIDER_MENU}
          />
          <SwitchItem
            title={t('layout.setting.tagsCached')}
            def={unref(getTagsCached)}
            event={HandlerEnum.PAGE_TAGS_CACHED}
          />
          <SelectItem
            title={t('layout.setting.menuCollapseButton')}
            def={unref(getMenuFoldBtn)}
            event={HandlerEnum.MENU_FOLD_BTN}
            options={menuFoldBtnOptions(t)}
          />
          <InputNumItem
            title={t('layout.setting.expandedMenuWidth')}
            min={160}
            max={320}
            step={10}
            event={HandlerEnum.MENU_WIDTH}
            defaultValue={unref(getMenuWidth)}
            formatter={(value: string) => `${parseInt(value)}px`}
          />
          <InputNumItem
            title={t('layout.setting.autoScreenLock')}
            min={0}
            event={HandlerEnum.LOCK_SCREEN_TIME}
            defaultValue={unref(getLockScreenTime)}
            formatter={(value: string) => {
              return parseInt(value) === 0
                ? `0(${t('layout.setting.notAutoScreenLock')})`
                : `${value}${t('layout.setting.minute')}`
            }}
          />
        </>
      )
    }

    function renderInterfaceShow() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.breadcrumb')}
            def={unref(getShowBreadCrumb)}
            event={HandlerEnum.SHOW_BREADCRUMB}
          />
          <SwitchItem title={t('layout.setting.tags')} def={unref(getShowTags)} event={HandlerEnum.SHOW_PAGE_TAGS} />
          <SwitchItem title={t('layout.setting.search')} def={unref(getShowSearch)} event={HandlerEnum.SHOW_SEARCH} />
          <SwitchItem
            title={t('layout.setting.fullScreen')}
            def={unref(getShowFullScreen)}
            event={HandlerEnum.SHOW_FULL_SCREEN}
          />
          <SwitchItem title={t('layout.setting.language')} def={unref(getShowLocale)} event={HandlerEnum.SHOW_LOCALE} />
          <SwitchItem title={t('layout.feature.document')} def={unref(getShowDoc)} event={HandlerEnum.SHOW_DOC} />
          <SwitchItem title='github' def={unref(getShowGithub)} event={HandlerEnum.SHOW_GITHUB} />
          <SwitchItem title={t('layout.setting.footer')} def={unref(getShowFooter)} event={HandlerEnum.SHOW_FOOTER} />
          <SwitchItem title={t('layout.setting.colorWeak')} def={unref(getColorWeak)} event={HandlerEnum.COLOR_WEAK} />
          <SwitchItem title={t('layout.setting.grayMode')} def={unref(getGrayMode)} event={HandlerEnum.GRAY_MODE} />
        </>
      )
    }

    function renderTransitionSetting() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.progress')}
            def={unref(getOpenNProgress)}
            event={HandlerEnum.OPEN_NPROGRESS}
          />
          <SwitchItem
            title={t('layout.setting.switchAnimation')}
            def={unref(getOpenTransition)}
            event={HandlerEnum.OPEN_TRANSITION}
          />
          <SelectItem
            title={t('layout.setting.animationType')}
            def={unref(getBasicTransition)}
            event={HandlerEnum.BASIC_TRANSITION}
            options={pageTransitionOptions}
            disabled={!unref(getOpenTransition)}
          />
        </>
      )
    }

    return () => (
      <>
        <Button
          class={styles['layout-setting-trigger']}
          type='primary'
          icon={<SettingOutlined />}
          onClick={toggleDrawer}
        />
        <Drawer
          visible={unref(drawerVisible)}
          closable={false}
          width='320'
          placement='right'
          class={styles['layout-setting-drawer']}
          onClose={toggleDrawer}
        >
          <Container>
            <Divider>{t('layout.setting.systemMode')}</Divider>
            <AppDarkMode />
            <Divider>{t('layout.setting.menuStyle')}</Divider>
            <div class='flex-between-h'>
              <MenuThemeRadio />
              <MenuTypePicker
                menuTypeList={menuTypeList(t)}
                def={unref(getMenuType)}
                event={HandlerEnum.CHANGE_LAYOUT}
              />
            </div>
            <Divider>{t('layout.setting.themeColor')}</Divider>
            <ThemeColorPicker
              colorList={appThemeColorList(t)}
              def={unref(getThemeColor)}
              event={HandlerEnum.CHANGE_THEME_COLOR}
            />
            <Divider>{t('layout.setting.interfaceFunction')}</Divider>
            {renderInterfaceFunc()}
            <Divider>{t('layout.setting.interfaceShow')}</Divider>
            {renderInterfaceShow()}
            <Divider>{t('layout.setting.animationSetting')}</Divider>
            {renderTransitionSetting()}
            <Divider />
            <SettingFooter />
          </Container>
        </Drawer>
      </>
    )
  }
})

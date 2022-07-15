<template>
  <div
    class="layout-setting-trigger"
    @click="toggleDrawer"
  >
    <AntdSettingOutlined />
  </div>
  <AntdDrawer
    :visible="drawerVisible"
    :closable="false"
    width="320"
    placement="right"
    @close="toggleDrawer"
  >
    <Container>
      <AntdDivider>主题风格</AntdDivider>
      <AppModeSwitch class="mx-auto" />
      <AntdDivider>菜单模式</AntdDivider>
      <MenuTypePicker
        :menuTypeList="menuTypeList"
        :def="unref(getMenuType)"
        :handler="(item: typeof menuTypeList[0]) => {
          baseHandler(HandlerEnum.CHANGE_LAYOUT, {
            menuMode: item.mode,
            menuType: item.type
          })
        }"
        />
      <AntdDivider>主题颜色</AntdDivider>
      <ThemeColorPicker
        :colorList="appThemeColorList"
        :def="unref(getThemeColor)"
        :event="HandlerEnum.CHANGE_THEME_COLOR"
      />
      <AntdDivider>界面功能</AntdDivider>
      <SwitchItem
        title="菜单分割"
        :def="unref(getMenuSplit)"
        :event="HandlerEnum.MENU_SPLIT"
      />
      <SwitchItem
        title="菜单折叠"
        :def="unref(getMenuFold)"
        :event="HandlerEnum.MENU_FOLD"
      />
      <SwitchItem
        title="菜单折叠显示名称"
        :def="unref(getMenuFoldShowTitle)"
        :event="HandlerEnum.MENU_FOLD_SHOW_TITLE"
      />
      <SelectItem
        title="菜单折叠按钮"
        :def="unref(getMenuFoldBtn)"
        :event="HandlerEnum.MENU_FOLD_BTN"
        :options="menuFoldBtnOptions"
      />
      <InputNumItem
        title="菜单展开宽度"
        :min="160"
        :max="320"
        :step="10"
        :event="HandlerEnum.MENU_WIDTH"
        :defaultValue="unref(getMenuWidth)"
        :formatter="(value: string) => `${parseInt(value)}px`"
      />
      <InputNumItem
        title="自动锁屏"
        :min="0"
        :event="HandlerEnum.LOCK_SCREEN_TIME"
        :defaultValue="unref(getLockScreenTime)"
        :formatter="(value: string) => {
          return parseInt(value) === 0
            ? `0(不自动锁屏)`
            : `${value}分钟`
        }"
      />
      <AntdDivider>界面显示</AntdDivider>
      <SwitchItem
        title="面包屑"
        :def="unref(getShowBreadCrumb)"
        :event="HandlerEnum.SHOW_BREADCRUMB"
      />
      <SwitchItem
        title="标签页"
        :def="unref(getShowPageTags)"
        :event="HandlerEnum.SHOW_PAGE_TAGS"
      />
      <SwitchItem
        title="国际化"
        :def="unref(getShowLocale)"
        :event="HandlerEnum.SHOW_LOCALE"
      />
      <SwitchItem
        title="全屏显示"
        :def="unref(getShowFullScreen)"
        :event="HandlerEnum.SHOW_FULL_SCREEN"
      />
      <SwitchItem
        title="文档"
        :def="unref(getShowDoc)"
        :event="HandlerEnum.SHOW_DOC"
      />
      <SwitchItem
        title="github"
        :def="unref(getShowGithub)"
        :event="HandlerEnum.SHOW_GITHUB"
      />
      <SwitchItem
        title="页脚"
        :def="unref(getShowFooter)"
        :event="HandlerEnum.SHOW_FOOTER"
      />
      <SwitchItem
        title="色弱模式"
        :def="unref(getColorWeak)"
        :event="HandlerEnum.COLOR_WEAK"
      />
      <AntdDivider>动画设置</AntdDivider>
      <SwitchItem
        title="顶部进度条"
        :def="unref(getOpenNProgress)"
        :event="HandlerEnum.OPEN_NPROGRESS"
      />
      <SwitchItem
        title="切换动画"
        :def="unref(getOpenTransition)"
        :event="HandlerEnum.OPEN_TRANSITION"
      />
    </Container>
  </AntdDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  
  import { Drawer as AntdDrawer, Divider as AntdDivider } from 'ant-design-vue'
  import { SettingOutlined as AntdSettingOutlined } from '@ant-design/icons-vue'

  import { AppModeSwitch, MenuTypePicker, ThemeColorPicker, SwitchItem, SelectItem, InputNumItem } from './components'
  import { menuTypeList, appThemeColorList } from './enum'
  import Scrollbar from '@/components/Scrollbar'
  import Container from '@/components/Container/index.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

  import { baseHandler } from './handler'
  import { HandlerEnum, menuFoldBtnOptions } from './enum'

  export default defineComponent({
    name: 'LayoutSetting',
    components: {
      AntdDrawer, AntdDivider, AntdSettingOutlined, AppModeSwitch, MenuTypePicker, ThemeColorPicker,
      Scrollbar, Container, SwitchItem, SelectItem, InputNumItem
    },
    setup() {
      const drawerVisible = ref<boolean>(false)

      const toggleDrawer = () => {
        drawerVisible.value = !unref(drawerVisible)
      }

      const { getMenuType, getThemeColor, getMenuSplit, getMenuFold, getMenuFoldShowTitle, getMenuFoldBtn, getMenuWidth } = useMenuSetting()
      const { getLockScreenTime, getShowFooter, getColorWeak } = useBaseSetting()
      const { getShowBreadCrumb, getShowPageTags, getShowLocale, getShowFullScreen, getShowDoc, getShowGithub } = useHeaderSetting()
      const { getOpenNProgress, getOpenTransition } = useTransitionSetting()

      return {
        unref,
        getMenuType,
        getThemeColor,
        getMenuSplit,
        getMenuFold,
        getMenuFoldShowTitle,
        getMenuFoldBtn,
        getMenuWidth,
        getLockScreenTime,
        getShowBreadCrumb,
        getShowLocale,
        getShowFullScreen,
        getShowDoc,
        getShowGithub,
        getShowPageTags,
        getShowFooter,
        getColorWeak,
        getOpenNProgress,
        getOpenTransition,
        menuFoldBtnOptions,
        drawerVisible,
        toggleDrawer,
        menuTypeList,
        appThemeColorList,
        baseHandler,
        HandlerEnum
      }
    }
  })
</script>

<style lang="less" scoped>
  .layout-setting-trigger {
    position: fixed;
    top: 240px;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    font-size: 18px;
    color: #fff;
    background-color: #1890ff;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
  }
</style>
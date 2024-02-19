<template>
  <Button class="layout-setting-trigger" type="primary" @click="toggleDrawer">
    <template #icon>
      <SettingOutlined />
    </template>
  </Button>
  <Drawer
    :visible="drawerVisible"
    :closable="false"
    width="320"
    placement="right"
    class="layout_setting-drawer"
    @close="toggleDrawer"
  >
    <Container>
      <Divider>系统风格</Divider>
      <AppDarkMode />
      <Divider>菜单模式</Divider>
      <div class="flex-between-h">
        <MenuThemeRadio />
        <MenuTypePicker :menuTypeList="menuTypeList" :def="unref(getMenuType)" :event="HandlerEnum.CHANGE_LAYOUT" />
      </div>
      <Divider>主题颜色</Divider>
      <ThemeColorPicker
        :colorList="appThemeColorList"
        :def="unref(getThemeColor)"
        :event="HandlerEnum.CHANGE_THEME_COLOR"
      />
      <Divider>界面功能</Divider>
      <SwitchItem
        title="菜单分割"
        :def="unref(getMenuSplit)"
        :event="HandlerEnum.MENU_SPLIT"
        :disabled="unref(getMenuType) !== MenuTypeEnum.HEADER_MENU"
      />
      <SwitchItem
        title="菜单宽度拖拽"
        :def="unref(getMenuCanDrag)"
        :event="HandlerEnum.MENU_CAN_DRAG"
        :disabled="unref(getMenuType) !== MenuTypeEnum.SIDER_MENU"
      />
      <SwitchItem
        title="菜单固定"
        :def="unref(getMenuFixed)"
        :event="HandlerEnum.MENU_FIXED"
        :disabled="unref(getMenuType) !== MenuTypeEnum.HYBRID_MENU"
      />
      <SwitchItem
        title="菜单折叠"
        :def="unref(getMenuFold)"
        :event="HandlerEnum.MENU_FOLD"
        :disabled="unref(getMenuType) === MenuTypeEnum.HEADER_MENU"
      />
      <SwitchItem
        title="菜单折叠显示名称"
        :def="unref(getMenuFoldShowTitle)"
        :event="HandlerEnum.MENU_FOLD_SHOW_TITLE"
      />
      <SwitchItem title="标签缓存" :def="unref(getTagsCached)" :event="HandlerEnum.PAGE_TAGS_CACHED" />
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
        :formatter="
          (value: string) => {
            return parseInt(value) === 0 ? `0(不自动锁屏)` : `${value}分钟`
          }
        "
      />
      <Divider>界面显示</Divider>
      <SwitchItem title="面包屑" :def="unref(getShowBreadCrumb)" :event="HandlerEnum.SHOW_BREADCRUMB" />
      <SwitchItem title="标签页" :def="unref(getShowTags)" :event="HandlerEnum.SHOW_PAGE_TAGS" />
      <SwitchItem title="搜索" :def="unref(getShowSearch)" :event="HandlerEnum.SHOW_SEARCH" />
      <SwitchItem title="全屏显示" :def="unref(getShowFullScreen)" :event="HandlerEnum.SHOW_FULL_SCREEN" />
      <SwitchItem title="国际化" :def="unref(getShowLocale)" :event="HandlerEnum.SHOW_LOCALE" />
      <SwitchItem title="文档" :def="unref(getShowDoc)" :event="HandlerEnum.SHOW_DOC" />
      <SwitchItem title="github" :def="unref(getShowGithub)" :event="HandlerEnum.SHOW_GITHUB" />
      <SwitchItem title="页脚" :def="unref(getShowFooter)" :event="HandlerEnum.SHOW_FOOTER" />
      <SwitchItem title="色弱模式" :def="unref(getColorWeak)" :event="HandlerEnum.COLOR_WEAK" />
      <SwitchItem title="灰色模式" :def="unref(getGrayMode)" :event="HandlerEnum.GRAY_MODE" />
      <Divider>动画设置</Divider>
      <SwitchItem title="顶部进度条" :def="unref(getOpenNProgress)" :event="HandlerEnum.OPEN_NPROGRESS" />
      <SwitchItem title="切换loading" :def="unref(getOpenPageLoading)" :event="HandlerEnum.OPEN_PAGE_LOADING" />
      <SwitchItem title="切换动画" :def="unref(getOpenTransition)" :event="HandlerEnum.OPEN_TRANSITION" />
      <SelectItem
        title="切换动画类型"
        :def="unref(getBasicTransition)"
        :event="HandlerEnum.BASIC_TRANSITION"
        :options="pageTransitionOptions"
      />
      <Divider />
      <SettingFooter />
    </Container>
  </Drawer>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'

import { Drawer, Divider, Button } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'

import { AppDarkMode } from '@/components/Application'
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
import Container from '@/components/Container/index.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { MenuTypeEnum } from '@/enums/menuEnum'
import { HandlerEnum, menuFoldBtnOptions, pageTransitionOptions } from './enum'

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

const { getShowBreadCrumb, getShowTags, getShowSearch, getShowFullScreen, getShowLocale, getShowDoc, getShowGithub } =
  useHeaderSetting()

const { getOpenNProgress, getOpenPageLoading, getOpenTransition, getBasicTransition } = useTransitionSetting()
</script>

<style lang="less">
.layout-setting-trigger {
  position: fixed !important;
  top: 320px;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px !important;
  height: 40px;
  font-size: 16px;
  color: @white;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;

  svg {
    color: @white;
  }
}

.layout_setting-drawer {
  .ant-drawer-body {
    .scrollbar__wrap {
      padding: 0 16px 20px !important;
    }
  }
}
</style>

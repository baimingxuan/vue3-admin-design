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
      <AntdDivider>界面功能 </AntdDivider>
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
      <div style="height: 1000px;"></div>
    </Container>
  </AntdDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  
  import { Drawer as AntdDrawer, Divider as AntdDivider } from 'ant-design-vue'
  import { SettingOutlined as AntdSettingOutlined } from '@ant-design/icons-vue'

  import { AppModeSwitch, MenuTypePicker, ThemeColorPicker, SwitchItem, SelectItem } from './components'
  import { menuTypeList, appThemeColorList } from './enum'
  import Scrollbar from '@/components/Scrollbar'
  import Container from '@/components/Container/index.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  import { baseHandler } from './handler'
  import { HandlerEnum, menuFoldBtnOptions } from './enum'

  export default defineComponent({
    name: 'LayoutSetting',
    components: {
      AntdDrawer, AntdDivider, AntdSettingOutlined, AppModeSwitch, MenuTypePicker, ThemeColorPicker,
      Scrollbar, Container, SwitchItem, SelectItem
    },
    setup() {
      const drawerVisible = ref<boolean>(false)

      const toggleDrawer = () => {
        drawerVisible.value = !unref(drawerVisible)
      }

      const { getMenuType, getThemeColor, getMenuSplit, getMenuFold, getMenuFoldShowTitle, getMenuFoldBtn } = useMenuSetting()

      return {
        unref,
        getMenuType,
        getThemeColor,
        getMenuSplit,
        getMenuFold,
        getMenuFoldShowTitle,
        getMenuFoldBtn,
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
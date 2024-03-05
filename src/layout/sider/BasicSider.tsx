import { defineComponent, ref, unref, computed } from 'vue'
import { LayoutSider } from 'ant-design-vue'
import SiderTrigger from './components/SiderTrigger'
import DragBar from './components/DragBar'
import LayoutMenu from '@/layout/menu'
import { AppLogo } from '@/components/Application'
import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { useDragLine } from './useLayoutSider'
import { ThemeEnum } from '@/enums/appEnum'

export default defineComponent({
  name: 'BasicSider',
  setup() {
    const siderRef = ref<ElRef>(null)
    const dragBarRef = ref<ElRef>(null)

    const { isDarkMode } = useDarkModeSetting()

    const getSiderMode = computed(() => {
      return unref(isDarkMode) ? ThemeEnum.LIGHT : unref(getMenuTheme)
    })

    const { getMenuType, getMenuTheme, getMenuWidth, getMenuFold, getMenuFoldBtn, getMenuSplit, getMenuFoldShowTitle } =
      useMenuSetting()

    const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.SIDER)

    const getTriggerAttr = computed(() => (unref(getShowTrigger) ? {} : { trigger: null }))

    const getShowSider = computed(() => {
      return (
        unref(getMenuType) === MenuTypeEnum.SIDER_MENU ||
        (unref(getMenuType) === MenuTypeEnum.HEADER_MENU && unref(getMenuSplit))
      )
    })

    const getMenuFoldWidth = computed(() => {
      return unref(getMenuFold) && !unref(getMenuFoldShowTitle) ? 48 : 80
    })

    const getIsSplited = computed(() => unref(getMenuSplit))

    useDragLine(siderRef, dragBarRef)

    return () => (
      <>
        {unref(getShowSider) && (
          <LayoutSider
            {...unref(getTriggerAttr)}
            ref={siderRef}
            breakpoint='lg'
            collapsible={true}
            theme={unref(getSiderMode)}
            width={unref(getMenuWidth)}
            collapsedWidth={unref(getMenuFoldWidth)}
            collapsed={unref(getMenuFold)}
          >
            {{
              trigger: () => unref(getShowTrigger) && <SiderTrigger />,
              default: () => (
                <>
                  {!unref(getIsSplited) && <AppLogo />}
                  <div style={{ height: 'calc(100vh - 48px)' }}>
                    <LayoutMenu
                      menuMode={MenuModeEnum.INLINE}
                      menuTheme={unref(getSiderMode)}
                      isSplitedMenu={unref(getIsSplited)}
                      isHorizontal={false}
                    />
                  </div>
                  <DragBar ref={dragBarRef} />
                </>
              )
            }}
          </LayoutSider>
        )}
      </>
    )
  }
})

import type { CSSProperties } from 'vue'
import { defineComponent, computed, ref, unref, nextTick, TransitionGroup } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { useTagStore } from '@/stores/modules/tags'
import { initAffixTags } from './useTags'
import { useGo } from '@/hooks/web/usePage'
import { useTags } from '@/hooks/web/useTags'
import { AppModeEnum, ThemeEnum } from '@/enums/appEnum'
import { MenuTypeEnum } from '@/enums/menuEnum'
import TagItem from './components/TagItem'
import './index.less'

export default defineComponent({
  name: 'LayoutTags',
  props: {
    isHeaderTags: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const tagsMain = ref<ElRef>(null)
    const tagsMainCont = ref<ElRef>(null)

    const tagsContLeft = ref(0)
    const loading = ref(false)
    const activeKeyRef = ref('')
    const router = useRouter()
    const tagStore = useTagStore()
    const go = useGo()

    const { getAppMode } = useBaseSetting()
    const { getMenuTheme, getMenuType, getIsHeaderMenu } = useMenuSetting()
    const { isDarkMode } = useDarkModeSetting()

    const { refresh, closeLeft, closeRight, closeOther, closeAll } = useTags()

    const getTagsMode = computed(() => {
      return !unref(isDarkMode) ? (unref(getIsHeaderMenu) ? unref(getMenuTheme) : '') : ''
    })

    const getTagsList = computed(() => {
      return tagStore.getVisitedTags.filter(item => !item.meta?.hideTag)
    })

    const getBtnStyle = computed((): CSSProperties => {
      if (
        unref(getAppMode) === AppModeEnum.LIGHT &&
        unref(getMenuTheme) === ThemeEnum.DARK &&
        unref(getMenuType) === MenuTypeEnum.HEADER_MENU
      ) {
        return {
          color: 'rgba(255, 255, 255, 0.65)',
          backgroundColor: 'transparent',
          border: 'solid 1px rgba(255, 255, 255, 0.65)'
        }
      }
      return {}
    })

    const isDark = computed(
      () =>
        unref(getAppMode) === AppModeEnum.LIGHT &&
        unref(getMenuTheme) === ThemeEnum.DARK &&
        unref(getMenuType) === MenuTypeEnum.HEADER_MENU
    )

    initAffixTags()

    listenerRouteChange(route => {
      if (!route || route.name === 'Redirect') return

      const { path, fullPath } = route
      const currPath = fullPath || path
      if (activeKeyRef.value !== currPath) {
        activeKeyRef.value = currPath as string
      }

      tagStore.addVisitedTags(unref(route))

      getActiveTag()
    })

    function handleClickTag(activeKey: string) {
      activeKeyRef.value = activeKey
      go(activeKey, false)
    }

    function getActiveTag() {
      nextTick(() => {
        const tagNodeList = unref(tagsMainCont)?.childNodes as unknown as Array<HTMLElement>
        const activeTagNode = Array.from(tagNodeList).find(item => item.dataset?.path === unref(activeKeyRef))!
        moveToActiveTag(activeTagNode)
      })
    }

    function handleCloseTag(targetKey: string) {
      tagStore.closeTagByKey(targetKey, router)
    }

    async function handleReload() {
      loading.value = true
      await refresh()
      setTimeout(() => {
        loading.value = false
        // Animation execution time
      }, 1000)
    }

    function moveToActiveTag(tag: any) {
      const mainContPadding = 4
      const mainWidth = unref(tagsMain)?.offsetWidth!
      const mainContWidth = unref(tagsMainCont)?.offsetWidth!

      if (mainContWidth < mainWidth) {
        tagsContLeft.value = 0
      } else if (tag?.offsetLeft! < -tagsContLeft.value) {
        // The active tag on the left side of the layout_tags-main
        tagsContLeft.value = -tag?.offsetLeft! + mainContPadding
      } else if (
        tag?.offsetLeft! > -tagsContLeft.value &&
        tag?.offsetLeft! + tag?.offsetWidth! < -tagsContLeft.value + mainWidth
      ) {
        // The active tag on the layout_tags-main
        tagsContLeft.value = Math.min(0, mainWidth - tag?.offsetWidth! - tag?.offsetLeft! - mainContPadding)
      } else {
        // The active tag on the right side of the layout_tags-main
        tagsContLeft.value = -(tag?.offsetLeft! - (mainWidth - mainContPadding - tag?.offsetWidth!))
      }
    }

    function handleMove(offset: number): void {
      const mainWidth = unref(tagsMain)?.offsetWidth!
      const mainContWidth = unref(tagsMainCont)?.offsetWidth!

      if (offset > 0) {
        tagsContLeft.value = Math.min(0, tagsContLeft.value + offset)
      } else {
        if (mainWidth < mainContWidth) {
          if (tagsContLeft.value >= -(mainContWidth - mainWidth)) {
            tagsContLeft.value = Math.max(tagsContLeft.value + offset, mainWidth - mainContWidth)
          }
        } else {
          tagsContLeft.value = 0
        }
      }
    }

    function handleScroll(e: WheelEvent) {
      const type = e.type
      let distance: number = 0

      if (type === 'wheel') {
        distance = e.deltaY ? e.deltaY * 2 : -(e.detail || 0) * 2
      }

      handleMove(distance)
    }

    return () => (
      <div class={['layout-tags', unref(getTagsMode), { 'single-tags': !props.isHeaderTags }]}>
        <Button
          class='layout-tags__btn'
          icon={<LeftOutlined />}
          size='small'
          style={unref(getBtnStyle)}
          onClick={() => handleMove(200)}
        />
        <div ref={tagsMain} class='layout-tags__main' onWheel={handleScroll}>
          <div ref={tagsMainCont} class='layout-tags__main-cont' style={{ left: `${unref(tagsContLeft)}px` }}>
            <TransitionGroup>
              {unref(getTagsList).map(item => (
                <span key={item.path} data-path={item.path}>
                  <TagItem
                    name={item.meta.title}
                    active={unref(activeKeyRef) === item.path}
                    fixed={item.meta?.affix}
                    isDark={unref(isDark)}
                    onClick={() => handleClickTag(item.path)}
                    onCloseTag={() => handleCloseTag(item.path)}
                  />
                </span>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <Button
          class='layout-tags__btn'
          icon={<RightOutlined />}
          size='small'
          style={unref(getBtnStyle)}
          onClick={() => handleMove(-200)}
        />
        <Button
          class='layout-tags__btn layout-tags__btn-space'
          icon={<RedoOutlined spin={unref(loading)} />}
          size='small'
          style={unref(getBtnStyle)}
          onClick={handleReload}
        />
        <Dropdown placement='bottomRight'>
          {{
            default: () => (
              <Button
                class='layout-tags__btn layout-tags__btn-space'
                icon={<CloseOutlined />}
                size='small'
                style={unref(getBtnStyle)}
              />
            ),
            overlay: () => (
              <Menu>
                <MenuItem onClick={closeLeft}>{t('layout.tags.closeLeft')}</MenuItem>
                <MenuItem onClick={closeRight}>{t('layout.tags.closeRight')}</MenuItem>
                <MenuItem onClick={closeOther}>{t('layout.tags.closeOther')}</MenuItem>
                <MenuItem onClick={closeAll}>{t('layout.tags.closeAll')}</MenuItem>
              </Menu>
            )
          }}
        </Dropdown>
      </div>
    )
  }
})

import { computed, unref } from 'vue'
import { css } from '@emotion/css'
import { hasClass } from '@/utils/dom'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

export function setThemColor(el: Element) {
  const { getThemeColor } = useBaseSetting()
  const themeColor = unref(getThemeColor) || '#1890ff'

  const htmlCls = computed(
    () => css`
      .layout-hybrid-sider {
        .main-menu__item.is-active {
          background: ${themeColor};
        }
        &.light {
          .main-menu__item {
            &.is-active {
              color: ${themeColor};
              background: #fff;
            }
            &:hover,
            &.is-active {
              &::before {
                background: ${themeColor};
              }
            }
          }
          .sub-menu__title {
            .pushpin:hover {
              color: ${themeColor};
            }
          }
        }
      }
    `
  )

  if (hasClass(el, 'dark')) {
    el.className = `${unref(htmlCls)} dark`
  } else {
    el.className = unref(htmlCls)
  }
}

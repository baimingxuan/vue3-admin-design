import type { Ref } from 'vue'
import { unref, onMounted, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

/**
 * Handle menu drag and drop related operations
 * @param siderRef
 * @param dragBarRef
 */
export function useDragLine(siderRef: Ref<any>, dragBarRef: Ref<any>, mix = false) {
  const { getSideBarMinWidth, getMenuFold, setMenuSetting } = useMenuSetting()

  onMounted(() => {
    nextTick(() => {
      const exec = useDebounceFn(changeWrapWidth, 80)
      exec()
    })
  })

  function getEle(elRef: Ref<ElRef | ComponentRef>): any {
    const el = unref(elRef)
    if (!el) return null

    if (Reflect.has(el, '$el')) {
      return (unref(elRef) as ComponentRef)?.$el
    }

    return unref(elRef)
  }

  function handleMouseMove(ele: HTMLElement, wrap: HTMLElement, clientX: number) {
    document.onmousemove = innerE => {
      let iT = (ele as any).left + (innerE.clientX - clientX)
      innerE = innerE || window.event
      const maxT = 350
      const minT = unref(getSideBarMinWidth)
      iT < 0 && (iT = 0)
      iT > maxT && (iT = maxT)
      iT < minT && (iT = minT)
      ele.style.left = wrap.style.width = iT + 'px'
      return false
    }
  }

  // Drag and drop in the menu area-release the mouse
  function removeMouseup(ele: any) {
    const wrap = getEle(siderRef)
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      wrap.style.transition = 'width 0.2s'
      const width = parseInt(wrap.style.width)

      if (!mix) {
        const miniWidth = unref(getSideBarMinWidth)
        if (!unref(getMenuFold)) {
          width > miniWidth + 20 ? setMenuSetting({ menuWidth: width }) : setMenuSetting({ menuFold: true })
        } else {
          width > miniWidth && setMenuSetting({ menuFold: false, menuWidth: width })
        }
      } else {
        setMenuSetting({ menuWidth: width })
      }

      ele.releaseCapture?.()
    }
  }

  function changeWrapWidth() {
    const ele = getEle(dragBarRef)
    if (!ele) return

    const wrap = getEle(siderRef)
    if (!wrap) return

    ele.onmousedown = (e: any) => {
      wrap.style.transition = 'unset'
      const clientX = e?.clientX
      ele.left = ele.offsetLeft
      handleMouseMove(ele, wrap, clientX)
      removeMouseup(ele)
      ele.setCapture?.()
      return false
    }
  }

  return {}
}

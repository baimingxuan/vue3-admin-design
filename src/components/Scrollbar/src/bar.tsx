import { defineComponent, computed, ref, getCurrentInstance, onUnmounted, inject, type Ref } from 'vue'
import { on, off } from '@/utils/dom'

import { BAR_MAP, renderThumbStyle } from './util'

export default defineComponent({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  setup(props) {
    const thumb = ref()
    const cursorDown = ref()
    const barStore = ref<Recordable>({})
    const wrap = inject('scroll-bar-wrap', {} as Ref<Nullable<HTMLElement>>) as any
    const instance = getCurrentInstance()

    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })

    function clickThumbHandler(e: any): void {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) return
      window.getSelection()?.removeAllRanges()
      startDrag(e)
      barStore.value[bar.value.axis] =
        e.currentTarget[bar.value.offset] -
        (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction])
    }

    function clickTrackHandler(e: any): void {
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client])
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / instance?.vnode.el?.[bar.value.offset]

      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    function startDrag(e: any): void {
      e.stopImmediatePropagation()
      cursorDown.value = true
      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    function mouseMoveDocumentHandler(e: any): void {
      if (cursorDown.value === false) return
      const prevPage = barStore.value[bar.value.axis]

      if (!prevPage) return

      const offset = (instance?.vnode.el?.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / instance?.vnode.el?.[bar.value.offset]
      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    function mouseUpDocumentHandler(): void {
      cursorDown.value = false
      barStore.value[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    onUnmounted(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return () => (
      <div class={['scrollbar__bar', 'is-' + bar.value.key]} onMousedown={clickTrackHandler}>
        <div
          ref={thumb}
          class='scrollbar__thumb'
          onMousedown={clickThumbHandler}
          style={renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value
          })}
        ></div>
      </div>
    )
  }
})

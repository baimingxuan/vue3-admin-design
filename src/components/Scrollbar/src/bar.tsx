import { defineComponent, h, computed, ref, getCurrentInstance, onUnmounted, inject, Ref } from 'vue'
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
    const cursorDown = ref(false)
    const instance = getCurrentInstance()
    

    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })

    function clickThumbHandler() {}

    function clickTrackHandler() {}

    function mouseMoveDocumentHandler(e: any):void {
      
    }

    function mouseUpDocumentHandler(): void {
      cursorDown.value = false

      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    onUnmounted(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return () => (
      <div
        class={ ['scrollbar__bar', 'is-' + bar.value.key] }
        onMousedown={ clickTrackHandler } >
        <div
          ref="thumb"
          class="scrollbar__thumb"
          onMousedown={ clickThumbHandler }
          style={ renderThumbStyle({
              size: props.size,
              move: props.move,
              bar: bar.value
            })
          }>
        </div>
      </div>
    )
  }
})
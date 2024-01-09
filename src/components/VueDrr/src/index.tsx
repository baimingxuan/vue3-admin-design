import type { CSSProperties } from 'vue'
import { defineComponent, reactive, unref, computed } from 'vue'
import { props } from './props'

export default defineComponent({
  name: 'VueDrr',
  props,
  setup(props) {
    const config = reactive({
      top: props.y,
      left: props.x,
      width: props.w,
      height: props.h,
      rotateAngle: props.angle,
      enabled: props.active,
      zIndex: props.z,
      resizing: false,
      dragging: false,
      rotating: false,
      handle: null,
      parentW: 9999,
      parentH: 9999,
      mouseX: 0,
      mouseY: 0,
      lastMouseX: 0,
      lastMouseY: 0,
      mouseOffX: 0,
      mouseOffY: 0,
      elmX: 0,
      elmY: 0,
      elmW: 0,
      elmH: 0
    })

    const getWrapStyle = computed(
      (): CSSProperties => ({
        top: config.top + 'px',
        left: config.left + 'px',
        width: config.width + 'px',
        height: config.height + 'px',
        transform: 'rotate(' + config.rotateAngle + 'deg)',
        zIndex: config.zIndex as CSSProperties['zIndex'],
        overflowY: props.overflowY
      })
    )

    return () => <div class='drr-container' style={unref(getWrapStyle)}></div>
  }
})

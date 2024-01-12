import type { PropType } from 'vue'
import type { ElementState, handlerType } from './types'
import { handlerEnum } from './types'
import { defineComponent, computed, ref, unref, reactive, watch } from 'vue'
import VueDragResize from 'vue-drag-resize/src'

export default defineComponent({
  name: 'DndNode',
  props: {
    element: {
      type: Object as PropType<ElementState>,
      default: () => ({})
    },
    handlers: {
      type: Array as PropType<handlerType[]>,
      default: () => ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw']
    }
  },
  setup(props, { slots, emit }) {
    const nodeRef = ref(null)
    const nodeState = reactive<ElementState>(props.element)

    const sticksList = computed(() => props.handlers.map((item: handlerType) => handlerEnum[item]))

    watch(
      () => nodeState,
      state => {
        emit('update:element', state)
      }
    )

    function calcTextNodeHeight({ x, y }) {
      const node = unref(nodeRef)
      console.log(x, y)
      if (node && nodeState.type === 'text') {
        console.log(node)
      }
    }

    function handleDragStop({ left, top }) {
      nodeState.x = left
      nodeState.y = top
    }

    function handleResizing({ left, top }) {
      if (nodeState.type === 'text') {
        calcTextNodeHeight({ x: left, y: top })
      }
    }

    function handleResizeStop({ left, top, width, height }) {
      nodeState.x = left
      nodeState.y = top
      nodeState.w = width
      nodeState.h = height
      if (nodeState.type === 'text') {
        calcTextNodeHeight({ x: left, y: top })
      }
    }

    function handleActivated() {
      nodeState.active = true
    }

    function handleDeactivate() {
      nodeState.active = false
    }

    return () => (
      <VueDragResize
        ref={nodeRef}
        isActive={nodeState.active}
        x={nodeState.x}
        y={nodeState.y}
        z={nodeState.z}
        w={nodeState.w}
        h={nodeState.h}
        minw={80}
        minh={24}
        sticks={unref(sticksList)}
        parentLimitation={true}
        preventActiveBehavior={true}
        onDragstop={handleDragStop}
        onResizing={handleResizing}
        onResizestop={handleResizeStop}
        onActivated={handleActivated}
        onDeactivated={handleDeactivate}
      >
        {slots.default?.()}
      </VueDragResize>
    )
  }
})

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
  emits: ['change'],
  setup(props, { slots, emit }) {
    const nodeRef = ref<InstanceType<typeof VueDragResize> | null>(null)
    const nodeState = reactive<ElementState>(props.element)

    const sticksList = computed(() => props.handlers.map((item: handlerType) => handlerEnum[item]))

    watch(nodeState, () => {
      emit('change', nodeState)
    })

    watch(
      () => props.element,
      (ele: ElementState) => {
        if (ele.type === 'text') {
          calcTextNodeHeight(ele.y)
        }
      },
      { deep: true }
    )

    function calcTextNodeHeight(y: number) {
      const node = unref(nodeRef)?.$el
      if (node && nodeState.type === 'text') {
        const viewHeight = Math.ceil((node.parentNode as HTMLDivElement)?.getBoundingClientRect().height)
        const childNodeHeight = Math.ceil(node.querySelector('.rich-text-input')!.getBoundingClientRect().height)
        if (y + childNodeHeight >= viewHeight) {
          nodeState.y = viewHeight - childNodeHeight
        }
        node.style.height = `${childNodeHeight}px`
        nodeState.h = childNodeHeight
      }
    }

    function handleDragStop({ left, top }) {
      nodeState.x = left
      nodeState.y = top
    }

    function handleResizing({ top }) {
      if (nodeState.type === 'text') {
        calcTextNodeHeight(top)
      }
    }

    function handleResizeStop({ left, top, width, height }) {
      nodeState.x = left
      nodeState.y = top
      nodeState.w = width
      nodeState.h = height
      if (nodeState.type === 'text') {
        calcTextNodeHeight(top)
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

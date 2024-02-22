import { defineComponent, ref, unref, provide, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { addResizeListener, removeResizeListener } from '@/utils/resizeEvent'
import Bar from './bar'
import './index.less'

export default defineComponent({
  name: 'Scrollbar',
  props: {
    // if the container size don't change, setting it can optimize performance
    noresize: {
      type: Boolean
    },
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [String, Array],
      default: ''
    },
    wrapClass: {
      type: [String, Array],
      default: ''
    },
    viewClass: {
      type: [String, Array],
      default: ''
    },
    viewStyle: {
      type: [String, Array],
      default: ''
    }
  },
  setup(props, { slots }) {
    const sizeWidth = ref('0')
    const sizeHeight = ref('0')
    const moveX = ref(0)
    const moveY = ref(0)
    const wrap = ref()
    const resize = ref()

    provide('scroll-bar-wrap', wrap)

    const handleScroll = () => {
      if (!props.native) {
        moveY.value = (unref(wrap).scrollTop * 100) / unref(wrap).clientHeight
        moveX.value = (unref(wrap).scrollLeft * 100) / unref(wrap).clientWidth
      }
    }

    const update = () => {
      if (!unref(wrap)) return

      const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight
      const widthPercentage = (unref(wrap).clientWidth * 100) / unref(wrap).scrollWidth

      sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : ''
      sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : ''
    }

    onMounted(() => {
      if (props.native) return
      nextTick(update)
      if (!props.noresize) {
        addResizeListener(unref(resize), update)
        addResizeListener(unref(wrap), update)
        addEventListener('resize', update)
      }
    })

    onBeforeUnmount(() => {
      if (props.native) return
      if (!props.noresize) {
        removeResizeListener(unref(resize), update)
        removeResizeListener(unref(wrap), update)
        removeEventListener('resize', update)
      }
    })

    return () => (
      <div class='scrollbar'>
        <div
          ref={wrap}
          class={[props.wrapClass, 'scrollbar__wrap', props.native ? '' : 'scrollbar__wrap--hidden-default']}
          onScroll={handleScroll}
        >
          <div ref={resize} class={['scrollbar__view', props.viewClass]} style={props.viewStyle}>
            {slots.default?.()}
          </div>
        </div>
        {!props.native && (
          <>
            <Bar move={unref(moveX)} size={unref(sizeWidth)} />
            <Bar vertical move={unref(moveY)} size={unref(sizeHeight)} />
          </>
        )}
      </div>
    )
  }
})

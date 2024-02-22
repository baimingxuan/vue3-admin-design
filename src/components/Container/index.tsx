import { defineComponent, ref, unref, nextTick } from 'vue'
import Scrollbar from '../Scrollbar'
import { useScrollTo } from '@/hooks/event/useScrollTo'

export default defineComponent({
  name: 'ScrollContainer',
  setup(_, { slots, attrs, expose }) {
    const scrollbarRef = ref<Nullable<{ wrap: ElRef }>>(null)

    /**
     * Scroll to the specified position
     */
    function scrollTo(to: number, duration = 500) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap)
        if (!wrap) {
          return
        }
        const { start } = useScrollTo({
          el: wrap,
          to,
          duration
        })
        start()
      })
    }

    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return null
      }
      return scrollbar.wrap
    }

    /**
     * Scroll to the bottom
     */
    function scrollBottom() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap) as any
        if (!wrap) {
          return
        }
        const scrollHeight = wrap.scrollHeight as number
        const { start } = useScrollTo({
          el: wrap,
          to: scrollHeight
        })
        start()
      })
    }

    expose({
      scrollTo,
      scrollBottom,
      getScrollWrap
    })

    return () => (
      <Scrollbar {...attrs} ref={scrollbarRef} class='scroll-container'>
        {slots.default?.()}
      </Scrollbar>
    )
  }
})

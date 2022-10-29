import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import compoStyle from './compo.module.less'

export default defineComponent({
  name: 'PageWrapper',
  props: {
    name: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { slots }) {
    const pageWrapperRef = ref(null)
    const pageContentRef = ref(null)
    
    return () => (
      <div ref={pageWrapperRef} class={compoStyle['compo_page-wrapper']}>
        <div class={compoStyle['page-header']}>
          <div class={compoStyle['page-header-name']}>
            <SvgIcon name='hints' size={16} />
            <span>{props.name}</span>
          </div>
          <div class={compoStyle['page-header-info']}>
            {slots.header?.()}
          </div>
        </div>
        <div ref={pageContentRef} class={compoStyle['page-content']}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
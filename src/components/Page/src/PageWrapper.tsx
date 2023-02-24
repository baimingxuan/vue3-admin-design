import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { Button } from 'ant-design-vue'
import { openWindow } from '@/utils'
import SvgIcon from '@/components/SvgIcon/index.vue'
import compoStyle from './compo.module.less'

interface PluginProp {
  name?: string
  desc?: string
  url?: string
}

export default defineComponent({
  name: 'PageWrapper',
  props: {
    plugin: {
      type: Object as PropType<PluginProp>
    }
  },
  setup(props, { slots }) {
    const pageWrapperRef = ref(null)
    const pageContentRef = ref(null)

    function openGithub() {
      openWindow(props.plugin?.url!)
    }
    
    return () => (
      <div ref={pageWrapperRef} class={compoStyle['compo_page-wrapper']}>
        <div class={compoStyle['page-header']}>
          <div class={compoStyle['page-header-name']}>
            <SvgIcon name='hints' size={18} />
            <span>{props.plugin?.name}</span>
          </div>
          <p>{props.plugin?.desc}</p>
          <p>
            <span>github源码:</span>
            <Button type='link' size='small' onClick={openGithub}>立即访问</Button>
          </p>
        </div>
        <div ref={pageContentRef} class={compoStyle['page-content']}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
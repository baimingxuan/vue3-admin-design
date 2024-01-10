import type { PropType } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { Button, Card } from 'ant-design-vue'
import { openWindow } from '@/utils'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import SvgIcon from '@/components/SvgIcon'
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

    const { getThemeColor } = useBaseSetting()

    function openGithub() {
      openWindow(props.plugin?.url!)
    }

    return () => (
      <div ref={pageWrapperRef} class={compoStyle['compo_page-wrapper']}>
        <Card class={compoStyle['page-header']} bodyStyle={{ padding: 0 }}>
          <div class={compoStyle['page-header-name']}>
            <SvgIcon name='hints' size={18} />
            <span>{props.plugin?.name}</span>
          </div>
          <p>{props.plugin?.desc}</p>
          <p>
            <span>github源码:</span>
            <Button type='link' size='small' style={{ color: unref(getThemeColor) }} onClick={openGithub}>
              立即访问
            </Button>
          </p>
        </Card>
        <div ref={pageContentRef} class={compoStyle['page-content']}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})

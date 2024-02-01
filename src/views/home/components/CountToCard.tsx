import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { CountTo } from '@/components/CountTo'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'CountToCard',
  props: {
    loading: {
      type: Boolean as PropType<boolean>
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    color: {
      type: String as PropType<string>,
      default: ''
    },
    iconName: {
      type: String as PropType<string>,
      default: ''
    },
    countNum: {
      type: Number as PropType<number>
    }
  },
  setup(props) {
    return () => (
      <Card loading={props.loading} bodyStyle={{ padding: 0 }}>
        <div class='flex-center-v'>
          <div
            class='flex-center'
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '8px 0 0 8px',
              background: props.color
            }}
          >
            <SvgIcon name={props.iconName} size={40} style='color: #fff' />
          </div>
          <div style='flex: 1; text-align: center;'>
            <CountTo startVal={0} endVal={props.countNum} duration={3000} color='#515a6e' />
            <p style='font-size: 16px;'>{props.title}</p>
          </div>
        </div>
      </Card>
    )
  }
})

import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { CountTo } from '@/components/CountTo'
import SvgIcon from '@/components/SvgIcon/index.vue'

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
      <Card loading={props.loading} bordered={false} bodyStyle={{padding: 0}}>
        <div class='flex-center-v'>
          <SvgIcon name={props.iconName} size={40} />
          <div>
            <CountTo startVal={0} endVal={props.countNum} duration={3000} />
            <p>{props.title}</p>
          </div>
        </div>
      </Card>
    )
  }
})
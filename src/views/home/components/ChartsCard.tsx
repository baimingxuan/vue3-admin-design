import type { Ref, PropType } from 'vue'
import type { EChartsOption } from 'echarts'
import { defineComponent, ref, watch } from 'vue'
import { Card } from 'ant-design-vue'
import { useECharts } from '@/hooks/web/useECharts'

export default defineComponent({
  name: 'ChartsCard',
  props: {
    loading: {
      type: Boolean as PropType<boolean>
    },
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    height: {
      type: Number as PropType<number>
    }
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

    watch(
      () => props.loading,
      () => {
        if (props.loading) return

        setOptions(props.options)
      },
      {
        immediate: true
      }
    )

    return () => (
      <Card loading={props.loading}>
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: props.height + 'px'
          }}
        />
      </Card>
    )
  }
})

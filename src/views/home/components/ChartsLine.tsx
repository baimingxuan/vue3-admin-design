import type { Ref, PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { Card } from 'ant-design-vue'
import { useECharts } from '@/hooks/web/useECharts'

export default defineComponent({
  name: 'ChartsLine',
  props: {
    loading: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

    watch(
      () => props.loading,
      () => {
        if (props.loading) return

        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#fa541c'
              }
            }
          },
          grid: {
            left: 0,
            right: '1%',
            top: '2%',
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value',
            max: value => {
              return Math.ceil(value.max / 100) * 100 + 300
            }
          },
          label: {
            show: true,
            fontSize: 14,
            color: '#722ed1',
            position: 'top',
            formatter: '{c}'
          },
          series: [
            {
              type: 'line',
              name: '访问量',
              color: ['#722ed1'],
              smooth: true,
              data: [782, 925, 1196, 812, 328, 223, 1080]
            }
          ]
        })
      },
      {
        immediate: true
      }
    )

    return () => (
      <Card
        loading={props.loading}
        bordered={false}
      >
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: '350px'
          }}
        />
      </Card>
    )
  }
})
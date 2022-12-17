import type { Ref, PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { Card } from 'ant-design-vue'
import { useECharts } from '@/hooks/web/useECharts'

export default defineComponent({
  name: 'ChartsRadar',
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
          legend: {
            bottom: 0,
            data: ['访问来源', '推广渠道']
          },
          radar: {
            radius: '70%',
            center: ['50%', '45%'],
            splitNumber: 8,
            indicator: [
              {
                text: '直接访问',
                max: 2000,
              },
              {
                text: '邮件营销',
                max: 2000,
              },
              {
                text: '联盟广告',
                max: 2000,
              },
              {
                text: '视频广告',
                max: 2000,
              },
              {
                text: '搜索引擎',
                max: 2000,
              }
            ]
          },
          series: [
            {
              type: 'radar',
              symbolSize: 0,
              areaStyle: {
                shadowBlur: 0,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              },
              data: [
                {
                  value: [1124, 1923, 1325, 986, 1469 ],
                  name: '访问来源',
                  itemStyle: {
                    color: '#722ed1'
                  }
                },
                {
                  value: [1820, 1369, 1556, 1637, 325],
                  name: '推广渠道',
                  itemStyle: {
                    color: '#1890ff'
                  }
                }
              ]
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
            height: '300px'
          }}
        />
      </Card>
    )
  }
})
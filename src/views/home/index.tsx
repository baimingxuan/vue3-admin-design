import { defineComponent, ref, unref } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { countToData } from './data'
import CountToCard from './components/CountToCard'
import ChartsPie from './components/ChartsPie'
import ChartsRing from './components/ChartsRing'
import ChartsRadar from './components/ChartsRadar'
import ChartsLine from './components/ChartsLine'
import ChartsBar from './components/ChartsBar'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const isLoading = ref(true)

    setTimeout(() => {
      isLoading.value = false
    }, 1500)
    
    return () => (
      <>
        <Row gutter={12} style='margin-bottom: 12px'>
          {
            countToData.map(item => {
              return (
                <Col flex={1}>
                  <CountToCard
                    loading={unref(isLoading)}
                    title={item.title}
                    color={item.color}
                    iconName={item.icon}
                    countNum={item.count}
                  />
                </Col>
              )
            })
          }
        </Row>
        <Row gutter={12} style='margin-bottom: 12px'>
          <Col span={8}>
            <ChartsPie loading={unref(isLoading)} />
          </Col>
          <Col span={8}>
            <ChartsRing loading={unref(isLoading)} />
          </Col>
          <Col span={8}>
            <ChartsRadar loading={unref(isLoading)} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <ChartsBar loading={unref(isLoading)} />
          </Col>
          <Col span={12}>
            <ChartsLine loading={unref(isLoading)} />
          </Col>
        </Row>
      </>
    )
  }
})
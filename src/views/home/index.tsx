import { defineComponent, ref, unref } from 'vue'
import { Row, Col } from 'ant-design-vue'
import CountToCard from './components/CountToCard'
import ChartsCard from './components/ChartsCard'
import { countToData, pieOptions, ringOptions, radarOptions, barOptions, lineOptions } from './data'

export default defineComponent({
  name: 'Home',
  setup() {
    const isLoading = ref(true)

    setTimeout(() => {
      isLoading.value = false
    }, 1500)

    return () => (
      <div>
        <Row gutter={12} style={{ marginBottom: '12px' }}>
          {countToData.map(item => {
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
          })}
        </Row>
        <Row gutter={12} style={{ marginBottom: '12px' }}>
          <Col span={8}>
            <ChartsCard loading={unref(isLoading)} options={pieOptions} height={300} />
          </Col>
          <Col span={8}>
            <ChartsCard loading={unref(isLoading)} options={ringOptions} height={300} />
          </Col>
          <Col span={8}>
            <ChartsCard loading={unref(isLoading)} options={radarOptions} height={300} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <ChartsCard loading={unref(isLoading)} options={barOptions} height={350} />
          </Col>
          <Col span={12}>
            <ChartsCard loading={unref(isLoading)} options={lineOptions} height={350} />
          </Col>
        </Row>
      </div>
    )
  }
})

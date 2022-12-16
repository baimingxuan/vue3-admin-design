import { defineComponent, ref, unref } from 'vue'
import { Row, Col, Card } from 'ant-design-vue'
import { countToData } from './data'
import CountToCard from './components/CountToCard'


export default defineComponent({
  name: 'HomePage',
  setup() {
    const isLoading = ref(true)

    setTimeout(() => {
      isLoading.value = false
    }, 1500)
    
    return () => (
      <div>
        <Row gutter={12}>
          {
            countToData.map(item => {
              return (
                <Col flex={1}>
                  <CountToCard
                    loading={unref(isLoading)}
                    title={item.title}
                    iconName={item.icon}
                    countNum={item.count}
                  />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
})
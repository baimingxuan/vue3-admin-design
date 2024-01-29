import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Result, Card, Button } from 'ant-design-vue'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import { PageWrapper } from '@/components/Page'
import { RESULT_COMPO } from '@/settings/websiteSetting'
import { useGo } from '@/hooks/web/usePage'

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, '对不起，您没有权限访问此页面。'],
  [ExceptionEnum.PAGE_NOT_FOUND, '对不起，您访问的页面不存在。'],
  [ExceptionEnum.SERVER_ERROR, '对不起，服务器发生错误。']
])

export default defineComponent({
  name: 'PageException',
  props: {
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND
    },
    withCard: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const go = useGo()

    return () => {
      if (props.withCard) {
        return (
          <PageWrapper plugin={RESULT_COMPO}>
            <Card>
              <Result status={props.status} title={props.status} subTitle={subTitleMap.get(props.status)}>
                {{
                  extra: () => (
                    <Button type='primary' onClick={() => go('/')}>
                      返回首页
                    </Button>
                  )
                }}
              </Result>
            </Card>
          </PageWrapper>
        )
      } else {
        return (
          <div className='flex-center' style={{ height: '100vh' }}>
            <Result status={props.status} title={props.status} subTitle={subTitleMap.get(props.status)}>
              {{
                extra: () => (
                  <Button type='primary' onClick={() => go('/')}>
                    返回首页
                  </Button>
                )
              }}
            </Result>
          </div>
        )
      }
    }
  }
})

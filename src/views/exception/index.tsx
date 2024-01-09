import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { Result, Card, Button } from 'ant-design-vue'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import { useGo } from '@/hooks/web/usePage'

interface MapValue {
  status: string
  title: string
  subTitle: string
  btnText?: string
  handler?: Fn
}

export default defineComponent({
  name: 'PageException',
  props: {
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    subTitle: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()
    const go = useGo()

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      title: '403',
      subTitle: '对不起，您没有权限访问此页面。',
      btnText: '返回首页',
      handler: () => go('/')
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      title: '404',
      subTitle: '对不起，您访问的页面不存在。',
      btnText: '返回首页',
      handler: () => go('/')
    })

    unref(statusMapRef).set(ExceptionEnum.SERVER_ERROR, {
      status: `${ExceptionEnum.SERVER_ERROR}`,
      title: '500',
      subTitle: '对不起，服务器发生错误。',
      btnText: '返回首页',
      handler: () => go('/')
    })

    return () => {
      const { status, title, subTitle, btnText, handler } = unref(getMapValue) || {}

      return (
        <Card bordered={false}>
          <Result status={status as any} title={title} subTitle={subTitle}>
            {{
              extra: () =>
                btnText && (
                  <Button type='primary' onClick={handler}>
                    {btnText}
                  </Button>
                )
            }}
          </Result>
        </Card>
      )
    }
  }
})

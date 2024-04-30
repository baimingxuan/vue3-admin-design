import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

const IframeBlank = { template: '<div />' }

// iframe module page
const IframeRoute: AppRoute = {
  path: '/iframe',
  name: 'IframePage',
  component: Layout,
  redirect: '/iframe/vue-doc',
  meta: {
    title: t('routes.iframe.name'),
    icon: 'computer',
    orderNo: 12
  },
  children: [
    {
      path: 'vue-doc',
      name: 'VueDoc',
      component: IframeBlank,
      meta: {
        title: t('routes.iframe.vue'),
        iframeSrc: 'https://cn.vuejs.org/'
      }
    },
    {
      path: 'pinia-doc',
      name: 'PiniaDoc',
      component: IframeBlank,
      meta: {
        title: t('routes.iframe.pinia'),
        iframeSrc: 'https://pinia.vuejs.org/zh/'
      }
    },
    {
      path: 'antd-doc',
      name: 'AntdDoc',
      component: IframeBlank,
      meta: {
        title: t('routes.iframe.antd'),
        iframeSrc: 'https://antdv.com/docs/vue/introduce-cn'
      }
    }
  ]
}

export default IframeRoute

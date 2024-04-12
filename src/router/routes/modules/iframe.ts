import type { AppRoute } from '../../types'
// import { i18n } from '@/locales'
import Layout from '@/layout'

// const { t } = i18n.global
const IframeBlank = { template: '<div />' }

// iframe module page
const IframeRoute: AppRoute = {
  path: '/iframe',
  name: 'IframePage',
  component: Layout,
  redirect: '/iframe/vue-doc',
  meta: {
    title: '外部页面',
    icon: 'bug',
    orderNo: 12
  },
  children: [
    {
      path: 'vue-doc',
      name: 'VueDoc',
      component: IframeBlank,
      meta: {
        title: 'Vue文档',
        iframeSrc: 'https://cn.vuejs.org/'
      }
    },
    {
      path: 'pinia-doc',
      name: 'PiniaDoc',
      component: IframeBlank,
      meta: {
        title: 'Pinia文档',
        iframeSrc: 'https://pinia.vuejs.org/zh/'
      }
    },
    {
      path: 'antd-doc',
      name: 'AntdDoc',
      component: IframeBlank,
      meta: {
        title: 'Antd文档',
        iframeSrc: 'https://antdv.com/docs/vue/introduce-cn'
      }
    }
  ]
}

export default IframeRoute

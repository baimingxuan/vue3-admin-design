import type { AppRoute } from '../../types'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import Layout from '@/layout'

// exception module page
const ExceptionRoute: AppRoute = {
  path: '/exception',
  name: 'ExceptionPage',
  component: Layout,
  redirect: '/exception/page-403',
  meta: {
    title: '异常页面',
    icon: 'bug',
    orderNo: 11
  },
  children: [
    {
      path: 'page-403',
      name: 'Page403',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.PAGE_NOT_ACCESS,
        withCard: true
      },
      meta: {
        title: '403页面'
      }
    },
    {
      path: 'page-404',
      name: 'Page404',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.PAGE_NOT_FOUND,
        withCard: true
      },
      meta: {
        title: '404页面'
      }
    },
    {
      path: 'page-500',
      name: 'Page500',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.SERVER_ERROR,
        withCard: true
      },
      meta: {
        title: '500页面'
      }
    }
  ]
}

export default ExceptionRoute

import type { AppRoute } from '../../types'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import Layout from '@/layout/index.vue'

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
      name: 'PageNotAccess',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.PAGE_NOT_ACCESS
      },
      meta: {
        title: '403页面'
      }
    },
    {
      path: 'page-404',
      name: 'PageNotFound',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.PAGE_NOT_FOUND
      },
      meta: {
        title: '404页面'
      }
    },
    {
      path: 'page-500',
      name: 'ServiceError',
      component: () => import('@/views/exception/index'),
      props: {
        status: ExceptionEnum.SERVER_ERROR
      },
      meta: {
        title: '500页面'
      }
    }
  ]
}

export default ExceptionRoute
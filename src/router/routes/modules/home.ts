import type { AppRoute } from '../../types'
import { i18n } from '@/locales'
import Layout from '@/layout'

const { t } = i18n.global

// Home route
const HomeRoute: AppRoute = {
  path: '/home',
  name: 'Home',
  component: Layout,
  redirect: '/home',
  meta: {
    title: t('routes.base.home'),
    icon: 'home',
    affix: true,
    orderNo: 1,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/views/home'),
      meta: {
        title: t('routes.base.home'),
        icon: 'home',
        hideMenu: true
      }
    }
  ]
}

export default HomeRoute

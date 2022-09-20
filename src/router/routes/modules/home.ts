import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// Home route
const HomeRoute: AppRoute = {
  path: '/home',
  name: 'Home',
  component: Layout,
  redirect: '/home',
  meta: {
    title: '首页',
    icon: 'home',
    affix: true,
    orderNo: 1,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/views/home.vue'),
      meta: {
        title: '首页',
        icon: 'home',
        hideMenu: true
      }
    }
  ]
}

export default HomeRoute
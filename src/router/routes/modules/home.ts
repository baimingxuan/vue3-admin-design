import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// Home route
const HomeRoute: AppRoute = {
  path: '/home',
  name: 'Home',
  component: Layout,
  redirect: '/home',
  orderNo: 0,
  meta: {
    title: '首页',
    icon: 'home',
    affix: true,
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
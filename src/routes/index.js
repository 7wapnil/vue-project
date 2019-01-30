import Router from 'vue-router'
import store from '@/stores'
import mainRoutes from './main'
import StyleGuidePages from './styleguide_pages'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/styleguide',
      name: 'styleguide',
      component: () => import('@/views/styleguide/Page'),
      children: StyleGuidePages
    },
    {
      path: '/',
      redirect: '/esports',
      name: 'home',
      component: () => import('@/views/layouts/main/Layout'),
      children: mainRoutes
    }
  ]
})

export default router

import Router from 'vue-router'
import mainRoutes from './main'
import StyleGuidePages from './styleguide_pages'
import InformationPages from '@/routes/information_pages';

const rootChildren = [...mainRoutes, ...InformationPages.routes]

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/styleguide',
      name: 'styleguide',
      redirect: 'styleguide/typography',
      component: () => import('@/views/styleguide/Page'),
      children: StyleGuidePages
    },
    {
      path: '/',
      redirect: '/esports',
      name: 'home',
      component: () => import('@/views/layouts/main/Layout'),
      children: rootChildren
    },
    {
      path: '/sports',
      name: 'sports',
      component: () => import('@/views/layouts/main/Layout'),
      children: rootChildren
    }
  ]
})

export default router

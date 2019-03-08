import Router from 'vue-router'
import mainRoutes from './main'
import StyleGuidePages from './styleguide_pages'
import InformationPages from '@/routes/information_pages';
import NotFound from '@/views/layouts/main/NotFound'

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
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router

import Router from 'vue-router'
import mainRoutes from './main'
import StyleGuidePages from './styleguide_pages'
import InformationPages from '@/routes/information_pages';
import NotFound from '@/views/layouts/main/NotFound'
import { setCookie } from '@/helpers/cookies'
import moment from 'moment'

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
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.query.btag) { setCookie('btag', to.query.btag, moment().add(1, 'month').toDate()) }
  next()
})

export default router

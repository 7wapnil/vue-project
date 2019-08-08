import Router from 'vue-router'
import mainRoutes from './main'
import StyleGuidePages from './styleguide_pages'
import InformationPages from '@/routes/information_pages';
import NotFound from '@/views/layouts/common/NotFound'
import Maintenance from '@/views/layouts/common/Maintenance'
import { setCookie } from '@/helpers/cookies'
import moment from 'moment'
import filters from '@/mixins/filters'

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
      component: () => import('@/views/layouts/common/Layout'),
      children: rootChildren
    },
    {
      path: 'maintenance',
      name: 'Maintenance',
      component: Maintenance
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
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
  if (to.params.titleKind) {
    document.title = `${filters.capitalizeFirstLetter(to.params.titleKind)} - Arcanebet`
  }
  if (to.query.btag) { setCookie('btag', to.query.btag, moment().add(1, 'month').toDate()) }
  next()
})

export default router

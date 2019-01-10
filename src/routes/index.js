import Router from 'vue-router'
import store from '@/stores'
import mainRoutes from './main'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layouts/main/Layout'),
      children: mainRoutes
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('updateTitleFiltersFromRouteParams', to.params)
  next()
})

export default router

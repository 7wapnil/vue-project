import Router from 'vue-router'
import Activation from '@/views/auth/Activation'
import EventsList from '@/views/events-list/Page.vue'
import LivePage from '@/views/live/Page.vue'
import OutrightPage from '@/views/outrights/Page.vue'
import Event from '@/views/event/Page.vue'
import arcanebetSession from '@/services/local-storage/session'
import store from '@/stores'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: EventsList,
    },
    {
      path: '/live',
      name: 'live',
      component: LivePage,
    },
    {
      path: '/:titleKind',
      name: 'title-kind',
      component: EventsList,
      children: [{
        path: 'title/:titleId',
        name: 'title',
        component: EventsList,
        children: [{
          path: 'tour/:tournamentId',
          name: 'tournament',
          component: EventsList,
        }]
      }]
    },
    {
      path: '/outright',
      name: 'outright',
      component: OutrightPage,
    },
    {
      path: '/activation/:token',
      name: 'activation',
      component: Activation
    },
    {
      path: '/event/:id',
      name: 'event',
      component: Event,
      props: true
    },
    {
      path: '/impersonate/:token',
      beforeEnter: (to, from, next) => {
        const customerAttrs = JSON.parse(to.query.customer)
        arcanebetSession.storeImpersonatedSession(to.params.token, customerAttrs)
        next({ path: '/' })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('updateTitleFiltersFromRouteParams', to.params)
  next()
})

export default router

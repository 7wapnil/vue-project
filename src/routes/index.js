import Router from 'vue-router'
import Activation from '@/views/auth/Activation'
import Esports from '@/views/esports/Page.vue'
import SportsPage from '@/views/sports/Page.vue'
import LivePage from '@/views/live/Page.vue'
import OutrightPage from '@/views/outrights/Page.vue'
import Event from '@/views/event/Page.vue'
import arcanebetSession from '@/services/local-storage/session'

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Esports,
    },
    {
      path: '/esports',
      name: 'esports',
      component: Esports,
      children: [{
        path: 'title/:titleId',
        name: 'esports-title',
        component: Esports,
        children: [{
          path: 'tour/:tournamentId',
          name: 'esports-tournament',
          component: Esports,
        }]
      }]
    },
    {
      path: '/live',
      name: 'live',
      component: LivePage,
    },
    {
      path: '/outright',
      name: 'outright',
      component: OutrightPage,
    },
    {
      path: '/sports',
      name: 'sports',
      component: SportsPage,
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

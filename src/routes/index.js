import Router from 'vue-router'
import Activation from '@/views/auth/Activation'
import EventsList from '@/views/events-list/Page.vue'
import LivePage from '@/views/live/Page.vue'
import OutrightPage from '@/views/outrights/Page.vue'
import Event from '@/views/event/Page.vue'

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: EventsList,
    },
    {
      path: '/esports',
      name: 'esports',
      component: EventsList,
      children: [{
        path: 'title/:titleId',
        name: 'esports-title',
        component: EventsList,
        children: [{
          path: 'tour/:tournamentId',
          name: 'esports-tournament',
          component: EventsList,
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
      component: EventsList,
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
    }
  ],
});

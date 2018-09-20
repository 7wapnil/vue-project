import Router from 'vue-router'
import SignUp from '@/views/auth/SignUp.vue'
import SignIn from '@/views/auth/SignIn.vue'
import Esports from '@/views/esports/Page.vue'
import Event from '@/views/event/Page.vue'
import Account from '@/views/account/Page.vue'

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
        path: ':title',
        name: 'esports-title',
        component: Esports,
      }]
    },
    {
      path: '/live',
      name: 'live',
      component: Esports,
    },
    {
      path: '/outright',
      name: 'outright',
      component: Esports,
    },
    {
      path: '/sports',
      name: 'sports',
      component: Esports,
    },
    {
      path: '/live-casino',
      name: 'live-casino',
      component: Esports,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/event/:id',
      name: 'event',
      component: Event,
      props: true
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ],
});

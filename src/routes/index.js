import Router from 'vue-router'
import SignUp from '@/views/auth/SignUp.vue'
import SignIn from '@/views/auth/SignIn.vue'
import Activation from '@/views/auth/Activation'
import Esports from '@/views/esports/Page.vue'
import Event from '@/views/event/Page.vue'
import AccountPage from '@/views/account/Page.vue'
import NotImplemented from '@/views/common/NotImplemented'
import accountRoutes from './account'

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
      component: NotImplemented,
    },
    {
      path: '/outright',
      name: 'outright',
      component: NotImplemented,
    },
    {
      path: '/sports',
      name: 'sports',
      component: NotImplemented,
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
      path: '/account',
      component: AccountPage,
      children: accountRoutes
    }
  ],
});

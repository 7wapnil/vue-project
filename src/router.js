import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Esports from './views/esports/Page.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/esports',
      name: 'esports',
      component: Esports,
    },
  ],
});

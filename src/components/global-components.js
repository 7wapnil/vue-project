import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import MainLyaout from '@/views/layouts/MainLayout'
import SimpleLayout from '@/views/layouts/SimpleLayout'

Vue.use(Router)
Vue.use(BootstrapVue)

Vue.component('main-layout', MainLyaout)
Vue.component('simple-layout', SimpleLayout)

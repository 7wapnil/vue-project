import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import MainLyaout from '@/views/layouts/main/Layout'
import SimpleLayout from '@/views/layouts/simple/Layout'

Vue.use(Router)
Vue.use(BootstrapVue)

Vue.component('main-layout', MainLyaout)
Vue.component('simple-layout', SimpleLayout)

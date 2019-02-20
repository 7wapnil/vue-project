import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import MainLyaout from '@/views/layouts/main/Layout'
import SimpleLayout from '@/views/layouts/simple/Layout'
import Loader from '@/components/custom/Loader'
import Modal from '@/components/custom/Modal'
import Icon from '@/components/custom/Icon'
import CategoryTabs from '@/components/custom/CategoryTabs'
import SimpleTabs from '@/components/custom/SimpleTabs'
import ModalList from '@/components/custom/ModalList'

Vue.use(Router)
Vue.use(BootstrapVue)

Vue.component('main-layout', MainLyaout)
Vue.component('simple-layout', SimpleLayout)
Vue.component('loader', Loader)
Vue.component('modal', Modal)
Vue.component('icon', Icon)
Vue.component('category-tabs', CategoryTabs)
Vue.component('simple-tabs', SimpleTabs)
Vue.component('modal-list', ModalList)

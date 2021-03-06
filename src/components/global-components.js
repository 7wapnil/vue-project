import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import MainLayout from '@/views/layouts/common/Layout'
import SimpleLayout from '@/views/layouts/simple/Layout'
import Loader from '@/components/custom/Loader'
import Modal from '@/components/custom/Modal'
import Icon from '@/components/custom/Icon'
import CategoryTabs from '@/components/custom/CategoryTabs'
import SimpleTabs from '@/components/custom/SimpleTabs'
import ModalList from '@/components/custom/ModalList'
import ArcCircle from '@/components/custom/ArcCircle'
import PaymentMethodIcon from '@/components/PaymentMethodIcon'
import ArcSeparator from '@/components/custom/ArcSeparator'
import VueObserveVisibility from 'vue-observe-visibility'
import VueLazyload from 'vue-lazyload'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(VueObserveVisibility)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

Vue.component('main-layout', MainLayout)
Vue.component('simple-layout', SimpleLayout)
Vue.component('loader', Loader)
Vue.component('modal', Modal)
Vue.component('icon', Icon)
Vue.component('category-tabs', CategoryTabs)
Vue.component('simple-tabs', SimpleTabs)
Vue.component('modal-list', ModalList)
Vue.component('arc-circle', ArcCircle)
Vue.component('payment-method-icon', PaymentMethodIcon)
Vue.component('arc-separator', ArcSeparator)

import Router from 'vue-router'
import system from '@/routes/system'
import Esports from '@/routes/esports'
import Sports from '@/routes/sports'
import Casino from '@/routes/casino'
import LiveCasino from '@/routes/live-casino'
import support from '@/routes/support'
import Maintenance from '@/views/layouts/common/Maintenance'
import { setCookie } from '@/helpers/cookies'
import moment from 'moment'
import filters from '@/mixins/filters'
import { colors } from '@/constants/android-theme-colors'
import Layout from '@/views/layouts/common/Layout'
import { TITLE_KINDS } from '@/constants/title-kinds'
import NotFound from '@/views/layouts/common/NotFound'
import store from '@/stores'

const rootChilds = [...Esports, ...Sports, ...LiveCasino, ...Casino, ...support.routes, ...system]

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/esports',
      name: 'home',
      component: Layout,
      children: rootChilds
    },
    {
      path: 'maintenance',
      name: 'Maintenance',
      component: Maintenance
    },
    {
      path: '*',
      name: 'not-found',
      component: Layout,
      children: [{
        path: '*',
        components: {
          content: NotFound,
        }
      }]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      const container = document.documentElement
      const position = savedPosition || { x: 0, y: 0 }

      setTimeout(() => {
        container.scrollTo(position.x, position.y)
        resolve()
      }, 1)
    })
  }
})

router.beforeEach((to, from, next) => {
  const path = to.matched[1].path.split('/')
  const isSupported = TITLE_KINDS.includes(path[1])
  if (path && isSupported) {
    to.params.titleKind = path[1]
  } else {
    to.params.titleKind = 'esports'
  }

  if (to.params.titleKind) {
    document.title = `${filters.capitalizeFirstLetter(to.params.titleKind)} - Arcanebet`
  }

  const components = to.matched[to.matched.length - 1].components
  if (components) {
    to.meta.components = components
  }

  const section = to.meta.themeColor || to.params.titleKind
  if (section) {
    const newColor = colors[section.toString()]
    const themeColor = document.querySelector('meta[name=theme-color]')
    themeColor.setAttribute('content', newColor)
  }
  if (to.query.btag) { setCookie('btag', to.query.btag, moment().add(1, 'month').toDate()) }

  next()
})

export default router

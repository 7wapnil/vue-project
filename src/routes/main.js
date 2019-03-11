import EventsList from '@/views/events-list/Page.vue'
import CategoryPage from '@/views/events-list/CategoryPage.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import arcanebetSession from '@/services/local-storage/session'
import Affiliates from '@/views/information-pages/affiliates/main/Page'

export default [
  {
    path: 'live',
    name: 'live',
    component: () => import('@/views/live/Page')
  },
  {
    path: ':titleKind',
    component: () => import('@/views/layouts/main/Content'),
    beforeEnter: (to, from, next) => {
      const isKindSupported = to.params.titleKind === 'esports' || to.params.titleKind === 'sports'

      isKindSupported ? next() : next({ name: 'NotFound' })
    },
    children: [
      {
        path: '',
        name: 'title-kind',
        component: EventsList
      },
      {
        path: 'title/:titleId',
        name: 'title',
        component: EventsList
      },
      {
        path: 'title/:titleId/tour/:tournamentId',
        name: 'tournament',
        component: TournamentPage
      },
      {
        path: 'title/:titleId/category/:categoryId/',
        name: 'category-tournaments',
        component: CategoryPage
      },
      {
        path: 'event/:id',
        name: 'event',
        component: () => import('@/views/event/Page'),
        props: true
      },
    ]
  },
  {
    path: 'outright',
    name: 'outright',
    component: () => import('@/views/outrights/Page'),
  },
  {
    path: 'activation/:token',
    name: 'activation',
    component: () => import('@/views/auth/Activation')
  },
  {
    path: 'impersonate/:token',
    beforeEnter: (to, from, next) => {
      const customerAttrs = JSON.parse(to.query.customer)
      arcanebetSession.storeImpersonatedSession(to.params.token, customerAttrs)
      next({ path: '/' })
    }
  },
  {
    path: 'affiliates',
    name: 'affiliates',
    component: () => import('@/views/layouts/information-page/Content'),
    children: [
      {
        path: '',
        name: 'affiliates',
        component: Affiliates
      }
    ]
  }
]

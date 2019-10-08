import { TITLE_KINDS } from '@/constants/title-kinds'
import EventsPage from '@/views/events-list/Page.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import Affiliates from '@/views/information-pages/affiliates/main/Page'

export default [
  {
    path: ':titleKind',
    component: () => import('@/views/layouts/common/Content'),
    beforeEnter: (to, from, next) => {
      const isKindSupported = TITLE_KINDS.includes(to.params.titleKind)

      isKindSupported ? next() : next({ name: 'NotFound' })
    },
    children: [
      {
        path: 'title/:titleId',
        name: 'title',
        component: EventsPage
      },
      {
        path: 'title/:titleId/tour/:tournamentId',
        name: 'tournament',
        component: TournamentPage
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
    path: 'reset_password/:token',
    name: 'reset_password',
    component: () => import('@/views/auth/PasswordResetForm')
  },
  {
    path: 'email_verification/:token',
    name: 'email_verification',
    component: () => import('@/views/auth/EmailVerification')
  },
  {
    path: 'impersonate/:token',
    name: 'impersonation',
    component: () => import('@/views/auth/Impersonation')
  },
  {
    path: 'affiliates',
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

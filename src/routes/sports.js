import Sidemenu from '@/components/side-menu/SideMenu'
import Betslip from '@/components/betslip/Betslip'
import EventsPage from '@/views/events-list/Page.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import CategoryTabs from '@/components/custom/CategoryTabs'
import IntroductionArea from '@/components/custom/IntroductionArea'

export default [
  {
    path: '/sports',
    name: 'sports',
    components: {
      content: EventsPage,
      left: Sidemenu,
      right: Betslip,
      tabs: CategoryTabs,
      header: IntroductionArea
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
        path: 'event/:eventName',
        name: 'event',
        component: () => import('@/views/event/Page'),
        props: true
      }
    ]
  }
]

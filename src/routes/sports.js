import Sidemenu from '@/components/side-menu/SideMenu'
import Betslip from '@/components/betslip/Betslip'
import EventsPage from '@/views/events-list/Page.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import CategoryTabs from '@/components/custom/CategoryTabs'
import IntroductionArea from '@/components/custom/IntroductionArea'
import EventPage from '@/views/event/Page'

export default [
  {
    path: '/sports',
    name: 'sports',
    components: {
      content: EventsPage,
      left: Sidemenu,
      right: Betslip,
      tabs: CategoryTabs,
      header: IntroductionArea,
      mobileSidemenu: Sidemenu
    },
  },
  {
    path: '/sports/:titleSlug',
    name: 'sports-title',
    props: {
      content: true
    },
    components: {
      content: EventsPage,
      tabs: CategoryTabs,
      header: IntroductionArea,
      left: Sidemenu,
      right: Betslip,
      mobileSidemenu: Sidemenu
    }
  },
  {
    path: '/sports/:titleSlug/tournament/:tournamentSlug',
    name: 'sports-tournament',
    props: {
      content: true
    },
    components: {
      content: TournamentPage,
      left: Sidemenu,
      right: Betslip,
      mobileSidemenu: Sidemenu
    }
  },
  {
    path: '/sports/event/:eventSlug',
    name: 'sports-event',
    props: { content: true },
    components: {
      content: EventPage,
      left: Sidemenu,
      right: Betslip,
      mobileSidemenu: Sidemenu
    }
  }
]

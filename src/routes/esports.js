import Sidemenu from '@/components/side-menu/SideMenu'
import Betslip from '@/components/betslip/Betslip'
import EventsPage from '@/views/events-list/Page.vue'
import TournamentPage from '@/views/events-list/TournamentPage.vue'
import CategoryTabs from '@/components/custom/CategoryTabs'
import IntroductionArea from '@/components/custom/IntroductionArea'
import EventPage from '@/views/event/Page'

export default [
  {
    path: '/esports',
    name: 'esports',
    components: {
      content: EventsPage,
      left: Sidemenu,
      right: Betslip,
      tabs: CategoryTabs,
      header: IntroductionArea,
      mobileSidemenu: Sidemenu
    }
  },
  {
    path: '/esports/:titleSlug',
    name: 'esports-title',
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
    path: '/esports/:titleSlug/tournament/:tournamentSlug',
    name: 'esports-tournament',
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
    path: '/esports/event/:eventSlug',
    name: 'esports-event',
    props: { content: true },
    components: {
      content: EventPage,
      left: Sidemenu,
      right: Betslip,
      mobileSidemenu: Sidemenu
    }
  }
]

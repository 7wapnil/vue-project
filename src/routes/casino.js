import CasinoSidebar from '@/views/casino/CasinoSidebar'
import CasinoHeader from '@/views/casino/CasinoHeader'
import CasinoTabs from '@/views/casino/CasinoTabs'
import GamesList from '@/components/casino-games/GamesList'
import CasinoOverviewPage from '@/components/casino-games/CasinoOverviewPage'
import CasinoGamePage from '@/views/casino/CasinoGamePage'
import CasinoProvidersPage from '@/views/casino/providers/CasinoProvidersPage'

export default [
  {
    path: '/casino',
    name: 'casino',
    props: {
      content: true
    },
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: CasinoOverviewPage,
      mobileSidemenu: CasinoSidebar
    }
  },
  {
    path: '/casino/providers',
    name: 'casino-providers',
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: CasinoProvidersPage,
      mobileSidemenu: CasinoSidebar
    }
  },
  {
    path: '/casino/:category',
    name: 'casino-category',
    props: {
      content: true
    },
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: GamesList,
      mobileSidemenu: CasinoSidebar
    }
  }, {
    path: '/casino/:category/:playItemSlug',
    name: 'casino-game',
    props: {
      content: true
    },
    components: {
      content: CasinoGamePage,
      mobileSidemenu: CasinoSidebar
    }
  }
]

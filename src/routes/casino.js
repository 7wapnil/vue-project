import CasinoSidebar from '@/views/casino/CasinoSidebar'
import CasinoHeader from '@/views/casino/CasinoHeader'
import CasinoTabs from '@/views/casino/CasinoTabs'
import GamesList from '@/components/casino-games/GamesList'
import GamesOverview from '@/components/casino-games/GamesOverview'
import CasinoGamePage from '@/views/casino/CasinoGamePage'

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
      content: GamesOverview,
      mobileSidemenu: CasinoSidebar
    }
  }, {
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

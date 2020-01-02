import CasinoSidebar from '@/views/casino/CasinoSidebar'
import CasinoHeader from '@/views/casino/CasinoHeader'
import CasinoTabs from '@/views/casino/CasinoTabs'
import GamesList from '@/components/casino-games/GamesList'
import CasinoOverviewPage from '@/components/casino-games/CasinoOverviewPage'
import GamesSearch from '@/components/casino-games/GamesSearch'
import CasinoGamePage from '@/views/casino/CasinoGamePage'
import CasinoProvidersPage from '@/views/casino/providers/CasinoProvidersPage'
import CasinoGamesByProviderNamePage from '@/views/casino/providers/CasinoGamesByProviderNamePage'

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
    path: '/casino/providers/:providerName',
    name: 'casino-games-by-provider-name',
    props: {
      content: true
    },
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: CasinoGamesByProviderNamePage,
      mobileSidemenu: CasinoSidebar
    }
  },
  {
    path: '/casino/search',
    name: 'casino-search',
    props: (route) => ({
      query: route.query.q,
      content: true
    }),
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: GamesSearch,
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

import LiveCasinoHeader from '@/views/live-casino/LiveCasinoHeader'
import LiveCasinoSidebar from '@/views/live-casino/LiveCasinoSidebar'
import LiveCasinoTabs from '@/views/live-casino/LiveCasinoTabs'
import TablesOverview from '@/components/casino-games/TablesOverview'
import TablesList from '@/components/casino-games/TablesList'
import GamesSearch from '@/components/casino-games/GamesSearch'
import CasinoGamePage from '@/views/casino/CasinoGamePage'

export default [
  {
    path: '/live-casino',
    name: 'live-casino',
    props: {
      content: true
    },
    components: {
      left: LiveCasinoSidebar,
      header: LiveCasinoHeader,
      tabs: LiveCasinoTabs,
      content: TablesOverview,
      mobileSidemenu: LiveCasinoSidebar
    }
  }, {
    path: '/live-casino/search',
    name: 'live-casino-search',
    props: (route) => ({
      query: route.query.q,
      content: true
    }),
    components: {
      left: LiveCasinoSidebar,
      header: LiveCasinoHeader,
      tabs: LiveCasinoTabs,
      content: GamesSearch,
      mobileSidemenu: LiveCasinoSidebar
    }
  }, {
    path: '/live-casino/:category',
    name: 'live-casino-category',
    props: {
      content: true
    },
    components: {
      left: LiveCasinoSidebar,
      header: LiveCasinoHeader,
      tabs: LiveCasinoTabs,
      content: TablesList,
      mobileSidemenu: LiveCasinoSidebar
    }
  }, {
    path: '/live-casino/:category/:playItemSlug',
    name: 'live-casino-game',
    props: {
      content: true,
      right: true
    },
    components: {
      content: CasinoGamePage,
      mobileSidemenu: LiveCasinoSidebar
    }
  }
]

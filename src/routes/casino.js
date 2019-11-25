import CasinoSidebar from '@/views/casino/CasinoSidebar'
import CasinoHeader from '@/views/casino/CasinoHeader'
import CasinoTabs from '@/views/casino/CasinoTabs'
import CasinoContent from '@/views/casino/CasinoContent'
import GamesList from '@/components/casino-games/GamesList'
import NotFound from '@/views/layouts/common/NotFound'
import CasinoGamePage from '@/views/casino/CasinoGamePage'

export default [
  {
    path: '/casino',
    name: 'casino',
    redirect: '/casino/new',
    components: {
      left: CasinoSidebar,
      header: CasinoHeader,
      tabs: CasinoTabs,
      content: CasinoContent
    },
    children: [{
      path: ':category',
      name: 'casino-category',
      props: {
        gamelist: true
      },
      components: {
        left: CasinoSidebar,
        header: CasinoHeader,
        tabs: CasinoTabs,
        content: CasinoContent,
        gamelist: GamesList
      },
      children: [{
          path: ':gameName',
          name: 'casino-game',
          props: true,
          component: CasinoGamePage
      }]
    }]
  },
  { path: '*', component: NotFound }
]

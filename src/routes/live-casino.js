import LiveCasinoHeader from '@/views/live-casino/LiveCasinoHeader'
import LiveCasinoSidebar from '@/views/live-casino/LiveCasinoSidebar'
import LiveCasinoTabs from '@/views/live-casino/LiveCasinoTabs'
import LiveCasinoContent from '@/views/live-casino/LiveCasinoContent'
import GamesList from '@/components/casino-games/GamesList'

export default [
  {
    path: '/live-casino',
    name: 'live-casino',
    redirect: '/live-casino/skill-games',
    components: {
      left: LiveCasinoSidebar,
      header: LiveCasinoHeader,
      tabs: LiveCasinoTabs,
      content: LiveCasinoContent
    },
    children: [
      {
        path: ':category',
        name: 'live-casino-category',
        props: {
          gamelist: true
        },
        components: {
          left: LiveCasinoSidebar,
          header: LiveCasinoHeader,
          tabs: LiveCasinoTabs,
          content: LiveCasinoContent,
          gamelist: GamesList
        }
      }
    ]
  }
]

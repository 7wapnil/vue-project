<template>
  <div>
    <header-section/>
    <games-list/>
  </div>
</template>

<script>
import HeaderSection from '@/components/casino-games/HeaderSection'
import GamesList from '@/components/casino-games/GamesList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY } from '@/graphql/games'

export default {
  components: {
    HeaderSection,
    GamesList
  },
  apollo: {
    games () {
      return {
        query: GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  },
  data () {
    return {
      categories: [
        {
          icon: 'sidemenu-basketball',
          title: 'New games',
          totalCount: 148,
          games: [
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-1.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png')
            },
          ]
        },
        {
          icon: 'sidemenu-basketball',
          title: 'ArcaneBet favorites',
          totalCount: 64,
          games: [
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-1.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png')
            },
          ]
        },
        {
          icon: 'sidemenu-basketball',
          title: 'Slot Games',
          totalCount: 59,
          games: [
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-1.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png')
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png')
            },
          ]
        }
      ]
    }
  },
  computed: {
    // collectedGames() {
    //   return this.games.reduce(this.collectGameToList, {})
    // }
  },
  methods: {
    // collectGameToList (list, game) {
    //   if (!game.categories.length) {
    //   }
    // },
    // insertGame(list, category, game) {
    //   return list[category] ? list[category].push(game) : list[category] = [game]
    // }
  },
}
</script>

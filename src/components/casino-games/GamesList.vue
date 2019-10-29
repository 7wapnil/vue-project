<template>
  <div class="casino-games-list">
    <category-games
      v-for="(category, index) in categories"
      :key="index"
      :category="category"/>
  </div>
</template>

<script>
import CategoryGames from './games-list/CategoryGames'
// import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
// import { GAMES_QUERY } from '@/graphql/games'

export default {
  components: {
    CategoryGames
  },
  props: {
    games: {
      type: Array,
      default () { return [] }
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
              icon: require('@/assets/images/casino-games/category/asset-1.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
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
              icon: require('@/assets/images/casino-games/category/asset-1.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
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
              icon: require('@/assets/images/casino-games/category/asset-1.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-2.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-3.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-4.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
            {
              title: 'House of Doom',
              icon: require('@/assets/images/casino-games/category/asset-5.png'),
              url: 'https://gamelaunch-stage.everymatrix.com/Loader/Start/2067/fire--steel-pc?language=en&funMode=False&_sid='
            },
          ]
        }
      ]
    }
  }
}
</script>

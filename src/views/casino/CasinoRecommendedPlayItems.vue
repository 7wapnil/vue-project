<template>
  <b-row no-gutters>
    <b-col>
      <loader v-if="$apollo.loading"/>
      <div
        v-if="!recommendedItems.length"
        class="p-4 text-center w-100">
        No recommended items
      </div>
      <b-row
        v-for="recommendedItem in recommendedItems"
        :key="recommendedItem.id"
        no-gutters>
        <b-col
          class="play-item"
          @click="launchGame(recommendedItem)"
          @mouseover="hover = true"
          @mouseleave="hover = false">
          <b-img
            :src="itemIcon(recommendedItem)"
            :alt="itemTitle(recommendedItem)"
            class="image"
            blank-color="#2F2F2F"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { RECOMMENDED_GAMES_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  name: 'CasinoRecommendedPlayItems',
  data () {
    return {
      recommendedItems: [],
      hover: true
    }
  },
  methods: {
    fetchRecommendedItems (playItemId) {
      this.$apollo.query({
        query: RECOMMENDED_GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          originalGameId: playItemId,
        }
      }).then(({ data }) => {
        this.recommendedItems = data.recommendedGames
      })
    },
    itemIcon (item) {
      return item.logoUrl || this.defaultIcon
    },
    defaultIcon () {
      return require('@/assets/images/logo/arcanebet-logo.png')
    },
    itemTitle (item) {
      return item.name
    },
    launchGame (item) {
      this.$forceUpdate()

      return this.$router.push({
        name: 'casino-game',
        params: {
          playItemSlug: item.slug,
          category: 'all-games'
        }
      })
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .play-item {
    cursor: pointer;
    margin: 10px 20px;
    box-shadow: 2px 2px 10px 0 $black;
    .image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
      transition: all .4s ease-in-out;
    }
    &:hover {
      & > .image {
        transform: scale(1.09);
      }
    }
  }
</style>

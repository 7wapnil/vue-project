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
          @mouseover="hover = recommendedItem.id"
          @mouseleave="hover = null">
          <b-img
            :src="itemIcon(recommendedItem)"
            :alt="itemTitle(recommendedItem)"
            class="image"
            blank-color="#2F2F2F"/>
          <div v-if="hover === recommendedItem.id">
            <div class="launch-button">
              <div class="triangle"/>
            </div>
            <div
              class="fun-mode-button"
              @click.stop="lauchFunMode(recommendedItem)">
              <div class="try-for-free-label">
                {{ funModeLabel }}
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { RECOMMENDED_GAMES_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { mapGetters } from 'vuex'

export default {
  name: 'CasinoRecommendedPlayItems',
  data () {
    return {
      recommendedItems: [],
      hover: null
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    funModeLabel () {
      if (!this.isFunModeAvailable && !this.isLoggedIn) return this.$i18n.t('casino.loginToPlay')
      if (this.isFunModeAvailable && !this.isLoggedIn) return this.$i18n.t('casino.tryForFree')
      if (this.isFunModeAvailable && this.isLoggedIn) return this.$i18n.t('casino.tryForFree')
      if (!this.isFunModeAvailable && this.isLoggedIn) return this.$i18n.t('casino.play')
    },
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

      if (!this.isLoggedIn) { return this.$bvModal.show('AuthModal') }

      return this.$router.push({
        name: `${this.$route.params.titleKind}-game`,
        params: {
          playItemSlug: item.slug,
          category: 'all-games'
        }
      })
    },
    lauchFunMode (item) {
      if (!this.isFunModeAvailable && !this.isLoggedIn) return this.$bvModal.show('AuthModal')
      if (this.isFunModeAvailable && !this.isLoggedIn) return this.lauchFunModeGame(item)
      if (this.isFunModeAvailable && this.isLoggedIn) return this.lauchFunModeGame(item)
      if (!this.isFunModeAvailable && this.isLoggedIn) return this.lauchFunModeGame(item)
    },
    lauchFunModeGame (item) {
      return this.$router.push({
        name: `${this.currentLobbyName}-game`,
        params: {
          playItemSlug: item.slug,
          category: 'all-games',
          gameMode: 'fun'
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
  .launch-button {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 80px;
    height: 80px;
    top: 25%;
    position: absolute;
    background-color: #ECA95F;
    box-shadow: 0 0 10px 0 black;
    border-radius: 8px 0 8px 0;
    padding: 30px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .triangle {
    border-color: transparent black;
    border-style: solid;
    border-width: 15px 0 15px 25px;
    height: 0;
    width: 0;
  }
  .fun-mode-button {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 110px;
    height: 25px;
    background: $arc-clr-soil-black;
    align-items: center;
    justify-content: center;
    &:hover > .try-for-free-label{
      color: $arc-clr-white;
      transition: color .3s ease;
    }
  }
  .try-for-free-label {
    color: $arc-clr-grey-light;
    font-size: 12px;
    margin-bottom: 0;
  }
</style>

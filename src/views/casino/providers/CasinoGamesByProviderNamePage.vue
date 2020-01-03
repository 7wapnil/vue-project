<template>
  <div>
    <b-row
      v-if="!gamesCollection.length"
      no-gutters>
      <b-col class="text-center p-4">
        {{ $t('casino.noProviders') }}
      </b-col>
    </b-row>

    <category-play-items :play-items="gamesCollection"/>
  </div>
</template>

<script>
import CategoryPlayItems from '@/components/casino-games/play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_BY_PROVIDER } from '@/graphql'

export default {
  components: {
    CategoryPlayItems
  },
  data () {
    return {
      itemsPerPage: 20,
      gamesCollection: []
    }
  },
  computed: {
    formatLabelName () {
      const name = this.$route.params.providerName
      const capitalizedName = name.substr(0, 1).toUpperCase() +
                    name.substr(1).toLowerCase()

      return capitalizedName.split('-').join(' ')
    }
  },
  created () {
    this.$route.params.category = 'providers'
    this.$route.params.label = this.$route.params.providerFullName || this.formatLabelName
  },
  apollo: {
    providerGames () {
      return {
        query: GAMES_BY_PROVIDER,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            page: 1,
            perPage: this.itemsPerPage,
            providerSlug: this.$route.params.providerName
          }
        },
        result ({ data }) {
          this.gamesCollection = data.gamesByProvider.collection
        }
      }
    }
  }
}
</script>

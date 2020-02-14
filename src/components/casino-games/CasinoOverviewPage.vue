<template>
  <b-row no-gutters>
    <b-col class="pt-0 pb-4 py-md-4">
      <loader v-if="$apollo.loading"/>
      <b-col
        v-if="errorMessage"
        class="px-4">
        <h4
          class="mb-0 text-arc-clr-iron">
          {{ errorMessage }}
        </h4>
      </b-col>
      <div v-if="!errorMessage">
        <overview-play-items
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :play-items="category.playItems"/>
      </div>
      <overview-providers/>
    </b-col>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import OverviewPlayItems from '@/components/casino-games/play-items-list/OverviewPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_OVERVIEW_QUERY, COUNTRY_BY_REQUEST_QUERY } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'
import OverviewProviders from '@/components/casino-games/OverviewProviders'

export default {
  components: {
    OverviewPlayItems,
    OverviewProviders
  },
  data () {
    return {
      categories: [],
      emptyOverview: false,
      country: null
    }
  },
  computed: {
    errorMessage () {
      if (!this.emptyOverview) return false

      return this.$i18n.t('casino.playItemsList.noGamesOverview', { country: this.country })
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.casino.title'),
      description: this.$i18n.t('meta.casino.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  apollo: {
    gamesOverview () {
      return {
        query: GAMES_OVERVIEW_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data: { gamesOverview } }) {
          if (this.noGamesForCategories(gamesOverview)) {
            this.emptyOverview = true
          }

          this.categories = gamesOverview.map((category, index) => {
            return {
              ...category,
              icon: findCategoryIcon({ context: category.context }),
              index: index + 1 // + 1 because of default category
            }
          })
        }
      }
    },
    countryByRequest () {
      return {
        query: COUNTRY_BY_REQUEST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data: { countryByRequest: { country } } }) {
          this.country = country
        }
      }
    }
  },
  methods: {
    noGamesForCategories (gamesOverview) {
      return gamesOverview
        .flatMap(category => { return category.playItems.length })
        .every(element => { return !element })
    }
  }
}
</script>

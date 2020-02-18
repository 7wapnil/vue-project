<template>
  <b-row no-gutters>
    <b-col class="py-4">
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
          :id="category.context"
          :play-items="category.playItems"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import OverviewPlayItems from '@/components/casino-games/play-items-list/OverviewPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { TABLES_OVERVIEW_QUERY, COUNTRY_BY_REQUEST_QUERY } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'

export default {
  components: {
    OverviewPlayItems
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
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.live-casino.title'),
      description: this.$i18n.t('meta.live-casino.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  apollo: {
    tablesOverview () {
      return {
        query: TABLES_OVERVIEW_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data: { tablesOverview } }) {
          if (this.noTablesForCategories(tablesOverview)) {
            this.emptyOverview = true
          }

          this.categories = tablesOverview.map((category, index) => {
            return {
              ...category,
              icon: findCategoryIcon({ context: category.context }),
              index
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
    noTablesForCategories (tablesOverview) {
      return tablesOverview
        .flatMap(category => { return category.playItems.length })
        .every(element => { return !element })
    }
  }
}
</script>

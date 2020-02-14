<template>
  <b-row no-gutters>
    <b-col class="pt-0 pb-4 py-md-4">
      <loader v-if="$apollo.loading"/>
      <overview-play-items
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :play-items="category.playItems"/>
      <overview-providers/>
    </b-col>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import OverviewPlayItems from '@/components/casino-games/play-items-list/OverviewPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_OVERVIEW_QUERY } from '@/graphql'
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
          this.categories = gamesOverview.map((category, index) => {
            return {
              ...category,
              icon: findCategoryIcon({ context: category.context }),
              index: index + 1 // + 1 because of default category
            }
          })
        }
      }
    }
  }
}
</script>

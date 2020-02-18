<template>
  <b-row no-gutters>
    <b-col class="py-4">
      <loader v-if="$apollo.loading"/>
      <overview-play-items
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :id="category.context"
        :play-items="category.playItems"/>
    </b-col>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import OverviewPlayItems from '@/components/casino-games/play-items-list/OverviewPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { TABLES_OVERVIEW_QUERY } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'

export default {
  components: {
    OverviewPlayItems
  },
  data () {
    return {
      categories: [],
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
          this.categories = tablesOverview.map((category, index) => {
            return {
              ...category,
              icon: findCategoryIcon({ context: category.context }),
              index
            }
          })
        }
      }
    }
  }
}
</script>

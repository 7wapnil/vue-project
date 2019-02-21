<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :tabs="tabsMapping" />
    </b-col>
  </b-row>
</template>

<script>
import FilterTabs from '@/views/events-list/FilterTabs'
import { UPCOMING_LIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  components: {
    FilterTabs
  },
  data () {
    return {
      tabsMapping: [{
        id: LIVE,
        title: 'Live now',
        context: LIVE
      }, {
        id: UPCOMING,
        title: 'Upcoming',
        context: UPCOMING_LIMITED
      }]
    }
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  }
}
</script>

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
import { LIVE, UPCOMING_LIMITED } from '@/constants/graphql/event-context'

export default {
  components: {
    FilterTabs
  },
  data () {
    return {
      tabsMapping: [{
        id: 'live',
        title: 'Live now',
        context: LIVE
      }, {
        id: 'upcoming',
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

<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :tournament-id="$route.params.tournamentId"
        :context="context" />
    </b-col>
  </b-row>
</template>

<script>
import FilterTabs from '@/views/events-list/FilterTabs'
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'

export default {
  components: {
    FilterTabs
  },
  data () {
    return {
      context: UPCOMING_FOR_TIME
    }
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  }
}
</script>

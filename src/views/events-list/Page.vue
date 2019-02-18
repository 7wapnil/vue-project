<template>
  <b-row no-gutters>
    <b-col>

      <introduction-area/>

      <sport-tabs v-if="showTitles" />

      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"
        :tabs="tabsMapping"/>

    </b-col>
  </b-row>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'
import { LIVE, UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'

export default {
  components: {
    IntroductionArea,
    SportTabs,
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
        context: UPCOMING_FOR_TIME
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

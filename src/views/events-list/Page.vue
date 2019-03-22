<template>
  <div sticky-container>
        <introduction-area/>
        <div>

          <div>
            <div v-sticky :sticky-offset="stickyOffset" sticky-side="top">
              Ш ФЬ ЫЕШСЛН
            </div>
          </div>

          <sport-tabs @category-tab-changed="" v-if="showTitles"/>

          <filter-tabs
            v-if="!showTitles"
            :title-id="$route.params.titleId"
            :tabs="tabsMapping"/>
        </div>
    </div>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  components: {
    IntroductionArea,
    SportTabs,
    FilterTabs
  },
  data () {
    return {
      stickyOffset: {
        top: 150
      },
      tabsMapping: [{
        id: LIVE,
        title: 'Live now',
        context: LIVE
      }, {
        id: UPCOMING,
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

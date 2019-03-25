<template>
  <div sticky-container>
        <!--<introduction-area :img-title="backgroundTitle"/>-->
        <div v-sticky
             sticky-offset="offset">

            <sport-tabs @tab-changed="onCategoryChange" v-if="showTitles"/>
            <filter-tabs @tab-changed="onFilterChange"/>

            <div>
                <!--<events-list-->
                <!--:title-id="titleId"-->
                <!--:tournament-id="tournamentId"-->
                <!--:category-id="categoryId"-->
                <!--:context="tab.context">-->
                <!--<template slot-scope="{ event }">-->
                <!--<hybrid-card-->
                <!--:event="event"-->
                <!--:tab-id="tab.id"/>-->
                <!--</template>-->
                <!--</events-list>-->
            </div>
        </div>
    </div>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'
import { findBackground } from '@/helpers/background-finder'

export default {
  components: {
    IntroductionArea,
    SportTabs,
    FilterTabs
  },
  data () {
    return {
      offset: {
        top: 80
      },
      selectedCategory: null,
      selectedFilter: null
    }
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    },
    key () {
      return this.selectedCategory ? this.selectedCategory.value : 'Huj'
    }
  },
  methods: {
    onCategoryChange(tab) {
      console.log('Category changed', tab)
      this.selectedCategory = tab
    },
    onFilterChange (tab) {
      console.log('Filter changed', tab)
      this.selectedFilter = tab
    },
    changeBackground(tab) {
    }
  }
}
</script>

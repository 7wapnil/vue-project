<template>
  <b-row>
    <b-col>

      <introduction-area/>

      <sport-tabs v-if="showTitles" />

      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"/>

    </b-col>
  </b-row>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'

export default {
  components: {
    IntroductionArea,
    SportTabs,
    FilterTabs
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  }
}
</script>

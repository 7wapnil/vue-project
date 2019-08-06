<template>
  <component
    :is="card"
    :event="event">
    <markets-list
      :item-component="item"
      :event="event"
      :markets="[event.dashboardMarket]"/>
  </component>
</template>
<script>
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    MarketsList
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    tabId: {
      type: String,
      required: true
    }
  },
  computed: {
    cardName () {
      let routeKind = this.$route.params.titleKind
      let cardname = `${routeKind}-${this.tabId}-card`
      if (this.isMobile) {
        return `mobile-${cardname}`
      }
      return cardname
    },
    formatedName () {
      const name = this.cardName
      return name
        .toLowerCase()
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    },
    card () {
      return () => ({
        component: import(/* webpackChunkName: "card" */`@/components/cards/${this.cardName}/${this.formatedName}`),
        loading: import('@/components/custom/Loader'),
        delay: 200,
        timeout: 3000
      })
    },
    item () {
      return () => import(/* webpackChunkName: "card-item" */`@/components/cards/${this.cardName}/${this.formatedName}Item`)
    }
  }
}
</script>

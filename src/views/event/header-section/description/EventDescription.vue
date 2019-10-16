<template>
  <b-col class="text-center">
    <event-starts-section
      :event="event"
      :is-live-event="isLiveEvent"/>
    <event-score-section :event="event"/>
    <event-status-section :event="event"/>
    <event-time-section
      :event="event"
      :is-live-event="isLiveEvent"/>
  </b-col>
</template>

<script>
export default {
  components: {
    'EventStartsSection': () => import(/* webpackChunkName: "EventStartsSection" */'@/views/event/header-section/description/EventStartsSection'),
    'EventScoreSection': () => import(/* webpackChunkName: "EventScoreSection" */'@/views/event/header-section/description/EventScoreSection'),
    'EventTimeSection': () => import(/* webpackChunkName: "EventTimeSection" */'@/views/event/header-section/description/EventTimeSection'),
    'EventStatusSection': () => import(/* webpackChunkName: "EventStatusSection" */'@/views/event/header-section/description/EventStatusSection')
  },
  props: {
    isLiveEvent: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

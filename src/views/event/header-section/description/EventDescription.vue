<template>
  <b-col class="text-center">
    <event-starts-section
      :event="event"
      :is-live-event="isLiveEvent"/>
    <event-score-section :event="event"/>
    <event-time-section
      :event="event"
      :is-live-event="isLiveEvent"/>
  </b-col>
</template>

<script>
import EventStartsSection from '@/views/event/header-section/description/EventStartsSection'
import EventScoreSection from '@/views/event/header-section/description/EventScoreSection'
import EventTimeSection from '@/views/event/header-section/description/EventTimeSection'

export default {
  components: {
    EventStartsSection,
    EventScoreSection,
    EventTimeSection
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

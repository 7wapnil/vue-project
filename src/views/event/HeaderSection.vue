<template>
  <event-details-background :title="{ name: event.title.name }">
    <event-breadcrumbs :event="event"/>
    <event-details
      :event="event"
      :showicons="showicons"/>
    <div class="introduction-area-tabs-container">
      <slot/>
    </div>
  </event-details-background>
</template>
<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import EventBreadcrumbs from '@/views/event/EventBreadcrumbs'
import EventDetails from '@/views/event/EventDetails'
import EventDetailsBackground from '@/views/event/EventDetailsBackground'

export default {
  components: {
    IntroductionArea,
    EventBreadcrumbs,
    EventDetails,
    EventDetailsBackground
  },
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    showicons: {
      type: Boolean,
      default: true
    }
  }
}
</script>

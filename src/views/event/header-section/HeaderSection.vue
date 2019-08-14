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
import EventBreadcrumbs from '@/views/event/header-section/EventBreadcrumbs'
import EventDetails from '@/views/event/header-section/EventDetails'
import EventDetailsBackground from '@/views/event/header-section/EventBackground'

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

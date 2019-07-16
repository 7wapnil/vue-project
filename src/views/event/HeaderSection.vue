<template>
  <introduction-area :title="{ name: event.title.name }">
    <event-breadcrumbs :event="event"/>
    <event-details
      :event="event"
      :showicons="showicons"/>
    <div class="introduction-area-tabs-container">
      <slot/>
    </div>
  </introduction-area>
</template>
<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import EventBreadcrumbs from '@/views/event/EventBreadcrumbs'
import EventDetails from '@/views/event/EventDetails'

export default {
  components: {
    IntroductionArea,
    EventBreadcrumbs,
    EventDetails
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

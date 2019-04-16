<template>
  <div>
    <introduction-area :title="{ name: event.title.name }"/>
    <div class="position-absolute w-100 top-0">
      <header-breadcrumbs :event="event"/>
      <event-details
        :event="event"
        :showicons="showicons"/>
      <slot/>
    </div>
  </div>
</template>
<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import HeaderBreadcrumbs from '@/views/event/HeaderBreadcrumbs'
import EventDetails from '@/views/event/EventDetails'

export default {
  components: {
    IntroductionArea,
    HeaderBreadcrumbs,
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

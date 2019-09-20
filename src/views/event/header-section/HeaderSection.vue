<template>
  <div>
    <event-details-background :title="{ name: getTitleName(event.title) }">
      <event-breadcrumbs
        :event="event"
        class="mb-0"/>
      <event-details
        v-if="!twitchOnline"
        :event="event"
        :showicons="showicons"/>
      <twitch-stream
        :original-event="event"
        @twitch-online="twitchOnline = !twitchOnline"/>
    </event-details-background>
    <div class="bg-arc-clr-soil-light pt-3">
      <slot/>
    </div>
  </div>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import TwitchStream from '@/components/events/TwitchStream'
import EventBreadcrumbs from '@/views/event/header-section/EventBreadcrumbs'
import EventDetails from '@/views/event/header-section/EventDetails'
import EventDetailsBackground from '@/views/event/header-section/EventBackground'
import { getTitleName } from '@/helpers/title-names'

export default {
  components: {
    IntroductionArea,
    TwitchStream,
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
  },
  data () {
    return {
      twitchOnline: false
    }
  },
  methods: {
    getTitleName
  }
}
</script>

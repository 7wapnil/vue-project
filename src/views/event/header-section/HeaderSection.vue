<template>
  <div>
    <event-details-background :title="{ name: getTitleName(event.title) }">
      <event-breadcrumbs
        :event="event"
        class="mb-0"/>
      <event-details
        v-if="!twitchOnline"
        :event="event"/>
      <twitch-stream
        :twitch-size="twitchSize"
        :original-event="event"
        @twitch-online="toogleTwitch"/>
      <slot/>
    </event-details-background>
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
    twitchSize: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      twitchOnline: false
    }
  },
  methods: {
    getTitleName,
    toogleTwitch (val) {
      this.twitchOnline = val
    }
  }
}
</script>

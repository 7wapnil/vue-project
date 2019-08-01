<template>
  <div v-if="event">
    <event-name-section :event="event"/>
    <event-description-wrapper :event="event">
      <first-competitor-section
        :showicons="showicons"
        :first-competitor="firstCompetitor"/>

      <event-description
        :is-live-event="isLiveEvent"
        :event="event"/>

      <second-competitor-section
        :showicons="showicons"
        :second-competitor="secondCompetitor"/>
    </event-description-wrapper>
  </div>
</template>
<script>
import { STARTED, SUSPENDED, INTERRUPTED } from '@/constants/event-statuses'
import EventNameSection from '@/views/event/header-section/description/EventNameSection'
import FirstCompetitorSection from '@/views/event/header-section/competitors/FirstCompetitorSection'
import SecondCompetitorSection from '@/views/event/header-section/competitors/SecondCompetitorSection'
import EventDescription from '@/views/event/header-section/description/EventDescription'
import EventDescriptionWrapper from '@/views/event/header-section/description/EventDescriptionWrapper'

export default {
  components: {
    EventNameSection,
    FirstCompetitorSection,
    SecondCompetitorSection,
    EventDescription,
    EventDescriptionWrapper
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    showicons: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    firstCompetitor () {
      const byQualifier = this.event.competitors.find((competitor) => {
        return competitor.qualifier === 'home'
      })

      return byQualifier || this.event.competitors[0]
    },
    secondCompetitor () {
      const byQualifier = this.event.competitors.find((competitor) => {
        return competitor.qualifier === 'away'
      })

      return byQualifier || this.event.competitors[1]
    },
    isLiveEvent () {
      return [STARTED, SUSPENDED, INTERRUPTED].includes(this.event.status)
    }
  }
}
</script>

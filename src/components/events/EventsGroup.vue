<template>
  <div>

    <group-header
      v-if="isTitle"
      :item="group"/>
    <group-sub-header
      v-if="isTournament"
      :item="group">
      <b-card
        v-for="event in group.children"
        :key="event.id"
        no-body>
        <hybrid-card
          :event="event"
          :tab-id="tabId"/>
      </b-card>
    </group-sub-header>

    <div v-if="hasChildren">
      <events-group
        v-for="(child, index) in children"
        :key="index"
        :group="child"
        :tab-id="tabId"/>
    </div>

  </div>
</template>

<script>
import GroupHeader from './GroupHeader'
import GroupSubHeader from './GroupSubHeader'
import HybridCard from '@/views/events-list/HybridCard'

export default {
  name: 'EventsGroup',
  components: {
    GroupHeader,
    GroupSubHeader,
    HybridCard
  },
  props: {
    group: {
      type: Object,
      required: true
    },
    tabId: {
      type: String,
      required: true
    }
  },
  computed: {
    hasChildren () {
      return this.children.length
    },
    children () {
      return this.group.children || []
    },
    isTitle () {
      return this.group.type === 'title'
    },
    isTournament () {
      return this.group.type === 'tournament'
    }
  }
}
</script>

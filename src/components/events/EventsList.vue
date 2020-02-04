<template>
  <b-card
    :id="tabId"
    :class="{'event-list-container' : dynamicEventListContainer}"
    no-body
    class="px-1 px-md-4 py-md-4">

    <div v-if="tabId">
      <events-group
        v-for="(group, index) in groupedEvents"
        :key="index"
        :group="group"
        :tab-id="tabId"/>
    </div>

    <loader
      v-if="loading"
      class="mt-5"/>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <h6 class="my-4">
        {{ $t('common.noEventsFound') }}
      </h6>
    </div>
  </b-card>
</template>

<script>
import EventsGroup from '@/components/events/EventsGroup'
import { CATEGORY, TOURNAMENT } from '@/constants/event-scopes/kinds'

const DEFAULT_POSITION = 9999

export default {
  components: {
    EventsGroup
  },
  props: {
    header: {
      type: String,
      default: 'Events'
    },
    tabId: {
      type: String,
      default: null
    },
    events: {
      type: Array,
      default: () => { return [] },
      required: true
    },
    loading: {
      type: Number,
      default: 0
    }
  },
  computed: {
    parentizeEvents () {
      return this.events.map((event) => {
        const { title, scopes } = event
        const category = scopes.find(scope => scope.kind === CATEGORY)
        const tournament = scopes.find(scope => scope.kind === TOURNAMENT)

        return {
          ...event,
          type: 'event',
          title: event.title,
          parent: {
            ...tournament,
            type: 'tournament',
            title: event.title,
            parent: {
              ...category,
              type: 'category',
              title: event.title,
              parent: {
                ...title,
                type: 'title'
              }
            }
          }
        }
      })
    },
    groupedEvents () {
      return this.buildEventBranch(this.parentizeEvents)
    },
    dynamicEventListContainer () {
      const isLobbyPage = this.$route.fullPath === '/esports' || this.$route.fullPath === '/sports'
      return this.isMobile && isLobbyPage
    }
  },
  methods: {
    buildEventBranch (items) {
      const branch = items
        .reduce(this.addItemToGroup, [])
        .sort((a, b) => {
          if (a.position === undefined && b.position === undefined) {
            return 0
          }

          if (a.position < DEFAULT_POSITION && b.position < DEFAULT_POSITION) {
            return a.position - b.position
          }

          if (a.position === DEFAULT_POSITION && b.position < DEFAULT_POSITION) {
            return 1
          }

          if (a.position < DEFAULT_POSITION && b.position === DEFAULT_POSITION) {
            return -1
          }

          if (a.position === DEFAULT_POSITION && b.position === DEFAULT_POSITION) {
            return this.sortByName(a, b)
          }

          return this.sortByName(a, b)
        })

      if (branch.length && branch[0].parent) {
        return this.buildEventBranch(branch)
      }

      return branch
    },
    addItemToGroup (groups, item) {
      let groupIndex = groups.findIndex(i => i.id === item.parent.id)

      // if group not found - create it
      if (groupIndex < 0) {
        groups.push({ ...item.parent, children: [] })
        groupIndex = groups.length - 1
      }

      // add item to group
      groups[groupIndex].children.push(item)

      return groups
    },
    sortByName (a, b) {
      if (a.name < b.name) { return -1 }
      if (a.name > b.name) { return 1 }

      return 0
    }
  }
}
</script>

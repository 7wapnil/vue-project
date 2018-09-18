<template>
  <b-card
    :header="header"
    class="mt-4">
    <b-card
      v-for="event in events"
      :key="event.id"
      class="mt-2">
      <div class="row">
        <div class="col">
          <h5 class="card-title">
            <router-link :to="{ name: 'event', params: { id: event.id } }">
              {{ event.description }}
            </router-link>
          </h5>
        </div>
      </div>

      <slot :event="event"/>

    </b-card>
  </b-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    header: {
      type: String,
      default: 'Events'
    },
    queryOptions: {
      type: Object,
      default () { return {} }
    }
  },
  sockets: {
    eventCreated ({ id }) {
      this.addEvent({
        variables: this.queryOptions,
        id
      })
    },
    eventUpdated ({ id, changes }) {
      this.updateEvent({
        variables: this.queryOptions,
        id,
        changes
      })
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState('events', [
      'events'
    ])
  },
  created () {
    this.loadEvents()
  },
  methods: {
    ...mapActions('events', [
      'loadList',
      'addEvent',
      'updateEvent'
    ]),
    loadEvents: function () {
      this.loading = true

      this
        .loadList({ variables: this.queryOptions })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

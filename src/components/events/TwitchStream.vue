<template>
  <b-row
    v-if="twitchStream"
    class="row no-gutters bg-arc-clr-soil-light pb-5">
    <div
      id="event-stream"
      class="mx-auto"/>
  </b-row>
</template>

<script>
import moment from 'moment'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

const TWITCH_URL = 'https://www.twitch.tv/'
const TWITCH_PLAYER_WIDTH = 600
const TWITCH_PLAYER_HEIGHT = 400
const TIME_POLLING_INTERVAL = 1000

export default {
  props: {
    originalEvent: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      now: moment(),
      player: undefined,
      showStream: false,
      currentEvent: this.originalEvent
    }
  },
  apollo: {
    event () {
      return {
        ...this.query,
        subscribeToMore: [
          {
            document: EVENT_UPDATED,
            variables () {
              return {
                id: parseInt(this.originalEvent.id)
              }
            },
            result (subscriptionData) {
              if (!this.currentEvent) return
              if (!(subscriptionData && subscriptionData.event)) return

              const oldUrl = this.currentEvent.twitchUrl
              const newUrl = subscriptionData.event.twitchUrl
              this.currentEvent = subscriptionData.event
              if (this.player && oldUrl !== newUrl) {
                this.player.setChannel(this.twitchChannel())
                return
              }

              this.clearTimeActions()
              if (this.player && this.twitchStream) {
                this.timer = setTimeout(() => { this.now = moment() }, this.timeoutToEnd())
              }
              if (!this.player && this.twitchStream) {
                this.timer = setTimeout(this.mountPlayer, this.timeout())
              }
              if (this.upcomingStream) {
                this.interval = this.setupIntervalStatusUpdate()
                this.timer = setTimeout(this.mountPlayer, this.timeout())
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    query () {
      return {
        query: EVENT_BY_ID_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          id: this.originalEvent.id
        }
      }
    },
    upcomingStream () {
      return this.hasStreamRequiredField() &&
              moment(this.currentEvent.twitchStartTime).diff(moment()) > 0
    },
    twitchStream () {
      return this.hasStreamRequiredField() &&
             moment(this.currentEvent.twitchStartTime).diff(this.now) <= 0 &&
             this.currentEvent.twitchEndTime &&
             moment(this.currentEvent.twitchEndTime).diff(this.now) > 0
    }
  },
  watch: {
    upcomingStream: function (val, oldVal) {
      if (!val) return

      this.clearTimeActions()
      this.interval = this.upcomingStream && this.setupIntervalStatusUpdate()
      this.timer = setTimeout(this.mountPlayer, this.timeout())
    }
  },
  created () {
    this.interval = this.upcomingStream && this.setupIntervalStatusUpdate()
    this.timer = (this.twitchStream || this.upcomingStream) &&
                 setTimeout(this.mountPlayer, this.timeout())
  },
  destroyed () {
    this.clearTimeActions()
  },
  methods: {
    mountPlayer () {
      const options = {
        width: TWITCH_PLAYER_WIDTH,
        height: TWITCH_PLAYER_HEIGHT,
        channel: this.twitchChannel()
      }
      // eslint-disable-next-line
      this.player = new Twitch.Player('event-stream', options)
      this.player.setVolume(0.5)
      this.clearTimeActions()
      this.timer = setTimeout(() => { this.now = moment() }, this.timeoutToEnd())
    },
    hasStreamRequiredField () {
      return this.isDesktop &&
             this.currentEvent &&
             this.currentEvent.visible &&
             this.currentEvent.twitchUrl &&
             this.currentEvent.twitchStartTime
    },
    twitchChannel () {
      return this.currentEvent.twitchUrl &&
             this.currentEvent.twitchUrl.replace(TWITCH_URL, '').split('/')[0]
    },
    timeout () {
      return (this.twitchStream || this.upcomingStream) &&
             moment(this.currentEvent.twitchStartTime).diff(moment()) + TIME_POLLING_INTERVAL
    },
    timeoutToEnd () {
      return moment(this.currentEvent.twitchEndTime).diff(moment())
    },
    clearTimeActions () {
      clearTimeout(this.timer)
      clearInterval(this.interval)
    },
    setupIntervalStatusUpdate () {
      return setInterval(() => {
        this.now = moment()
      }, TIME_POLLING_INTERVAL)
    }
  }
}
</script>

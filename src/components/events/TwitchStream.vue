<template>
  <b-row
    v-if="twitchStream"
    no-gutters>
    <b-col
      :class="[twitchSize ? 'mx-md-5' : 'mx-md-4']"
      class="twitch-section">
      <b-embed
        :src="currentEventLink"
        type="iframe"
        aspect="16by9"
        allowfullscreen/>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

const TWITCH_URL = 'https://www.twitch.tv/'
const EMBEDDED_URL = 'https://player.twitch.tv/?channel='

export default {
  props: {
    originalEvent: {
      type: Object,
      required: true
    },
    twitchSize: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      now: moment(),
      currentEvent: this.originalEvent
    }
  },
  apollo: {
    event () {
      return {
        ...this.query,
        subscribeToMore: {
          document: EVENT_UPDATED,
          variables () {
            return {
              id: parseInt(this.originalEvent.id)
            }
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            if (previousResult.data) {
              this.currentEvent = subscriptionData.data
            }
          }
        }
      }
    }
  },
  computed: {
    query () {
      return {
        query: EVENT_BY_ID_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: { slug: this.originalEvent.slug }
      }
    },
    twitchStream () {
      return this.hasStreamRequiredField() &&
             moment(this.currentEvent.twitchStartTime).diff(this.now) <= 0 &&
             moment(this.currentEvent.twitchEndTime).diff(this.now) > 0
    },
    currentEventLink () {
      if (this.twitchStream) {
        this.$emit('twitch-online', true)
        return `${EMBEDDED_URL + this.twitchChannel()}`
      }
    }
  },
  methods: {
    hasStreamRequiredField () {
      return !this.isMobile &&
             this.currentEvent &&
             this.currentEvent.visible &&
             this.currentEvent.twitchUrl &&
             this.currentEvent.twitchStartTime &&
             this.currentEvent.twitchEndTime
    },
    twitchChannel () {
      return this.currentEvent.twitchUrl &&
             this.currentEvent.twitchUrl.replace(TWITCH_URL, '').split('/')[0]
    }
  }
}
</script>

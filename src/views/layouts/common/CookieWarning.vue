<template>
  <b-container
    v-if="showWarning"
    fluid
    class="cookie-container p-0 position-sticky">
    <b-row
      class="cookie-section"
      no-gutters>
      <b-col
        class="d-flex align-items-center justify-content-center py-4 py-md-0 pl-md-5"
        cols="12"
        md="auto">
        <img src="~@/assets/images/common/cookies.svg">
      </b-col>
      <b-col class="px-5 pb-5 pt-0 p-md-5">
        <h4 class="font-weight-light text-arc-clr-white mb-4 letter-spacing-2">
          We value your privacy
        </h4>
        <h6 class="text-arc-clr-iron letter-spacing-2 mb-0 line-height-24">
          This website uses cookies to ensure you get the best experience on our site and to provide a
          comment feature. To analyze our traffic, we use basic Google Analytics implementation with anonymized data.
          If you continue without changing your settings, we'll assume that you are happy to receive
          all cookies on the Public website. To understand more about how we use cookies, or for information
          on how to change your cookie settings, please see our
          <b-link
            :to="{ name: 'cookie policy'}"
            class="text-arc-clr-iron-light font-weight-bold letter-spacing-2">
            Cookie Policy
          </b-link>
        </h6>
      </b-col>
      <b-col
        class="d-flex align-items-center justify-content-center px-5 mb-4 mb-md-0"
        cols="12"
        md="auto">
        <b-button
          :block="isMobile"
          variant="user-profile-button"
          class="text-uppercase letter-spacing-2"
          @click="acceptCookieWarning">
          I Accept
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'
import { isCookie, setCookie } from '@/helpers/cookies'

export default {
  data () {
    return {
      showWarning: true
    }
  },
  computed: {
    yearFromNow () {
      return moment().add(1, 'years').toDate();
    }
  },
  beforeMount () {
    this.showWarning = !isCookie('COOKIES')
  },
  methods: {
    acceptCookieWarning () {
      setCookie('COOKIES', true, this.yearFromNow)
      this.showWarning = false
    }
  }
}
</script>

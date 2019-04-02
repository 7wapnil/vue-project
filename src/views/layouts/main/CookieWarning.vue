<template>
  <b-collapse
    v-model="showWarning">
    <b-navbar
      fixed="bottom"
      class="pt-3 pb-0">
      <b-container
        fluid
        style="max-width: 1920px"
        class="p-0">
        <b-row>
          <b-col
            cols="10">
            <h5>We value your privacy</h5>
            <p style="font-size: 14px;">
              This website uses cookies to ensure you get the best experience on our site and to provide a
              comment feature. To analyze our traffic, we use basic Google Analytics implementation with anonymized data.
              If you continue without changing your settings, we'll assume that you are happy to receive
              all cookies on the Public website. To understand more about how we use cookies, or for information
              on how to change your cookie settings, please see our <b-link :to="{ name: 'cookie policy'}">Cookie Policy</b-link>
            </p>
          </b-col>
          <b-col
            cols="2">
            <b-button
              type="button"
              class="btn btn-primary btn-md acceptcookies"
              @click="acceptCookieWarning()">
              I ACCEPT
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
  </b-collapse>
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

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
      <b-col class="text-center text-md-left px-4 pb-5 pt-0 p-md-5">
        <h4 class="font-weight-light text-arc-clr-white mb-4 letter-spacing-2">
          {{ $t('cookies.header') }}
        </h4>
        <h6 class="text-arc-clr-iron letter-spacing-2 mb-0 line-height-24">
          {{ $t('cookies.description') }}
          <u>
            <b-link
              :to="{ name: 'Cookie Policy'}"
              class="text-arc-clr-iron-light font-weight-bold letter-spacing-2 ">
              {{ $t('cookies.policy') }}
            </b-link>
          </u>
        </h6>
      </b-col>
      <b-col
        class="d-flex align-items-center justify-content-center px-4 mb-4 mb-md-0"
        cols="12"
        md="auto">
        <b-button
          :block="isMobile"
          variant="user-profile-button"
          class="text-uppercase letter-spacing-2"
          @click="acceptCookieWarning">
          {{ $t('cookies.accept') }}
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

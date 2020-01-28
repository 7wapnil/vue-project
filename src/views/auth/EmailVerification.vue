<template>
  <div class="bg-arc-clr-soil-darker">
    <b-row no-gutters>
      <b-col class="text-center mt-4">
        <b-img
          :width="300"
          :src="require('@/assets/images/logo/arcanebet-logo.png')"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        cols="12"
        md="8"
        offset-md="2"
        class="pt-4 pt-md-5 pb-5 px-5">

        <loader v-if="sending"/>

        <b-row
          v-if="!sending"
          no-gutters>
          <b-col class="p-5 mb-5">
            <div
              v-if="error"
              class="text-center">
              <h4 class="font-weight-bold letter-spacing-2">
                Error occured!
              </h4>
              <p class="letter-spacing-2">
                {{ error }}
              </p>
            </div>
            <div
              v-if="!error"
              class="text-center">
              <h4 class="font-weight-bold letter-spacing-2">
                Well done!
              </h4>
              <p class="letter-spacing-2">
                {{ $t('account.accountVerification.activated') }}
              </p>
            </div>
          </b-col>
        </b-row>

        <b-row
          no-gutters>
          <b-col class="text-left px-2 px-md-4">
            <b-button
              :to="{ path: '/esports' }"
              :block="isMobile"
              size="lg"
              variant="arc-secondary"
              class="px-5 bg-arc-clr-esport-bg border-0 letter-spacing-2 font-weight-bold mb-4 text-uppercase">
              {{ $t('noFoundPage.esportButton') }}
            </b-button>
          </b-col>
          <b-col class="text-right px-2 px-md-4">
            <b-button
              :block="isMobile"
              :to="{ path: '/sports'}"
              size="lg"
              variant="arc-secondary"
              class="px-5 bg-arc-clr-sport-bg border-0 letter-spacing-2 font-weight-bold mb-4 text-uppercase">
              {{ $t('noFoundPage.sportButton') }}
            </b-button>
          </b-col>
          <b-col class="text-right px-2 px-md-4">
            <b-button
              :block="isMobile"
              :to="{ path: '/casino'}"
              size="lg"
              variant="arc-secondary"
              class="px-5 bg-arc-clr-casino-bg border-0 letter-spacing-2 font-weight-bold text-uppercase">
              {{ $t('noFoundPage.casinoButton') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { VERIFY_EMAIL } from '@/graphql'

export default {
  data () {
    return {
      sending: true,
      error: null
    }
  },
  computed: {
    token () {
      return this.$route.params.token
    }
  },
  created () {
    this.verifyEmail()
  },
  methods: {
    verifyEmail () {
      this
        .$apollo
        .mutate({
          mutation: VERIFY_EMAIL,
          variables: { token: this.token }
        })
        .then(({ data: { verifyEmail } }) => {
          this.$gtm.push({
            event: 'Email verified',
            customerID: verifyEmail.userId,
            page: this.$route.fullPath
          })
          this.$log.info('Email verified')
        })
        .catch(({ graphQLErrors }) => {
          if (graphQLErrors) {
            this.error = graphQLErrors[0].message
          }
        })
        .finally(() => { this.sending = false })
    }
  }
}
</script>

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
                Error accured!
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
                Your account successfully activated
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
              class="px-5 bg-arc-clr-sport-bg border-0 letter-spacing-2 font-weight-bold text-uppercase">
              {{ $t('noFoundPage.sportButton') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <arc-footer v-if="!isMobile"/>
    <mobile-footer v-if="isMobile"/>
  </div>
</template>

<script>
import { ACTIVATE_ACCOUNT } from '@/graphql'
import ArcFooter from '@/views/layouts/desktop/Footer'
import MobileFooter from '@/views/layouts/mobile/footer/Footer'

export default {
  components: {
    ArcFooter,
    MobileFooter
  },
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
    this.activate()
  },
  methods: {
    activate () {
      this
        .$apollo
        .mutate({
          mutation: ACTIVATE_ACCOUNT,
          variables: { token: this.token }
        })
        .then(() => {
          this.$log.info('Account activated')
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

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
        <section-buttons/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { VERIFY_EMAIL } from '@/graphql'
import SectionButtons from '@/views/layouts/common/SectionButtons'

export default {
  components: {
    SectionButtons
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

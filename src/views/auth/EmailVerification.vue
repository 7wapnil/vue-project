<template>
  <simple-layout>
    <loader v-if="sending"/>

    <b-row v-if="!sending">
      <b-col>
        <b-alert
          v-if="error"
          variant="danger"
          show>
          <h4 class="alert-heading">Error accured!</h4>
          <p>{{ error }}</p>
          <router-link
            :to="{ name: 'home' }"
            class="btn btn-primary">Home page</router-link>
        </b-alert>
        <b-alert
          v-if="!error"
          variant="success"
          show>
          <h4 class="alert-heading">Well done!</h4>
          <p>Your email successfully verified.</p>
          <router-link
            :to="{ name: 'home' }"
            class="btn btn-primary">Home page</router-link>
        </b-alert>
      </b-col>
    </b-row>
  </simple-layout>
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

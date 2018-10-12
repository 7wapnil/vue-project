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
          <p>Your account successfully activated.</p>
          <router-link
            :to="{ name: 'home' }"
            class="btn btn-primary">Home page</router-link>
        </b-alert>
      </b-col>
    </b-row>
  </simple-layout>
</template>

<script>
import { ACTIVATE_ACCOUNT } from '@/graphql'

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

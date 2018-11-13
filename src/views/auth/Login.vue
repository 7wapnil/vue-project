<template>
  <form @submit.prevent="submit">
    <b-row no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="login-username">
          Username
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="login-username"
          v-model="fields.login"
          :state="getState('login')"
          type="text"
          aria-describedby="inputFeedbackUser"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackUser"
          :invalid-feedback="errors.username"/>
      </b-col>
    </b-row>
    <b-row
      class="mt-4"
      no-gutters>
      <b-col
        sm="3"
        align="right"
        class="mt-2 mr-3">
        <label for="login-password">
          Password
        </label>
      </b-col>
      <b-col cols="6">
        <b-form-input
          id="login-password"
          v-model="fields.password"
          :state="getState('password')"
          type="password"
          aria-describedby="inputFeedbackPassword"
          required/>
        <b-form-invalid-feedback
          id="inputFeedbackPassword"
          :invalid-feedback="errors.password"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        cols="6"
        class="mr-auto ml-auto">
        <b-button
          :disabled="submitting"
          class="my-4 ml-3"
          block
          type="submit">
          Sign in
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <b-link @click="$emit('tab-changed', 1)">
          Have no account yet? Sign up here
        </b-link>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import formsMixin from '@/mixins/forms'

export default {
  mixins: [formsMixin],
  data () {
    return {
      fields: {
        login: '',
        password: ''
      },
      submitting: false
    }
  },
  methods: {
    submit () {
      this.clearErrors()
      const input = this.fields
      this.submitting = true

      this.$store.dispatch('authenticate', input)
        .then(({ data: { signIn } }) => {
          this.$store.dispatch('login', signIn)
          this.$noty.success('Signed in successfully')
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          if (err.graphQLErrors && err.graphQLErrors.length) {
            this.$noty.warning(err.graphQLErrors[0].message)
          }
        })
        .finally(() => {
          this.submitting = false
        })
    }
  }
}
</script>

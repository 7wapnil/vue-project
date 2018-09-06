<template>
  <simple-layout>
    <div class="row">
      <div class="col-6 offset-3">
        <form @submit.prevent="submit">
          <h2>Sign In</h2>
          <hr>
          <b-form-group
            :state="getState('login')"
            :invalid-feedback="errors.username"
            label="Username or email"
            required="required">
            <b-form-input
              id="username"
              v-model="fields.login"
              :state="getState('login')"
              required="required"/>
          </b-form-group>
          <b-form-group
            :state="getState('password')"
            :invalid-feedback="errors.password"
            label="Password">
            <b-form-input
              id="password"
              v-model="fields.password"
              :state="getState('password')"
              type="password"
              required="required"/>
          </b-form-group>
          <button
            :disabled="submitting"
            class="btn btn-dark btn-block"
            type="submit">
            Sign In
          </button>
          <hr>
          <router-link :to="'sign-up'">
            Have no account yet? Sign up here
          </router-link>
        </form>
      </div>
    </div>
  </simple-layout>
</template>

<script>
import AccountService from '@/services/api/account'
import formsMixin from '@/mixins/forms'

export default {
  mixins: [formsMixin],
  data () {
    return {
      eventsService: new AccountService(this),
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

      this
        .eventsService
        .signIn(input)
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

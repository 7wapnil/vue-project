<template>
      <form @submit.prevent="submit">
        <b-row>
          <b-col sm="3" align="right" class="mt-2">
            <label for="login-username">
              Username
            </label>
          </b-col>
          <b-col sm="9">
            <b-form-input
                    id="login-username"
                    :state="getState('login')"
                    type="text"
                    required/>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col sm="3" align="right" class="mt-2">
            <label for="login-username">
              Password
            </label>
          </b-col>
          <b-col sm="9">
            <b-form-input
                    id="login-username"
                    :state="getState('password')"
                    type="text"
                    required/>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" class="mr-auto ml-auto">
            <b-button class="my-4"
                      :disabled="submitting"
                      block
                      type="submit">
              Sign in
            </b-button>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col align="center">
            <b-link :to="'sign-up'">
              Have no account yet? Sign up here
            </b-link>
          </b-col>
        </b-row>






        <!--<b-form-group-->
          <!--horizontal-->
          <!--:state="getState('login')"-->
          <!--:invalid-feedback="errors.username"-->
          <!--label="Username"-->
          <!--label-text-align="right"-->
          <!--label-class="form-label"-->
          <!--:label-cols="4"-->
          <!--breakpoint="lg"-->
          <!--required="required">-->
          <!--<b-form-input-->
            <!--id="login-username"-->
            <!--v-model="fields.login"-->
            <!--:state="getState('login')"-->
            <!--required="required"/>-->
        <!--</b-form-group>-->
        <!--<b-form-group-->
          <!--horizontal-->
          <!--label="Password"-->
          <!--label-text-align="right"-->
          <!--label-class="form-label"-->
          <!--:label-cols="4"-->
          <!--breakpoint="lg"-->
          <!--:state="getState('password')"-->
          <!--:invalid-feedback="errors.password">-->
          <!--<b-form-input-->
            <!--id="login-password"-->
            <!--v-model="fields.password"-->
            <!--:state="getState('password')"-->
            <!--type="password"-->
            <!--required="required"/>-->
        <!--</b-form-group>-->
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

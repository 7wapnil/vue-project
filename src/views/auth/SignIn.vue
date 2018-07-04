<template lang="pug">
    simple-layout
        .row
            .col-6.offset-3
                form(@submit.prevent="submit")
                    h2 Sign In
                    hr

                    b-form-group(
                        label="Username"
                        required
                        :state="getState('username')"
                        :invalid-feedback="errors.username"
                    )
                        b-form-input#username(v-model="fields.username" :state="getState('username')" required)

                    b-form-group(
                        label="Password"
                        :state="getState('password')"
                        :invalid-feedback="errors.password"
                    )
                        b-form-input#password(
                            type="password"
                            v-model="fields.password"
                            :state="getState('password')"
                            required
                        )

                    button.btn.btn-dark.btn-block(
                        type="submit"
                    ) Sign In

                    hr
                    router-link(:to="'sign-up'")
                        | Have no account yet? Sign up here

</template>

<script>
  import AccountService from '@/services/api/account'
  import formsMixin from '@/mixins/forms'

  export default {
    mixins: [formsMixin],
    data(){
      return {
        apiService: new AccountService(this),
        fields: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit() {
        this.clearErrors()
        const input = this.fields

        this
          .apiService
          .signIn(input)
          .then(({ data: { signIn } }) => {
            this.$store.commit('login', signIn)
            this.$noty.success('Signed in successfully')
            this.$router.push({ name: 'home' })
          })
          .catch((err) => {
            if (err.graphQLErrors && err.graphQLErrors.length) {
              this.$noty.warning(err.graphQLErrors[0].message)
            }
          })

      }
    }
  }
</script>

<template lang="pug">
    simple-layout
        .row
            .col-6.offset-3
                form
                    h2 Sign Up
                    hr

                    b-form-group(
                        label="Username"
                        required
                        :state="getState('username')"
                        :invalid-feedback="errors.username"
                    )
                        b-form-input#username(v-model="fields.username" :state="getState('username')")

                    b-form-group(
                        label="Email"
                        :state="getState('email')"
                        :invalid-feedback="errors.email"
                    )
                        b-form-input#email(v-model="fields.email" :state="getState('email')")

                    b-form-group(
                        label="First name"
                        :state="getState('first_name')"
                        :invalid-feedback="errors.first_name"
                        )
                        b-form-input#first_name(v-model="fields.first_name" :state="getState('first_name')")

                    b-form-group(
                        label="Last name"
                        :state="getState('last_name')"
                        :invalid-feedback="errors.last_name"
                    )
                        b-form-input#last_name(v-model="fields.last_name" :state="getState('last_name')")

                    b-form-group(
                        label="Birth Date"
                        :state="getState('date_of_birth')"
                        :invalid-feedback="errors.date_of_birth"
                    )
                        b-form-input#date_of_birth(v-model="fields.date_of_birth" :state="getState('date_of_birth')")

                    b-form-group(
                        label="Password"
                        :state="getState('password')"
                        :invalid-feedback="errors.password"
                    )
                        b-form-input#password(type="password" v-model="fields.password" :state="getState('password')")

                    b-form-group(
                        label="Password confirmation"
                        :state="getState('password_confirmation')"
                        :invalid-feedback="errors.password_confirmation"
                    )
                        b-form-input#password_confirmation(
                            type="password"
                            v-model="fields.password_confirmation"
                            :state="getState('password_confirmation')"
                        )

                    button.btn.btn-dark.btn-block(
                        type="button"
                        @click="submit"
                    ) Sign Up

                    hr
                    router-link(:to="'sign-in'")
                        | Have account already? Sign in here

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
          email: '',
          first_name: '',
          last_name: '',
          date_of_birth: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {
      submit() {
        this.clearErrors()
        const input = this.fields

        this
          .apiService
          .signUp(input)
          .then(({ data: { signUp } }) => {
            this.$store.commit('login', signUp)
            this.$router.push({ name: 'home' })
          })
          .catch(this.handleGraphQLErrors)

      }
    }
  }
</script>

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
                        flat-pickr#date_of_birth.form-control(
                            v-model="fields.date_of_birth",
                            :config="datePickerConfig",
                            :class="{'is-invalid': getState('date_of_birth') === false}"
                        )

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
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'
  import AccountService from '@/services/api/account'
  import formsMixin from '@/mixins/forms'

  export default {
    components: {
      flatPickr
    },
    mixins: [formsMixin],
    data(){
      return {
        apiService: new AccountService(this),
        fields: {
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          date_of_birth: moment().format('YYYY-MM-DD'),
          password: '',
          password_confirmation: ''
        },
        datePickerConfig: {
          altInput: true,
          dateFormat: 'Y-m-d',
          altFormat: 'j F Y'
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

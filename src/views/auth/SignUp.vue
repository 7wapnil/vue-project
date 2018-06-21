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
                        :state="getState('firstName')"
                        :invalid-feedback="errors.firstName"
                        )
                        b-form-input#firstName(v-model="fields.firstName" :state="getState('firstName')")

                    b-form-group(
                        label="Birth Date"
                        :state="getState('birthDate')"
                        :invalid-feedback="errors.birthDate"
                    )
                        b-form-input#birthDate(v-model="fields.birthDate" :state="getState('birthDate')")

                    b-form-group(
                        label="Password"
                        :state="getState('password')"
                        :invalid-feedback="errors.password"
                    )
                        b-form-input#password(type="password" v-model="fields.password" :state="getState('password')")

                    b-form-group(
                        label="Password confirmation"
                        :state="getState('passwordConfirm')"
                        :invalid-feedback="errors.passwordConfirm"
                    )
                        b-form-input#passwordConfirm(
                            type="password"
                            v-model="fields.passwordConfirm"
                            :state="getState('passwordConfirm')"
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
  export default {
    data(){
      return {
        fields: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          birthDate: '',
          password: '',
          passwordConfirm: ''
        },
        errors: {
          username: null,
          email: null,
          firstName: null,
          lastName: null,
          birthDate: null,
          password: null,
          passwordConfirm: null
        }
      }
    },
    methods: {
      getState(field) {
        if (!this.errors[field] || this.errors[field] === null) {
          return null
        }

        return !this.errors[field].length
      },
      submit() {
        this.errors.username = 'Error came here'
      }
    }
  }
</script>

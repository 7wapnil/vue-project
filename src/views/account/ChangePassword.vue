<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="mb-4">Change Password</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="form.errors.existing_password"
          horizontal
          class="text-right"
          label-size="md"
          label="Current password"
          label-for="current_password">
          <b-form-input
            id="current_password"
            :state="form.errors.state('existing_password')"
            v-model="form.existing_password"
            type="password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="form.errors.get('new_password')"
          horizontal
          class="text-right"
          label-size="md"
          label="New password"
          label-for="new_password">
          <b-form-input
            id="new_password"
            :state="form.errors.state('new_password')"
            v-model="form.new_password"
            type="password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="form.errors.new_password_confirmation"
          horizontal
          class="text-right"
          label-size="md"
          label="Repeat new password"
          label-for="repeat_password">
          <b-form-input
            id="repeat_password"
            :state="form.errors.new_password_confirmation ? false : null"
            v-model="form.new_password_confirmation"
            type="password"
            size="md"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right mt-3">
        <b-button
          class="mr-2"
          variant="outline-secondary"
          @click="form.reset()">
          Reset
        </b-button>
        <b-button
          :disabled="isSubmitDisabled"
          variant="primary"
          @click="changePassword">
          Change password
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { CHANGE_USER_PASSWORD } from '@/graphql'
import { Form } from '@/helpers'

export default {
  data () {
    return {
      form: new Form({
        existing_password: '',
        new_password: '',
        new_password_confirmation: '',
      }),
      sending: false
    }
  },
  computed: {
    hasEmptyFields () {
      return Object.keys(this.form.values()).filter((field) => {
        return this.form[field].trim().length === 0
      }).length > 0
    },
    isRepeatCorrect () {
      const values = this.form.values()
      return values.new_password === values.new_password_confirmation
    },
    isReallyNewPassword () {
      const values = this.form.values()
      return values.existing_password !== values.new_password
    },
    isLocalValidationSucceeded () {
      const errors = {}
      if (this.hasEmptyFields) return false
      if (!this.isRepeatCorrect) {
        errors['new_password_confirmation'] = 'Password confirmation is not equal'
      }
      if (!this.isReallyNewPassword) {
        errors['new_password'] = 'New password must be not equal to existing'
      }
      if (Object.keys(errors).length) {
        this.form.setErrors(errors)
        return false
      } else {
        this.form.clearErrors()
        return true
      }
    },
    isSubmitDisabled () {
      return !this.isLocalValidationSucceeded || this.sending
    }
  },
  methods: {
    changePassword () {
      this.form.clearErrors()
      this.sending = true

      this.$apollo.mutate({
        mutation: CHANGE_USER_PASSWORD,
        variables: {
          ...this.form.values()
        }
      }).then(({ data: { changePassword } }) => {
        if (changePassword) {
          this.$noty.success('Your password successfully changed')
          this.form.reset()
        } else {
          this.$noty.error('Wrong old password')
        }
      }).catch(({ graphQLErrors }) => {
        const errors = {}
        graphQLErrors.forEach((error) => {
          errors[error.path] = error.message
        })
        this.form.setErrors(errors)
      }).finally(() => {
        this.sending = false
      })
    }
  }
}
</script>

<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="currentPassword"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.currentPassword') }}:
        </label>
      </b-col>
      <b-col
        class="ml-4"
        lg="6"
        col="9">
        <b-form-input
          id="currentPassword"
          :state="form.errors.state('existingPassword')"
          v-model="form.existingPassword"
          type="password"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col cols="2"/>
      <b-col class="ml-4">
        {{ form.errors.existingPassword }}
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="newPassword"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.newPassword') }}:
        </label>
      </b-col>

      <b-col
        class="ml-4"
        col="9"
        lg="6">
        <b-form-input
          id="newPassword"
          :state="form.errors.state('newPassword')"
          v-model="form.newPassword"
          type="password"/>
      </b-col>
    </b-row>
    <b-row
      v-if="form.errors.has('newPassword')"
      no-gutters>
      <b-col cols="3"/>
      <b-col
        class="ml-4 text-wp-clr-notif-red font-size-14 d-flex align-items-start"
        style="height: 40px">
        {{ form.errors.get('newPassword') }}
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="repeatPassword"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.repeatPassword') }}:
        </label>
      </b-col>

      <b-col
        class="ml-4"
        col="9"
        lg="6">
        <b-form-input
          id="repeatPassword"
          :state="form.errors.newPasswordConfirmation ? false : null"
          v-model="form.newPasswordConfirmation"
          type="password"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        {{ form.errors.newPasswordConfirmation }}
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col cols="3"/>
      <b-col
        class="ml-4"
        col="9"
        lg="6">
        <b-button
          :disabled="isSubmitDisabled"
          block
          variant="user-profile-button"
          @click="changePassword">
          {{ $t('account.cta.resetPassword') }}
        </b-button>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import { CHANGE_USER_PASSWORD } from '@/graphql/index'
import { Form } from '@/helpers/index'

export default {
  data () {
    return {
      form: new Form({
        existingPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
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
      return values.newPassword === values.newPasswordConfirmation
    },
    isReallyNewPassword () {
      const values = this.form.values()
      return values.existingPassword !== values.newPassword
    },
    isLocalValidationSucceeded () {
      const errors = {}
      if (this.hasEmptyFields) return false
      if (!this.isRepeatCorrect) {
        errors['newPasswordConfirmation'] = 'Password confirmation is not equal'
      }
      if (!this.isReallyNewPassword) {
        errors['newPassword'] = 'New password must be not equal to existing'
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

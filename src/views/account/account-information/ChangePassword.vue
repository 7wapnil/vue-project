<template>
  <div>
    <b-list-group-item
      v-b-toggle.password-change
      class="bonus-item bg-arc-clr-soil-light px-0 border-0">
      <b-container
        fluid
        class="px-0">
        <b-row no-gutters>
          <b-col
            cols="auto"
            class="mr-2 d-flex align-items-center">
            <span class="bonus-expand-circle">
              <icon
                name="bonus-chevron-down"
                size="8px"
                color="arc-clr-iron"/>
            </span>
          </b-col>
          <b-col class="p-4 user-profile-form">
            <h4 class="font-weight-light mb-0">
              {{ $t('account.accountInfo.changePassword') }}
            </h4>
          </b-col>
          <b-col/>
        </b-row>
      </b-container>
    </b-list-group-item>
    <b-collapse id="password-change">
      <b-container
        fluid
        class="px-0 py-5">
        <b-row
          class="mb-4"
          no-gutters>
          <b-col class="text-md-right text-sm-left align-self-center">
            <label
              for="current_password"
              class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
              {{ $t('account.accountInfo.currentPassword') }}:
            </label>
          </b-col>
          <b-col class="align-self-center user-profile-form">
            <b-form-input
              id="current_password"
              :state="form.errors.state('existing_password')"
              v-model="form.existing_password"
              class="ml-4"
              type="password"/>
          </b-col>
          <b-col/>
        </b-row>
        <b-row no-gutters>
          <b-col>
            {{ form.errors.existing_password }}
          </b-col>
        </b-row>

        <b-row
          class="mb-4"
          no-gutters>
          <b-col class="text-md-right text-sm-left align-self-center">
            <label
              for="new_password"
              class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
              {{ $t('account.accountInfo.newPassword') }}:
            </label>
          </b-col>

          <b-col class="align-self-center user-profile-form">
            <b-form-input
              id="new_password"
              :state="form.errors.state('new_password')"
              v-model="form.new_password"
              class="ml-4"
              type="password"/>
          </b-col>
          <b-col/>
        </b-row>
        <b-row
          v-if="form.errors.has('new_password')"
          no-gutters>
          <b-col/>
          <b-col
            class="ml-4 pl-2 text-wp-clr-notif-red font-size-14 d-flex align-items-start user-profile-form"
            style="height: 40px">
            {{ form.errors.get('new_password') }}
          </b-col>
          <b-col/>
        </b-row>

        <b-row
          no-gutters>
          <b-col class="text-md-right text-sm-left align-self-center">
            <label
              for="repeat_password"
              class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
              {{ $t('account.accountInfo.repeatPassword') }}:
            </label>
          </b-col>

          <b-col class="align-self-center user-profile-form">
            <b-form-input
              id="repeat_password"
              :state="form.errors.new_password_confirmation ? false : null"
              v-model="form.new_password_confirmation"
              class="ml-4"
              type="password"/>
          </b-col>
          <b-col/>
        </b-row>
        <b-row no-gutters>
          <b-col>
            {{ form.errors.new_password_confirmation }}
          </b-col>
        </b-row>

      </b-container>

      <b-container fluid>
        <b-row no-gutters>
          <b-col/>
          <b-col class="mt-2 mb-4 ml-4 pl-2 user-profile-form">
            <b-button
              :disabled="isSubmitDisabled"
              variant="user-profile-button"
              @click="changePassword">
              {{ $t('account.cta.resetPassword') }}
            </b-button>
          </b-col>
          <b-col/>
        </b-row>
      </b-container>
    </b-collapse>
  </div>
</template>

<script>
import { CHANGE_USER_PASSWORD } from '@/graphql/index'
import { Form } from '@/helpers/index'

export default {
  data () {
    return {
      form: new Form({
        existing_password: '',
        new_password: '',
        new_password_confirmation: ''
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

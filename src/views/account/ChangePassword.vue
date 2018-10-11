<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="mb-4">Change Password</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="errors.existing_password"
          horizontal
          class="text-right"
          label-size="md"
          label="Current password"
          label-for="current_password">
          <b-form-input
            id="current_password"
            :state="errors.existing_password ? false : null"
            v-model="existing_password"
            type="password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="errors.new_password"
          horizontal
          class="text-right"
          label-size="md"
          label="New password"
          label-for="new_password">
          <b-form-input
            id="new_password"
            :state="errors.new_password ? false : null"
            v-model="new_password"
            type="password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          :invalid-feedback="errors.new_password_confirmation"
          horizontal
          class="text-right"
          label-size="md"
          label="Repeat new password"
          label-for="repeat_password">
          <b-form-input
            id="repeat_password"
            :state="errors.new_password_confirmation ? false : null"
            v-model="new_password_confirmation"
            type="password"
            size="md"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right mt-3">
        <b-button
          :disabled="!isSubmitDisabled"
          variant="primary"
          @click="changePassword">
          Change password
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { CHANGE_USER_PASSWORD } from '@/graphql'

export default {
  data () {
    return {
      existing_password: '',
      new_password: '',
      new_password_confirmation: '',
      errors: {}
    }
  },
  computed: {
    isSubmitDisabled () {
      return (this.existing_password &&
              this.new_password &&
              this.new_password_confirmation).length > 0
    }
  },
  methods: {
    changePassword () {
      this.errors = {}

      this.$apollo.mutate({
        mutation: CHANGE_USER_PASSWORD,
        variables: {
          existing_password: this.existing_password,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation
        }
      }).then(({ data: { changePassword } }) => {
        if (changePassword) {
          this.$noty.success('Your password successfully changed')
        } else {
          this.$noty.error('Unable to change password')
        }
      }).catch(({ graphQLErrors }) => {
        graphQLErrors.forEach((error) => {
          this.$set(this.errors, error.path, error.message)
        })
      })
    }
  }
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="mb-4">Password</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="Current password:"
          label-for="current_password">
          <b-form-input
            id="current_password"
            v-model="existing_password"
            type="password"
            autocomplete="current-password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="New password:"
          label-for="new_password">
          <b-form-input
            id="new_password"
            v-model="new_password"
            type="password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="Repeat new password:"
          label-for="repeat_password">
          <b-form-input
            id="repeat_password"
            v-model="new_password_confirmation"
            type="password"
            size="md"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right mt-3">
        <b-button
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
      new_password_confirmation: ''
    }
  },
  methods: {
    changePassword () {
      this.$apollo.mutate({
        mutation: CHANGE_USER_PASSWORD,
        variables: {
          existing_password: this.existing_password,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation
        }
      }).then(() => {
        this.$noty.success('Your password successfully changed')
      }).catch(this.$log.error)
    }
  }
}
</script>

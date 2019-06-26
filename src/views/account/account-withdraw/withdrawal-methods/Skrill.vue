<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="skrill_email_address"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Skrill email address:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="skrill_email_address"
          v-model="fields.skrill_email_address"
          class="ml-4 text-left w-50"
          type="text"
          @input="onInput()"/>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import formReset from '@/mixins/formReset'

export default {
  mixins: [formReset],
  data () {
    return {
      fields: {
        skrill_email_address: ''
      }
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', this.fields)
    }
  }
}
</script>

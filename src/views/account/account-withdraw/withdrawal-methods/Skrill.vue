<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="email"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Skrill email address:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <div class="ml-4 text-left w-50">
          {{ fields.email }}
        </div>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import formReset from '@/mixins/formReset'

export default {
  mixins: [formReset],
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fields: {
        email: this.method.details.email
      }
    }
  },
  created () {
    this.$emit('input', this.fields)
  }
}
</script>

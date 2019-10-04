<template>
  <b-row
    class="mb-4"
    no-gutters>
    <b-col class="text-md-right text-sm-left align-self-center">
      <label
        for="address"
        class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
        Bitcoin Address:
      </label>
    </b-col>
    <b-col class="user-profile-form">
      <b-form-input
        id="address"
        v-model="fields.address"
        class="ml-4 text-left w-50"
        type="text"
        @input="onInput()"/>
    </b-col>
    <b-col/>
  </b-row>
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
        address: ''
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

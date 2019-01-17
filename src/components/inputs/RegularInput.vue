<template>
  <b-row
    no-gutters
    class="mt-4">
    <b-col
      md="12"
      lg="10"
      class="mr-auto ml-auto ml-3"
      block>
      <div class="input-group-custom">
        <b-form-input
          :id="id"
          :type="type"
          v-model="content"
          :disabled="disabled"
          :autocomplete="autocomplete"
          class="bg-arc-clr-white"
          required
          @blur.native="handleBlur"
          @keydown.enter.native="handleEnter"
          @input="handleInput"/>
        <span
          v-if="bottomBar"
          class="bar"/>
        <label class="text-input">{{ label }}</label>
      </div>
      {{ feedback }}
      <b-form-invalid-feedback
        v-if="feedback"
        :id="feedbackId">{{ feedback }}</b-form-invalid-feedback>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'RegularInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    bottomBar: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    feedback: {
      type: String,
      default: ''
    },
    feedbackId: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      content: this.value
    }
  },
  watch: {
    'value' (testVal) {
      if (testVal) {
        this.content = testVal
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    },
    handleBlur (e) {
      this.$emit('blur')
    },
    handleEnter (e) {
      this.$emit(e.key)
    }
  }
}
</script>

<style lang="scss" scoped>
@include regularInput();
</style>

<template>
  <b-row
    no-gutters
    class="mt-4">
    <b-col
      md="12"
      lg="10"
      class="mr-auto ml-auto ml-3"
      block>
      <div class="input-group">
        <b-form-input
          id=""
          :type="type"
          v-model="content"
          required
          autocomplete="off"
          @input="handleInput"/>
        <span
          class="highlight"/>
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
      default: 'Name'
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
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/components/input";
@include regularInput();
</style>

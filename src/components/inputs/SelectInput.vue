<template>
  <div
    :class="className"
    class="input-group-select">
    <multiselect
      :placeholder="label"
      :options="options"
      :type="type"
      v-model="content"
      :show-labels="false"
      class="bg-arc-clr-white"
      required
      open-direction="bottom"
      autocomplete="off"
      @open="toggleLabel()"
      @close="toggleLabel()"
      @change="handleInput()"
      @input="handleInput()"/>
    <span
      class="highlight"/>
    <span
      v-if="bottomBar"
      class="bar"/>
    <label
      :class="{'up' : lift}"
      class="select">{{ label }}</label>
    <b-form-invalid-feedback
      v-if="feedback"
      :id="feedbackId"> {{ feedback }}</b-form-invalid-feedback>
  </div>
</template>

<script>
import Select from 'vue-multiselect'

export default {
  name: 'SelectInput',
  components: {
    'multiselect': Select
  },
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
      default: 'default-feedback-value'
    },
    feedbackId: {
      type: String,
      default: 'default-feedback-id'
    },
    className: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: this.value,
      lift: false
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    },
    toggleLabel () {
      this.lift = true;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@include selectInput();
</style>

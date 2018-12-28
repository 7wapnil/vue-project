<template>
  <div class="p-2 text-right">
    <label
      for="toggle-switch"
      class="mr-2 toggle-switch-label">
      <h6 class="m-0 text-arc-clr-iron-light d-flex align-items-center justify-content-center">
        {{ labelLeft }}
      </h6>
    </label>
    <label class="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        @click="toggle">
      <span class="toggle-slider"/>
    </label>
    <label
      for="toggle-switch"
      class="ml-2 toggle-switch-label">
      <h6 class="m-0 text-arc-clr-iron-light">
        {{ labelRight }}
      </h6>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    labelLeft: {
      type: String,
      default: 'labelLeft',
      required: false
    },
    labelRight: {
      type: String,
      default: 'labelRight',
      required: false
    },
    eventName: {
      type: String,
      default: 'toggle-switch-event',
      required: false
    }
  },
  methods: {
    toggle () {
      this.$emit(this.eventName, 1)
    }
  }
}
</script>

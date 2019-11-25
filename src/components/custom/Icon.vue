<template>
  <i
    :style="{ 'font-size': parseInt(size) + 'px' }"
    :class="'arc ' + 'arc-' + `${ name }` + `${ color ? ' text-' + `${ color }` : ''}`"/>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: [String, Array],
      default: '',
      required: false
    }
  }
}
</script>

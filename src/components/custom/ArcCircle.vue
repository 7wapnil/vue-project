<template>
  <div
    :class="['bg-' + bgColor,
             depends ? 'arc-circle' : 'text-' + color,
             displayClass]"
    :style="{ 'width': size + 'px',
              'height': size + 'px',
              'border-radius': '50px'}"
    class="align-items-center justify-content-center">
    <slot/>
  </div>

</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 10
    },
    color: {
      type: String,
      default: 'arc-clr-white'
    },
    bgColor: {
      type: String,
      default: 'arc-clr-soil-dark'
    },
    inline: {
      type: Boolean,
      default: false
    },
    depends: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    displayClass () {
      if (!this.show) return 'd-none'

      return this.inline ? 'd-inline-flex' : 'd-flex'
    }
  }
}
</script>

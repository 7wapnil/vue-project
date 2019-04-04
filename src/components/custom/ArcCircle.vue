<template>
  <div
    :class="['bg-' + bgColor,
             depends ? 'arc-circle' : 'text-' + color,
             inline ? 'd-inline-flex' : 'd-flex']"
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
    }
  }
}
</script>

<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <b-spinner :style="{ height, width: height }"
                variant="arc-clr-gold"/>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '100px'
    }
  }
}
</script>

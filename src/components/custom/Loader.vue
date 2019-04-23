<template>
  <div class="w-100 d-flex justify-content-center align-items-center m-4">
    <b-spinner
      :style="{ height: size, width: size }"
      variant="arc-clr-gold"/>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '50px'
    }
  }
}
</script>

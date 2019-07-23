<template>
  <div id="cryptoSection">
    <h5 class="my-4">Scan code</h5>
    <slot/>
    <h5 class="font-italic text">Raw address:</h5>
    <h5 class="text-break">{{ address }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      default: ''
    }
  }
}
</script>

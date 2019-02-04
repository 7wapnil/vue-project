<template>
  <b-link
    :to="link"
    class="pt-2"
    exact>
    <b-button>
      More
    </b-button>
  </b-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

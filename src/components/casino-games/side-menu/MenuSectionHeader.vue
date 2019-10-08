<template>
  <b-nav-item class="side-menu-categories menu-section d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark w-100">
    <span class="text-arc-clr-iron letter-spacing-2 text-uppercase">
      {{ section.title }}
    </span>
  </b-nav-item>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  }
}
</script>

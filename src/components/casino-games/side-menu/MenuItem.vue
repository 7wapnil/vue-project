<template>
  <b-nav-item class="side-menu-categories section-item font-weight-bold d-inline-flex align-items-center justify-content-start pt-3 pb-3 bg-arc-clr-soil-dark w-100">
    <b-row
      no-gutters>
      <b-col
        v-if="item.icon"
        cols="auto"
        class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
        <icon
          :name="item.icon"
          size="24px"/>
      </b-col>
      <b-col class="py-1 pr-3 d-flex align-items-center justify-content-start letter-spacing-2">
        <span class="text-truncate">
          {{ item.title }}
        </span>
      </b-col>
    </b-row>
  </b-nav-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

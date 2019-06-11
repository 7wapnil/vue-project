<template>
  <b-nav-item
    :to="`/${getSidebarKind}`"
    class="d-inline-flex align-items-center justify-content-start bg-arc-clr-soil-dark sidemenu-mobile-header">
    <b-row
      class="item-title"
      no-gutters>
      <b-col
        cols="auto"
        class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
        <icon
          name="arcanebet-default-icon"
          color="arc-clr-grey-light"
          size="24px"/>
      </b-col>
      <b-col class="pr-3 d-flex align-items-center justify-content-start">
        <span class="text-truncate letter-spacing-2 font-weight-bold">
          All {{ getSidebarKind }}
        </span>
      </b-col>
    </b-row>
  </b-nav-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  }
}
</script>

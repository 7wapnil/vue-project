<template>
  <b-row
    :class="[getSidebarKind === 'esports' ? 'bg-arc-clr-esport-bg' : 'bg-arc-clr-sport-bg']"
    class="mobile-navigation-sidemenu-logo-section"
    no-gutters>
    <b-col class="d-flex align-items-center justify-content-center">
      <img
        :src="require(`@/assets/images/logo/arcanebet-logo.svg`)"
        class="mb-1">
    </b-col>
  </b-row>
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

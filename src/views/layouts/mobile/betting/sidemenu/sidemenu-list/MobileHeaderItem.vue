<template>
  <b-nav-item
    class="d-inline-flex align-items-center justify-content-start mobile-navigation-sidemenu-content-header"
    @click="changeCategory">
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ]),
    changeCategory () {
      if (this.$route.params.titleKind === this.getSidebarKind) {
        this.toggleSidebar()
      }
      this.$router.push(`/${this.getSidebarKind}`)
    }
  }
}
</script>

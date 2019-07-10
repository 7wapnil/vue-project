<template>
  <b-row
    class="w-100 h-100"
    no-gutters>
    <b-col
      v-if="!isMenu && isMobile"
      cols="auto"
      class="d-flex align-items-center justify-content-start mr-2"
      @click="toggleMenu">
      <icon
        name="chevron-left"
        size="20px"
        color="arc-clr-iron-light"/>
    </b-col>
    <b-col
      v-if="isMobile"
      class="text-capitalize text-arc-clr-white text-truncate font-weight-light pr-2">
      {{ modalTitle }}
    </b-col>
    <b-col
      v-if="!isMobile"
      class="text-capitalize text-arc-clr-white text-truncate font-weight-light">
      {{ user.username + `'s profile` }}
    </b-col>
    <b-col
      cols="auto"
      class="text-right"
      @click="hideModal">
      <icon
        name="modal-close"
        size="24px"
        color="arc-clr-iron-light"/>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    ...mapGetters('tabs', {
      isMenu: 'getMenuStatus',
      sectionTitle: 'getTabTitle'
    }),
    modalTitle () {
      return this.isMenu ? `${this.user.username}'s profile` : this.sectionTitle
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('AccountModal')
    },
    ...mapMutations('tabs', [
      'toggleMenu'
    ])
  }
}
</script>

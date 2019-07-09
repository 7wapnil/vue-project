<template>
  <b-row
    class="w-100 h-100"
    no-gutters>
    <b-col
      v-if="!isMenu"
      cols="auto"
      class="d-flex align-items-center justify-content-start mr-2"
      @click="toggleMenu">
      <icon
        name="chevron-left"
        size="20px"
        color="arc-clr-iron-light"/>
    </b-col>
    <b-col class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
      {{ modalTitle }}
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

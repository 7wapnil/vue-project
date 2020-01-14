<template>
  <modal
    id="AccountLogoutModal"
    ref="AccountLogoutModalRef"
    :lazy="false"
    size="md"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    body-bg-variant="arc-clr-soil-dark"
    dialog-class="m-0 mx-md-auto my-md-5"
    body-class="p-4">

    <template slot="modal-header">
      <span class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
        Logout
      </span>
      <div @click="hideModal">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </div>
    </template>

    <b-row no-gutter>
      <b-col class="text-center p-4">
        <h5 class="mb-0 mb-md-4 letter-spacing-2 font-weight-light">
          Are you sure, you want to logout?
        </h5>
      </b-col>
    </b-row>
    <b-row
      class="p-4"
      no-gutters>
      <b-col
        cols="12"
        md="6"
        order="2"
        order-md="1"
        offset-md="0"
        offset="3"
        class="text-center">
        <b-button
          :block="isMobile"
          class="text-arc-clr-soil-black w-50"
          variant="secondary"
          @click="hideModal">
          Cancel
        </b-button>
      </b-col>
      <b-col
        cols="12"
        md="6"
        order="1"
        order-md="2"
        offset="3"
        offset-md="0"
        class="text-center mb-4 mb-md-0">
        <b-button
          :block="isMobile"
          class="w-50"
          variant="user-profile-button"
          @click.prevent="logout">
          Logout
        </b-button>
      </b-col>
    </b-row>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      dispatchLogout: 'logout'
    }),
    logout () {
      this.dispatchLogout(this)
      this.$bvModal.hide('AccountLogoutModal')
    },
    hideModal () {
      this.$bvModal.hide('AccountLogoutModal')
      this.$bvModal.show('AccountModal')
    }
  }
}
</script>

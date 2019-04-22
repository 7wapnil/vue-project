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
        <h5 class="mb-4 letter-spacing-2 font-weight-light">
          Are you sure, you want to logout?
        </h5>
      </b-col>
    </b-row>
    <b-row
      class="p-4"
      no-gutters>
      <b-col class="text-center">
        <b-button
          class="secondary text-arc-clr-soil-black w-50"
          @click="hideModal">
          Cancel
        </b-button>
      </b-col>
      <b-col class="text-center">
        <b-button
          variant="user-profile-button w-50"
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
      this.$noty.success('Signed out successfully')
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'AccountLogoutModal')
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }
  }
}
</script>

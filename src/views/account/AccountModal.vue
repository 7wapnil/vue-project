<template>
  <modal
    v-if="user"
    id="AccountModal"
    ref="AccountModalRef"
    :lazy="false"
    scrollable
    size="lg"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    content-class="bg-arc-clr-soil-darker"
    body-class="p-0">

    <modal-header :user="user"/>

    <vue-scroll>
      <account-sidebar/>
    </vue-scroll>

  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountSidebar from './AccountSidebar'
import ModalHeader from './AccountModalHeader'

export default {
  components: {
    AccountSidebar,
    ModalHeader
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

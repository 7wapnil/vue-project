<template>
  <modal
    v-if="user"
    id="AccountModal"
    ref="AccountModalRef"
    scrollable
    size="lg"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    content-class="bg-arc-clr-soil-darker"
    body-class="p-0">

    <template slot="modal-header">
      <span class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
        {{ user.username + ' profile' }}
      </span>
      <div @click="hideModal">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </div>
    </template>

    <account-sidebar/>

  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountSidebar from './AccountSidebar'

export default {
  components: {
    AccountSidebar
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    hideModal () {
      this.$refs.AccountModalRef.hide()
    }
  }
}
</script>

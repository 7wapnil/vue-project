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

    <template slot="modal-header">
      <span class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
        {{ user.username + '\'s profile' }}
      </span>
      <div @click="hideModal">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </div>
    </template>

    <vue-scroll :ops="scrollSettings">
      <account-sidebar/>
    </vue-scroll>

  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountSidebar from './AccountSidebar'

export default {
  components: {
    AccountSidebar
  },
  data () {
    return {
      scrollSettings: {
        bar: {
          size: '6px',
          opacity: 0.6,
          background: '#5e5e5e',
        },
        rail: {
          gutterOfSide: '6px'
        },
        scrollPanel: {
          easing: 'easeInCubic'
        }
      }
    }
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

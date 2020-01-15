<template>
  <modal
    id="AccountModal"
    :dialog-class="[ isMobile ? 'bg-arc-clr-soil-darker h-100 m-0' : '']"
    :body-class="`p-0 ${isMobile && isIosDevice ? 'ios-device' : ''}`"
    scrollable
    size="lg"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    content-class="bg-arc-clr-soil-light">

    <template #modal-header>
      <modal-header/>
    </template>

    <component :is="accountLayout"/>
  </modal>
</template>

<script>
import ModalHeader from './AccountModalHeader'

export default {
  components: {
    ModalHeader
  },
  computed: {
    accountLayout () {
      const name = this.isMobile ? 'Mobile' : 'Desktop'
      return () => import(`@/views/account/layouts/${name}Layout`)
    }
  }
}
</script>

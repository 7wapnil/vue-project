<template>
  <div>
    <account-sidebar v-if="isMenu"/>
    <component
      v-if="!isMenu"
      :is="currentComponent"
      class="p-4"/>
  </div>
</template>
<script>
import DesktopLayout from '@/views/account/layouts/DesktopLayout'
import AccountSidebar from '@/views/account/AccountSidebar'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountSidebar
  },
  extends: DesktopLayout,
  computed: {
    ...mapGetters('tabs', {
      isMenu: 'getMenuStatus'
    })
  }
}
</script>

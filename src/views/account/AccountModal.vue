<template>
  <modal
    id="AccountModal"
    :title="`${user.username}` + ' Profile'"
    size="lg"
    body-class="p-0">
    <b-tabs
      vertical
      nav-wrapper-class="col-3">
      <b-tab
        v-for="tab in tabs"
        :title="tab.title"
        :key="tab.id">
        <component :is="tab.component"/>
      </b-tab>
    </b-tabs>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './Account'
import NotImplemented from './NotImplemented'
import Activity from './Activity'
import ChangePassword from './ChangePassword'
import AccountVerification from './AccountVerification'

export default {
  components: {
    Account,
    Activity,
    ChangePassword,
    AccountVerification,
    NotImplemented
  },
  data () {
    return {
      tabs: [{
        id: 0,
        title: 'Account info & settings',
        component: 'account'
      }, {
        id: 1,
        title: 'Bonus',
        component: 'not-implemented'
      }, {
        id: 2,
        title: 'Promotions',
        component: 'not-implemented'
      }, {
        id: 3,
        title: 'Activity',
        component: 'activity'
      }, {
        id: 4,
        title: 'Deposit funds',
        component: 'not-implemented'
      }, {
        id: 5,
        title: 'Withdraw funds',
        component: 'not-implemented'
      }, {
        id: 6,
        title: 'Account verification',
        component: 'account-verification'
      }, {
        id: 7,
        title: 'Change password',
        component: 'change-password'
      }]
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

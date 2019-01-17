<template>
  <modal
    v-if="user"
    id="AccountModal"
    :title="`${user.username}` + ' Profile'"
    size="lg"
    header-class="d-flex align-items-center"
    body-class="p-0">
    <b-tabs
      v-model="tabIndex"
      vertical
      nav-wrapper-class="col-3 pr-0">
      <b-tab
        v-for="(tab, index) in tabs"
        :title-link-class="profileNavigation(index)"
        :key="tab.id">
        <template slot="title">
          <span class="nav-icon">
            {{ tab.icon }}
          </span>
          <span class="nav-title">
            {{ tab.title }}
          </span>
        </template>
        <component
          :is="tab.component"
          class="m-4"/>
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
import DepositFunds from './DepositFunds'

export default {
  data () {
    return {
      tabIndex: 0,
      tabs: [{
        id: 0,
        title: 'Account info & settings',
        component: Account,
        icon: 'i'
      }, {
        id: 1,
        title: 'Bonus',
        component: NotImplemented,
        icon: 'i'
      }, {
        id: 2,
        title: 'Promotions',
        component: NotImplemented,
        icon: 'i'
      }, {
        id: 3,
        title: 'Activity',
        component: Activity,
        icon: 'i'
      }, {
        id: 4,
        title: 'Deposit funds',
        component: DepositFunds,
        icon: 'i'
      }, {
        id: 5,
        title: 'Withdraw funds',
        component: NotImplemented,
        icon: 'i'
      }, {
        id: 6,
        title: 'Account verification',
        component: AccountVerification,
        icon: 'i'
      }, {
        id: 7,
        title: 'Change password',
        component: ChangePassword,
        icon: 'i'
      }]
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    profileNavigation (index) {
      if (this.tabIndex === index) {
        return 'activeNav'
      } else {
        return 'profileNav'
      }
    }
  }
}
</script>

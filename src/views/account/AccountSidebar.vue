<template>
  <b-row no-gutters>
    <b-col class="profile-modal-sidebar bg-arc-clr-soil-dark">

      <profile-wallet @open-deposit-tab="currentTabIndex = 4"/>

      <b-nav vertical>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{'profile-modal-nav-item-active': currentTabIndex === index }"
          class="profile-modal-nav-item bg-arc-clr-soil-black"
          @click="currentTabIndex = index">
          <span>
            <icon
              :name="tab.icon"
              class="tab-icon"
              size="24px"/>
          </span>
          <span class="ml-3 font-weight-bold font-size-14 tab-title">
            {{ tab.title }}
          </span>
        </b-nav-item>
      </b-nav>
    </b-col>
    <b-col class="profile-modal-nav-content p-5">
      <component :is="currentComponent"/>
    </b-col>
  </b-row>
</template>
<script>
import Account from './Account'
import Bonus from './AccountBonus'
import Promotions from './AccountPromotions'
import Activity from './Activity'
import DepositFunds from './DepositFunds'
import Withdraw from './AccountWithdraw'
import AccountVerification from './AccountVerification'
import ChangePassword from './ChangePassword'
import ProfileWallet from './ProfileWallet'

export default {
  components: {
    Account,
    Bonus,
    Promotions,
    Activity,
    DepositFunds,
    Withdraw,
    AccountVerification,
    ChangePassword,
    ProfileWallet
  },
  data () {
    return {
      currentTabIndex: this.$route.query.depositState ? 4 : 0,
      tabs: [{
        title: 'Account info & settings',
        component: Account,
        icon: 'profile-account'
      }, {
        title: 'Bonus',
        component: Bonus,
        icon: 'profile-bonus'
      }, {
        title: 'Promotions',
        component: Promotions,
        icon: 'profile-promotions'
      }, {
        title: 'Activity',
        component: Activity,
        icon: 'profile-account'
      }, {
        title: 'Deposit funds',
        component: DepositFunds,
        icon: 'profile-deposit'
      }, {
        title: 'Withdraw funds',
        component: Withdraw,
        icon: 'profile-withdraw'
      }, {
        title: 'Account verification',
        component: AccountVerification,
        icon: 'profile-account'
      }]
    }
  },
  computed: {
    currentComponent () {
      return this.tabs[this.currentTabIndex].component
    }
  }
}
</script>

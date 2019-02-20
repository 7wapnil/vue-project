<template>
  <b-row no-gutters>
    <b-col class="profile-modal-sidebar bg-arc-clr-soil-dark">
      <b-nav vertical>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{'profile-modal-nav-item-active': currentTab === tab.component }"
          class="profile-modal-nav-item bg-arc-clr-soil-black"
          @click="currentTab = tab.component">
          <span>
            <icon
              :name="tab.icon"
              size="24px"
              color="arc-clr-iron"/>
          </span>
          <span class="ml-3 font-weight-bold text-arc-clr-iron-light font-size-md">
            {{ tab.title }}
          </span>
        </b-nav-item>
      </b-nav>
    </b-col>
    <b-col class="profile-modal-nav-content p-5">
      <keep-alive>
        <component :is="currentTab"/>
      </keep-alive>
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

export default {
  components: {
    Account,
    Bonus,
    Promotions,
    Activity,
    DepositFunds,
    Withdraw,
    AccountVerification,
    ChangePassword
  },
  data () {
    return {
      currentTab: Account,
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
      }, {
        title: 'Change password',
        component: ChangePassword,
        icon: 'profile-account'
      }]
    }
  },
  mounted () {
    this.currentTab = this.$route.query.depositState ? 'DepositFunds' : 'Account'
  }
}
</script>

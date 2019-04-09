<template>
  <b-row no-gutters>
    <b-col class="profile-modal-sidebar bg-arc-clr-soil-dark">

      <profile-wallet @open-account-deposit-tab="changeTabIndex(depositTabIndex)"/>

      <b-nav vertical>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{'profile-modal-nav-item-active': currentTabIndex === index }"
          class="profile-modal-nav-item bg-arc-clr-soil-black"
          @click="changeTabIndex(index)">
          <span>
            <icon
              :name="tab.icon"
              :size="tab.size ? tab.size : '24px'"
              class="tab-icon"/>
          </span>
          <span class="ml-3 font-weight-bold font-size-14 tab-title">
            {{ tab.title }}
          </span>
        </b-nav-item>
        <b-nav-item
          class="profile-modal-nav-item bg-arc-clr-soil-black "
          @click.prevent="logout">
          <icon
            name="logout"
            class="tab-icon"
            size="24px"/>
          <span class="ml-3 font-weight-bold font-size-14 tab-title">
            Logout
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
import Account from './account-information/Page'
import Bonus from './account-bonus/Page'
import Activity from './account-activity/Page'
import DepositFunds from './account-deposit/Page'
import TransactionHistory from './account-transaction/TransactionHistory'
import Withdraw from './account-withdraw/Page'
import AccountVerification from './account-verification/AccountVerification'
import ChangePassword from './account-information/ChangePassword'
import ProfileWallet from './AccountWallet'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Account,
    Bonus,
    Activity,
    DepositFunds,
    Withdraw,
    AccountVerification,
    ChangePassword,
    ProfileWallet,
    TransactionHistory
  },
  data () {
    return {
      tabs: [{
        title: 'Account info & settings',
        component: Account,
        icon: 'account-information',
        id: 'account'
      }, {
        title: 'Bonus',
        component: Bonus,
        icon: 'account-bonus',
        id: 'account-bonus'
      }, {
        title: 'Activity',
        component: Activity,
        icon: 'account-activity',
        size: '18px',
        id: 'account-activity'
      }, {
        title: 'Deposit funds',
        component: DepositFunds,
        icon: 'account-deposit',
        id: 'deposit'
      }, {
        title: 'Withdraw funds',
        component: Withdraw,
        icon: 'account-withdraw',
        id: 'account-withdraw'
      }, {
        title: 'Account verification',
        component: AccountVerification,
        icon: 'account-verification',
        size: '20px',
        id: 'verification'
      }, {
        title: 'Transaction history',
        component: TransactionHistory,
        icon: 'account-activity',
        size: '18px',
        id: 'transaction'
      }]
    }
  },
  computed: {
    currentComponent () {
      return this.tabs[this.currentTabIndex].component
    },
    ...mapGetters('tabs', {
      currentTabIndex: 'getCurrentTabIndex'
    }),
    depositTabIndex () {
      return this.tabs.findIndex(tab => tab.id === 'deposit') || null
    }
  },
  created () {
    if (this.$route.query.depositState) {
      this.changeTabIndex(this.depositTabIndex)
    }
  },
  methods: {
    ...mapActions({
      dispatchLogout: 'logout'
    }),
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex'
    }),
    logout () {
      this.dispatchLogout(this)
      this.$noty.success('Signed out successfully')
    },
  }
}
</script>

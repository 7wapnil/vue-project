<template>
  <b-row no-gutters>
    <b-col class="profile-modal-sidebar bg-arc-clr-soil-dark">

      <profile-wallet @open-deposit-tab="changeTabIndex(depositTabIndex)"/>

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
          <span class="ml-3 font-weight-bold font-size-14 tab-title">Logout</span>
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
import Bonus from './bonus/Page'
import Activity from './Activity'
import DepositFunds from './DepositFunds'
import Withdraw from './withdraw/Page'
import AccountVerification from './account-verification/AccountVerification'
import ChangePassword from './ChangePassword'
import ProfileWallet from './ProfileWallet'
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
    ProfileWallet
  },
  data () {
    return {
      tabs: [{
        title: 'Account info & settings',
        component: Account,
        icon: 'profile-account',
        id: 'account'
      }, {
        title: 'Bonus',
        component: Bonus,
        icon: 'profile-bonus',
        id: 'bonus'
      }, {
        title: 'Activity',
        component: Activity,
        icon: 'profile-activity',
        size: '18px',
        id: 'activity'
      }, {
        title: 'Deposit funds',
        component: DepositFunds,
        icon: 'profile-deposit',
        id: 'deposit'
      }, {
        title: 'Withdraw funds',
        component: Withdraw,
        icon: 'profile-withdraw',
        id: 'withdraw'
      }, {
        title: 'Account verification',
        component: AccountVerification,
        icon: 'profile-account',
        id: 'verification'
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

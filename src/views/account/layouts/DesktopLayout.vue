<template>
  <b-row
    class="profile-modal-desktop"
    no-gutters>
    <b-col class="profile-modal-sidebar">
      <div class="profile-modal-sidebar-inner">
        <account-wallet @open-account-deposit-tab="changeTabIndex(depositTabIndex)"/>
        <b-nav
          class="h-100 bg-arc-clr-soil-black"
          vertical>
          <b-nav-item
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{'profile-modal-nav-item-active': currentTabIndex === index }"
            class="profile-modal-nav-item bg-arc-clr-soil-black"
            @click="changeTabIndex(index)">
            <icon
              :name="tab.icon"
              :size="tab.size ? tab.size : '24px'"
              class="tab-icon"/>
            <span class="ml-3 font-weight-bold font-size-14 tab-title">
              {{ tab.title }}
            </span>
          </b-nav-item>
          <livechat-item/>
          <b-nav-item
            class="profile-modal-nav-item bg-arc-clr-soil-black"
            @click="showConfirmationModal">
            <icon
              name="logout"
              class="tab-icon"
              size="24px"/>
            <span class="ml-3 font-weight-bold font-size-14 tab-title">
              Logout
            </span>
          </b-nav-item>
        </b-nav>
      </div>
    </b-col>

    <b-col class="profile-modal-content p-5">
      <component :is="currentComponent"/>
    </b-col>
  </b-row>
</template>
<script>
import ChangePassword from '@/views/account/account-information/ChangePassword'
import AccountWallet from '@/views/account/account-wallet/AccountWallet'
import { mapGetters, mapMutations } from 'vuex'
import LivechatItem from '@/views/account/account-menu-items/LivechatItem'

export default {
  components: {
    ChangePassword,
    AccountWallet,
    LivechatItem
  },
  data () {
    return {
      tabs: [{
        title: this.$i18n.t('account.tabs.account'),
        icon: 'account-information',
        id: 'account-information'
      }, {
        title: this.$i18n.t('account.tabs.bonus'),
        icon: 'account-bonus',
        id: 'account-bonus'
      }, {
        title: this.$i18n.t('account.tabs.betHistory'),
        icon: 'account-activity',
        size: '18px',
        id: 'account-activity'
      }, {
        title: this.$i18n.t('account.tabs.depositFunds'),
        icon: 'account-deposit',
        id: 'account-deposit'
      }, {
        title: this.$i18n.t('account.tabs.withdrawFunds'),
        icon: 'account-withdraw',
        id: 'account-withdraw'
      }, {
        title: this.$i18n.t('account.tabs.accountVerification'),
        icon: 'account-verification',
        size: '20px',
        id: 'account-verification'
      }, {
        title: this.$i18n.t('account.tabs.transactionHistory'),
        icon: 'account-history',
        id: 'account-transaction'
      }]
    }
  },
  computed: {
    currentComponent () {
      let component = this.tabs[this.currentTabIndex].id
      return () => import(`@/views/account/${component}/Page`)
    },
    ...mapGetters('tabs', {
      currentTabIndex: 'getCurrentTabIndex'
    }),
    depositTabIndex () {
      return this.tabs.findIndex(tab => tab.id === 'account-deposit') || null
    }
  },
  created () {
    if (this.$route.query.depositState) {
      this.changeTabIndex(this.depositTabIndex)
    }
  },
  methods: {
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex',
    }),
    showConfirmationModal () {
      this.$bvModal.hide('AccountModal')
      this.$bvModal.show('AccountLogoutModal')
    }
  }
}
</script>

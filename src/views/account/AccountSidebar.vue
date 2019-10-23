<template>
  <b-row no-gutters>
    <b-col>
      <profile-wallet @open-account-deposit-tab="changeTabIndex(depositTabIndex);addTabName('Deposit')"/>
      <b-nav
        class="h-100 bg-arc-clr-soil-black"
        vertical>
        <b-nav-item
          v-for="(tab, index) in tabs"
          :key="index"
          :class="[ isMobile ? 'profile-modal-nav-mobile-item' : 'profile-modal-nav-item' ]"
          class="profile-modal-nav-item bg-arc-clr-soil-black"
          @click="changeTabIndex(index); addTabName(tab.title)">
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
        <livechat-item/>
        <b-nav-item
          :class="[ isMobile ? 'profile-modal-nav-mobile-item' : 'profile-modal-nav-item' ]"
          class="bg-arc-clr-soil-black"
          @click="showConfirmationModal">
          <icon
            name="logout"
            class="tab-icon ml-1"
            size="20px"/>
          <span class="ml-3 font-weight-bold font-size-14 tab-title">
            Logout
          </span>
        </b-nav-item>
      </b-nav>
    </b-col>
  </b-row>
</template>
<script>
import ChangePassword from './account-information/ChangePassword'
import ProfileWallet from './AccountWallet'
import { mapGetters, mapMutations } from 'vuex'
import LivechatItem from '@/views/account/account-menu-items/LivechatItem';

export default {
  components: {
    LivechatItem,
    ChangePassword,
    ProfileWallet
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
        title: this.$i18n.t('account.tabs.activity'),
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
    },
    accountInfoTabIndex () {
      return this.tabs.findIndex(tab => tab.id === 'account-information') || null
    }
  },
  created () {
    if (this.$route.query.depositState) {
      this.changeTabIndex(this.depositTabIndex)
    }

    if (this.$route.query.changePassword) {
      this.changeTabIndex(this.accountInfoTabIndex)
    }
  },
  methods: {
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex',
      addTabName: 'addTabName'
    }),
    showConfirmationModal () {
      this.$bvModal.hide('AccountModal')
      this.$bvModal.show('AccountLogoutModal')
    }
  }
}
</script>

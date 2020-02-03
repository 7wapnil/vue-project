<template>
  <div>
    <loader v-if="loading"/>

    <div v-if="!loading">
      <withdrawal-placeholder v-if="!activeMethod"/>
      <withdraw-method-item
        :active-method="activeMethod"
        :withdrawal-methods="withdrawalMethods">
        <withdrawal-methods-switch
          :methods="withdrawalMethods"
          @update:withdraw:method="changeMethod"/>
      </withdraw-method-item>
      <withdrawal-form
        v-if="activeMethod"
        :default-method="activeMethod"/>
    </div>
  </div>
</template>

<script>
import WithdrawalMethodsSwitch from '@/views/account/account-withdraw/WithdrawalMethodsSwitch'
import WithdrawalPlaceholder from '@/views/account/account-withdraw/WithdrawalPlaceholder'
import WithdrawalForm from '@/views/account/account-withdraw/WithdrawalForm'
import { USER_WITHDRAWAL_METHODS_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import WithdrawMethodItem from '@/views/account/account-withdraw/WithdrawalMethodItem'

export default {
  components: {
    WithdrawalMethodsSwitch,
    WithdrawalForm,
    WithdrawalPlaceholder,
    WithdrawMethodItem
  },
  data () {
    return {
      selectedMethod: null,
      user: null,
      loading: 0
    }
  },
  apollo: {
    user () {
      return {
        query: USER_WITHDRAWAL_METHODS_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  },
  computed: {
    withdrawalMethods () {
      return this.user ? this.user.availableWithdrawalMethods : []
    },
    activeMethod () {
      return this.selectedMethod || this.withdrawalMethods[0] || null
    }
  },
  methods: {
    changeMethod (value) {
      this.selectedMethod = value
      this.$root.$emit('bv::toggle::collapse', 'withdrawMethod')
    }
  }
}
</script>

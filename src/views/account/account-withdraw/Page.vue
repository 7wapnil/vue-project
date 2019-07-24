<template>
  <div>
    <loader v-if="loading"/>

    <div v-if="!loading">
      <withdrawal-placeholder v-if="!activeMethod"/>

      <div v-if="activeMethod">
        <h3
          v-if="!isMobile"
          class="mb-5 font-weight-light">
          {{ $t('account.withdraw.withdrawFunds') }}
        </h3>
        <b-row
          v-b-toggle.withdrawMethod
          ref="changeMethodButton"
          no-gutters
          class="d-flex align-items-center"
          style="min-height: 80px; box-shadow: 0 1px 0 0 rgba(0,0,0,0.30)">
          <b-col
            class="p-2"
            cols="auto">
            <payment-method-icon :name="activeMethod.code"/>
          </b-col>
          <b-col
            class="ml-2">
            <span class="font-weight-bold letter-spacing-2 text-arc-clr-white">
              {{ activeMethod.name }}
            </span>
            <span
              v-if="!activeMethod.details.isEditable"
              class="font-size-12 letter-spacing-2 text-arc-clr-iron">
              ({{ activeMethod.details.title }})
            </span>
            <br>
            <span class="font-size-14 letter-spacing-2 text-arc-clr-iron">
              {{ activeMethod.note }}
            </span>
          </b-col>
          <b-col
            v-if="withdrawalMethods.length > 1"
            cols="auto">
            <b-button variant="arc-secondary">
              {{ $t('account.cta.changeWithdrawalMethod') }}
            </b-button>
          </b-col>
        </b-row>
        <b-collapse
          v-if="withdrawalMethods.length > 1"
          id="withdrawMethod">
          <withdrawal-methods-switch
            :methods="withdrawalMethods"
            @change="changeMethod"/>
        </b-collapse>
        <withdrawal-form
          v-if="activeMethod"
          :default-method="activeMethod"/>
      </div>
    </div>
  </div>
</template>

<script>
import WithdrawalMethodsSwitch from './WithdrawalMethodsSwitch'
import WithdrawalPlaceholder from './WithdrawalPlaceholder'
import WithdrawalForm from './WithdrawalForm'
import { USER_WITHDRAWAL_METHODS_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  components: {
    WithdrawalMethodsSwitch,
    WithdrawalForm,
    WithdrawalPlaceholder
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
      this.$refs.changeMethodButton.click()
    }
  }
}
</script>

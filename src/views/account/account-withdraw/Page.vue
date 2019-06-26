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
            :active-methods="userWithdrawalMethods"
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
import { WITHDRAWAL_METHODS_QUERY, USER_WITHDRAWAL_METHODS_QUERY } from '@/graphql'

const withdrawalMethodsAdapter = (methods) => {
  if (methods.length === 0 || !methods[0].hasOwnProperty('availability')) {
    return methods
  }

  return methods.map((method) => {
    return {
      code: method.code,
      name: method.name,
      note: method.note
    }
  })
}

export default {
  components: {
    WithdrawalMethodsSwitch,
    WithdrawalForm,
    WithdrawalPlaceholder
  },
  data () {
    return {
      withdrawalMethods: [],
      selectedMethod: null,
      user: null,
      loading: 0
    }
  },
  apollo: {
    withdrawalMethods () {
      return {
        query: WITHDRAWAL_METHODS_QUERY,
        update ({ withdrawalMethods }) {
          return withdrawalMethodsAdapter(withdrawalMethods)
        }
      }
    },
    user () {
      return {
        query: USER_WITHDRAWAL_METHODS_QUERY
      }
    }
  },
  computed: {
    userWithdrawalMethods () {
      if (!this.user || !this.user.availableWithdrawalMethods.length) {
        return []
      }

      return this.withdrawalMethods.filter((method) => {
        return this.user.availableWithdrawalMethods.includes(method.code)
      })
    },
    activeMethod () {
      return this.selectedMethod || this.userWithdrawalMethods[0] || null
    }
  },
  methods: {
    changeMethod (value) {
      this.selectedMethod = value
    }
  }
}
</script>

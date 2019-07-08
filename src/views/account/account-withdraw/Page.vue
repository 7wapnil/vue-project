<template>
  <div>
    <loader v-if="loading"/>

    <div v-if="!loading">
      <withdraw-placeholder v-if="!activeMethod"/>

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
            v-if="paymentMethods.length > 1"
            cols="auto">
            <b-button variant="arc-secondary">
              {{ $t('account.cta.changeWithdrawMethod') }}
            </b-button>
          </b-col>
        </b-row>
        <b-collapse
          v-if="paymentMethods.length > 1"
          id="withdrawMethod">
          <withdraw-methods-switch
            :methods="paymentMethods"
            :active-methods="userWithdrawMethods"
            @change="changeMethod"/>
        </b-collapse>
        <withdraw-form
          v-if="activeMethod"
          :default-method="activeMethod"/>
      </div>
    </div>
  </div>
</template>

<script>
import WithdrawMethodsSwitch from './WithdrawMethodsSwitch'
import WithdrawPlaceholder from './WithdrawPlaceholder'
import WithdrawForm from './WithdrawForm'
import { PAYMENT_METHODS_QUERY, USER_PAYMENT_METHODS_QUERY } from '@/graphql'

const paymentMethodsAdapter = (methods) => {
  if (methods.length === 0 || !methods[0].hasOwnProperty('availability')) {
    return methods
  }

  return methods.map((method) => {
    return {
      code: method.code,
      name: method.name,
      note: method.payment_note,
      kind: method.type
    }
  })
}

export default {
  components: {
    WithdrawMethodsSwitch,
    WithdrawForm,
    WithdrawPlaceholder
  },
  data () {
    return {
      paymentMethods: [],
      selectedMethod: null,
      user: null,
      loading: 0
    }
  },
  apollo: {
    paymentMethods () {
      return {
        query: PAYMENT_METHODS_QUERY,
        update ({ paymentMethods }) {
          return paymentMethodsAdapter(paymentMethods)
        }
      }
    },
    user () {
      return {
        query: USER_PAYMENT_METHODS_QUERY
      }
    }
  },
  computed: {
    userWithdrawMethods () {
      if (!this.user || !this.user.availableWithdrawMethods.length) {
        return []
      }

      return this.paymentMethods.filter((method) => {
        return this.user.availableWithdrawMethods.includes(method.code)
      })
    },
    activeMethod () {
      return this.selectedMethod || this.userWithdrawMethods[0] || null
    }
  },
  methods: {
    changeMethod (value) {
      this.selectedMethod = value
    }
  }
}
</script>

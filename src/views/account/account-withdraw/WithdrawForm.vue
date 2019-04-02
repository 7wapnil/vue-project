<template>
  <div v-if="mainMethod">
    <b-row no-gutters>
      <b-col class="pt-4 pb-5">
        <span class="text-arc-clr-iron">
          {{ descriptionMap[mainMethod.code] }}
        </span>
      </b-col>
    </b-row>
    <b-row
      v-if="responseMessage"
      no-gutters>
      <b-col class="pb-5">
        <span class="text-arc-clr-white">
          {{ responseMessage }}
        </span>
      </b-col>
    </b-row>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="amount"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Amount
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="amount"
          v-model="withdrawFields.amount"
          step="0.01"
          class="ml-4 text-left w-50"
          type="number"/>
      </b-col>
      <b-col/>
    </b-row>
    <b-row
      v-for="(field, index) in mainMethod.fields"
      :key="index"
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center" >
        <label
          :for="field.name"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ field.name }}
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          v-model="withdrawFields[field.code]"
          :id="field.name"
          :type="typeMap[field.type]"
          class="ml-4 text-left w-75"
        />
      </b-col>
      <b-col/>
    </b-row>
    <b-row no-gutters>
      <b-col
        class="mr-1"
        cols="3"/>
      <b-col class="user-profile-form ml-4">
        <div class="border-top border-arc-clr-soil-cover mb-4"/>
      </b-col>
    </b-row>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="password"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Arcanebet password:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="password"
          v-model="withdrawFields.password"
          class="ml-4 text-left w-50"
          type="password"/>
      </b-col>
      <b-col/>
    </b-row>
    <b-row no-gutters>
      <b-col/>
      <b-col class="mt-2 ml-4 user-profile-form">
        <b-button
          :disabled="isDisabled"
          class="ml-2 w-50"
          variant="user-profile-button"
          @click.prevent="submitWithdraw()">
          Withdraw
        </b-button>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import { WITHDRAW_MUTATION } from '@/graphql'
import { mapGetters } from 'vuex'

export default {
  props: {
    defaultMethod: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      successMessage: 'Your account-withdraw request has been successfully submitted.',
      errorMessage: 'Something went wrong, please make sure you entered correct details and try again.',
      responseMessage: null,
      sending: false,
      withdrawFields: {
        amount: null,
        password: null
      },
      typeMap: {
        'float': 'number',
        'string': 'text'
      },
      descriptionMap: {
        'credit_card': 'Debit/Credit Card withdrawals come with a 0% withdrawal fee'
      }
    }
  },
  computed: {
    isDisabled () {
      return this.anyEmptyField || this.anyEmptyPaymentDetails || this.sending
    },
    anyEmptyField () {
      return Object.values(this.withdrawFields).some((value) => {
        return value === null || value === ''
      })
    },
    anyEmptyPaymentDetails () {
      return this.paymentDetails.some((field) => {
        return field.value === null || field.value === ''
      })
    },
    mainMethod () {
      return this.defaultMethod ? this.defaultMethod : ''
    },
    ...mapGetters('wallets', [
      'activeWallet'
    ]),
    paymentDetails () {
      let paymentDetailsData = []
      this.defaultMethod.fields.forEach(field => {
        paymentDetailsData.push({
          code: field.code,
          value: this.withdrawFields[field.code] || ''
        })
      })

      return paymentDetailsData
    }
  },
  methods: {
    submitWithdraw () {
      this.sending = true
      this.$apollo.mutate(
        {
          mutation: WITHDRAW_MUTATION,
          variables: {
            amount: parseFloat(this.withdrawFields.amount),
            walletId: this.activeWallet.id,
            payment_method: this.defaultMethod.code,
            payment_details: this.paymentDetails
          }
        }
      ).then(({ data: { withdraw } }) => {
        Object.keys(this.withdrawFields).forEach(field => {
          this.withdrawFields[field] = ''
        })
        this.responseMessage = (withdraw['error_messages'] ? withdraw['error_messages'][0] : this.successMessage)
      }).catch(() => {
        this.responseMessage = this.errorMessage
      }).finally(() => {
        this.sending = false
      })
    }
  }
}
</script>

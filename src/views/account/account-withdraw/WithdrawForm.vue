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
          Amount:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="amount"
          v-model="form.amount"
          step="0.01"
          class="ml-4 text-left w-50"
          type="number"/>
      </b-col>
      <b-col/>
    </b-row>
    <component
      v-model="form.paymentDetails"
      :is="currentComponent"/>
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
          v-model="form.password"
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
import { Form } from '@/helpers'
import Sofort from './withdraw-methods/Sofort'
import Skrill from './withdraw-methods/Skrill'
import Skinwallet from './withdraw-methods/Skinwallet'
import Skinpay from './withdraw-methods/Skinpay'
import Qiwi from './withdraw-methods/Qiwi'
import Paysafe from './withdraw-methods/Paysafe'
import Mru from './withdraw-methods/Mru'
import CreditCard from './withdraw-methods/CreditCard'
import Bitcoin from './withdraw-methods/Bitcoin'
import Yandex from './withdraw-methods/Yandex'

export default {
  props: {
    defaultMethod: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      successMessage: 'Your account-withdraw request has been successfully submitted.',
      errorMessage: 'Something went wrong, please make sure you entered correct details and try again.',
      responseMessage: null,
      sending: false,
      components: {
        'credit_card': CreditCard,
        'sofort': Sofort,
        'skrill': Skrill,
        'skinwallet': Skinwallet,
        'skinpay': Skinpay,
        'qiwi': Qiwi,
        'paysafe': Paysafe,
        'mru': Mru,
        'bitcoin': Bitcoin,
        'yandex': Yandex
      },
      form: new Form({
        amount: null,
        password: null,
        paymentDetails: []
      }),
      descriptionMap: {
        'credit_card': 'Debit/Credit Card withdrawals come with a 0% withdrawal fee'
      }
    }
  },
  computed: {
    isDisabled () {
      return this.anyEmptyField || this.sending || this.anyEmptyPaymentDetails
    },
    anyEmptyField () {
      return Object.values(this.form).some((value) => {
        return value === null || value === ''
      })
    },
    anyEmptyPaymentDetails () {
      return Object.values(this.form.paymentDetails).some((field) => {
        return field === null || field === ''
      })
    },
    mainMethod () {
      return this.defaultMethod ? this.defaultMethod : ''
    },
    currentComponent () {
      return this.components[this.mainMethod.code] || null
    },
    ...mapGetters('wallets', ['activeWallet'])
  },
  methods: {
    submitWithdraw () {
      const input = {
        ...this.form.values(),
        ...{
          amount: parseFloat(this.form.amount),
          paymentMethod: this.defaultMethod.code,
          walletId: this.activeWallet.id
        }
      }

      input.paymentDetails = Object.keys(input.paymentDetails).map((code) => {
        return { code, value: input.paymentDetails[code] }
      })

      this.sending = true
      this
        .$apollo
        .mutate(
          {
            mutation: WITHDRAW_MUTATION,
            variables: { input }
          }
        )
        .then(() => {
          this.form.reset()
          this.responseMessage = this.successMessage
        })
        .catch((errors) => {
          this.form.handleGraphQLErrors(errors)
          this.responseMessage = this.form.errors.first
        })
        .finally(() => {
          this.sending = false
        })
    }
  }
}
</script>

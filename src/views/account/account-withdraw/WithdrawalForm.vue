<template>
  <div v-if="mainMethod">
    <b-row no-gutters>
      <b-col class="pt-4 pb-3">
        <span
          class="text-arc-clr-iron"
          v-html="mainMethod.description"/>
      </b-col>
    </b-row>
    <b-alert
      show
      class="text-center mb-4"
      variant="warning">
      {{ $t('account.withdraw.warning') }}
    </b-alert>
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
      v-if="form.errors.any()"
      no-gutters>
      <ul class="pb-5">
        <li
          v-for="(errorText, errorName) in form.getErrors()"
          :key="errorName"
          class="text-arc-clr-white">
          {{ errorText }}
        </li>
      </ul>
    </b-row>
    <b-row
      class="mb-5"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="amount"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('generalTerms.amount') }}
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-input-group
          v-if="currencyCode"
          :append="currencyCode"
          class="ml-4 text-left w-50">
          <b-form-input
            id="amount"
            v-model="form.amount"
            min="0"
            step="0.01"
            type="number"/>
        </b-input-group>
      </b-col>
      <b-col/>
    </b-row>
    <component
      ref="paymentDetails"
      v-model="form.paymentDetails"
      :is="currentComponent"
      :method="mainMethod"
    />
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
          {{ $t('account.withdraw.arcanebetPassword') }}
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
          {{ $t('account.cta.withdraw') }}
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
import { EUR } from '@/constants/currencies'
import Sofort from './withdrawal-methods/Sofort'
import Skrill from './withdrawal-methods/Skrill'
import Neteller from './withdrawal-methods/Neteller'
import Skinwallet from './withdrawal-methods/Skinwallet'
import Skinpay from './withdrawal-methods/Skinpay'
import Qiwi from './withdrawal-methods/Qiwi'
import Paysafecard from './withdrawal-methods/Paysafecard'
import Mru from './withdrawal-methods/Mru'
import CreditCard from './withdrawal-methods/CreditCard'
import Bitcoin from './withdrawal-methods/Bitcoin'
import Yandex from './withdrawal-methods/Yandex'

export default {
  props: {
    defaultMethod: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      responseMessage: null,
      sending: false,
      components: {
        'credit_card': CreditCard,
        'sofort': Sofort,
        'skrill': Skrill,
        'skinwallet': Skinwallet,
        'skinpay': Skinpay,
        'qiwi': Qiwi,
        'paysafecard': Paysafecard,
        'mru': Mru,
        'bitcoin': Bitcoin,
        'yandex': Yandex,
        'neteller': Neteller
      },
      form: new Form({
        amount: null,
        password: null,
        paymentDetails: []
      })
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
    currencyCode () {
      return this.defaultMethod.currencyCode ||
        (this.fiatWallet && this.fiatWallet.currency.code) ||
        EUR
    },
    ...mapGetters('wallets', ['fiatWallet'])
  },
  methods: {
    submitWithdraw () {
      const input = {
        ...this.form.values(),
        ...{
          amount: parseFloat(this.form.amount),
          paymentMethod: this.defaultMethod.code,
          currencyCode: this.currencyCode
        }
      }

      input.paymentDetails = Object.keys(input.paymentDetails).map((code) => {
        return { code, value: input.paymentDetails[code] }
      })

      this.form.clearErrors()
      this.sending = true
      this
        .$apollo
        .mutate(
          {
            mutation: WITHDRAW_MUTATION,
            variables: { input }
          }
        )
        .then((response) => {
          this.form.reset(['amount', 'password'])
          this.responseMessage = response.data.withdraw
        })
        .catch((errors) => {
          this.form.handleGraphQLErrors(errors)
          this.responseMessage = null
        })
        .finally(() => {
          this.sending = false
        })
    }
  }
}
</script>

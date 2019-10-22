<template>
  <div v-if="mainMethod">
    <b-row no-gutters>
      <b-col class="px-4 pt-4 pb-2 px-md-0">
        <span
          class="text-arc-clr-iron"
          v-html="mainMethod.description"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="px-4 pt-2 pb-md-2 px-md-0">
        <b-alert
          show
          class="mb-4 mb-md-0 letter-spacing-2"
          variant="warning">
          {{ $t('account.withdraw.warning') }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row
      v-if="responseMessage"
      no-gutters>
      <b-col class="px-4 py-2">
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
      no-gutters>
      <b-col
        class="text-right pl-4 pl-md-0 pt-3 pb-4"
        cols="3">
        <label
          for="amount"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 pointer">
          {{ $t('generalTerms.amount') }}
        </label>
      </b-col>
      <b-col
        cols="9"
        md="4"
        class="px-4 pr-md-0 pl-md-4 pt-2 pb-4">
        <b-input-group
          v-if="currencyCode"
          :append="currencyCode"
          class="text-left">
          <b-form-input
            id="amount"
            v-model="form.amount"
            min="0"
            step="0.01"
            type="number"/>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row
      v-if="isComponentTemplateExists"
      no-gutters>
      <b-col
        offset-md="3"
        md="9"
        class="pl-md-4">
        <arc-separator/>
      </b-col>
    </b-row>

    <component
      v-if="isComponentTemplateExists"
      ref="paymentDetails"
      v-model="form.paymentDetails"
      :is="currentComponent"
      :method="mainMethod"/>

    <b-row
      v-if="isComponentTemplateExists"
      no-gutters>
      <b-col
        offset-md="3"
        md="9"
        class="pl-md-4">
        <arc-separator/>
      </b-col>
    </b-row>

    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="text-right pl-4 pt-2 pt-md-3 pl-md-0 pb-2">
        <label
          for="password"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0 pointer">
          {{ $t('account.withdraw.arcanebetPassword') }}
        </label>
      </b-col>
      <b-col
        cols="9"
        md="4"
        class="px-4 pr-md-0 pl-md-4 py-2">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"/>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col
        offset="3"
        md="4"
        class="pt-2 pb-4 py-md-2 pr-md-0 pl-md-4 px-4 mb-2">
        <b-button
          :disabled="isDisabled"
          block
          variant="user-profile-button"
          @click.prevent="submitWithdraw">
          {{ $t('account.cta.withdraw') }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { WITHDRAW_MUTATION } from '@/graphql'
import { mapGetters } from 'vuex'
import { Form } from '@/helpers'
import { EUR } from '@/constants/currencies'
import Skrill from './withdrawal-methods/Skrill'
import Neteller from './withdrawal-methods/Neteller'
import CreditCard from './withdrawal-methods/CreditCard'
import Bitcoin from './withdrawal-methods/Bitcoin'

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
        'skrill': Skrill,
        'bitcoin': Bitcoin,
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
        (this.getUserFiatWallet && this.getUserFiatWallet.currency.code) ||
        EUR
    },
    isComponentTemplateExists () {
      return this.mainMethod.code === 'credit_card'
    },
    ...mapGetters(['getUserFiatWallet'])
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

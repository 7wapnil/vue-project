<template>
  <div>
    <b-form-group
      :invalid-feedback="form.errors.get('username')"
      :state="form.errors.state('username')"
      :label="$i18n.t('auth.signUpForm.username')"
      label-for="signup-username">

      <b-form-input
        id="signup-username"
        v-model="form.registration.username"
        :state="form.errors.state('username')"
        :placeholder="$i18n.t('auth.signUpForm.username')"
        autocomplete="username"
        @input="form.clearError(['username'])"/>
    </b-form-group>

    <b-form-group
      :invalid-feedback="form.errors.get('email')"
      :state="form.errors.state('email')"
      :label="$i18n.t('auth.signUpForm.email')"
      label-for="signup-email">

      <b-form-input
        id="signup-email"
        v-model="form.registration.email"
        :state="form.errors.state('email')"
        :placeholder="$i18n.t('auth.signUpForm.email')"
        autocomplete="email"
        @input="form.clearError(['email'])"/>
    </b-form-group>

    <b-form-group
      :label="$i18n.t('auth.signUpForm.dob')"
      label-for="signup-dob">

      <birth-date-field
        :model="dobProxy"
        :form="form"/>

    </b-form-group>

    <b-form-group
      :label="$i18n.t('auth.signUpForm.password')"
      label-for="signup-password">

      <b-input-group>
        <b-form-input
          id="signup-password"
          v-model="form.registration.password"
          :state="form.errors.state('password')"
          :type="passwordFieldType"
          :placeholder="$i18n.t('auth.signUpForm.password')"
          @input="form.clearError(['password'])"/>
        <b-input-group-append
          :class="{'is-invalid': form.errors.get('password')}">
          <b-button
            id="signup-password-show"
            class="px-4 py-1"
            variant="user-profile-button"
            @click="switchVisibility">
            <icon
              :name="iconName"
              size="18px"
              color="arc-clr-soil-light"/>
          </b-button>
        </b-input-group-append>

      </b-input-group>

    </b-form-group>
    <b-form-invalid-feedback
      :state="form.errors.state('password')"
      role="alert"
      class="invalid-feedback">{{ form.errors.get('password') }}</b-form-invalid-feedback>
    <b-row no-gutters>
      <b-col
        cols="7"
        class="mr-3">
        <b-form-group
          :invalid-feedback="form.errors.get('country')"
          :state="form.errors.state('country')"
          :label="$i18n.t('auth.signUpForm.country')"
          label-for="signup-country">

          <b-form-select
            id="signup-country"
            v-model="form.registration.country"
            :state="form.errors.state('country')"
            @input="form.clearError(['country'])">
            <option
              value=""
              disabled>{{ $i18n.t('auth.signUpForm.country') }}</option>
            <option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.value">
              {{ country.text }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          :invalid-feedback="form.errors.get('currency')"
          :state="form.errors.state('currency')"
          :label="$i18n.t('auth.signUpForm.currency')"
          label-for="signup-currency">

          <b-form-select
            id="signup-currency"
            v-model="form.registration.currency"
            :state="form.errors.state('currency')"
            @input="form.clearError(['currency'])">
            <option
              v-for="(currency, index) in currencies"
              :key="index"
              :value="currency.code">
              {{ currency.code }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-form-checkbox
        id="signup-agreedWithPromotional"
        v-model="form.registration.agreedWithPromotional"
        class="accept-all-odds-checkbox mb-4">
        <span class="ml-3 font-size-14 text-arc-clr-iron pointer letter-spacing-2">
          {{ $i18n.t('auth.signUpForm.agreedWithPromotional') }}
        </span>
      </b-form-checkbox>
      <b-form-checkbox
        id="signup-agreedWithPrivacy"
        v-model="form.registration.agreedWithPrivacy"
        class="accept-all-odds-checkbox mb-4"
        @input="form.clearError(['agreedWithPrivacy'])">
        <span class="d-block font-size-14 text-arc-clr-iron pointer letter-spacing-2 ml-3 mt-1">
          Confirm I am not underage,
          <b-link
            :to="{ path: 'terms-and-conditions' }"
            target="_blank"
            class="font-weight-bold">
            agree with T&C
          </b-link>
          and
          <b-link
            :to="{ path: 'privacy-policy' }"
            target="_blank"
            class="font-weight-bold">
            Privacy policy
          </b-link>
        </span>
      </b-form-checkbox>
      <b-form-invalid-feedback
        :state="form.errors.state('agreedWithPrivacy')"
        role="alert"
        class="invalid-feedback">{{ form.errors.get('agreedWithPrivacy') }}</b-form-invalid-feedback>
    </b-row>
    <b-button
      id="signup-submit"
      :disabled="submitting"
      variant="user-profile-button"
      type="submit"
      block>
      {{ $i18n.t('auth.signUpForm.register') }}
    </b-button>
  </div>
</template>

<script>
import BirthDateField from './BirthDateField'
import { Form } from '@/helpers'
import { CURRENCIES_LIST_QUERY } from '@/graphql'

export default {
  components: {
    BirthDateField
  },
  props: {
    form: {
      type: Form,
      required: true
    },
    dobProxy: {
      type: Object,
      required: true
    },
    submitting: {
      type: Boolean,
      default: false
    },
    countries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      passwordFieldType: 'password',
      currencies: []
    }
  },
  computed: {
    iconName () {
      return this.passwordFieldType === 'password' ? 'input-eye-solid' : 'input-eye-slash-solid'
    }
  },
  methods: {
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  },
  apollo: {
    currencies () {
      return {
        query: CURRENCIES_LIST_QUERY
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    margin-bottom: 0.5rem;
    & /deep/ label {
      text-transform: uppercase;
      font-size: 0.75rem;
    }
  }
  #signup-password-show {
    border-bottom-right-radius: 0;
    border-top-right-radius: 6px;
    min-width: 70px;
  }
</style>

<template>
  <div>
    <b-form-group
      :invalid-feedback="form.errors.get('username')"
      :state="form.errors.state('username')">
      <b-form-input
        id="signup-username"
        v-model="form.firstStep.username"
        :state="form.errors.state('username')"
        autocomplete="username"
        placeholder="Username"/>
    </b-form-group>

    <b-form-group
      :invalid-feedback="form.errors.get('email')"
      :state="form.errors.state('email')">
      <b-form-input
        id="signup-email"
        v-model="form.firstStep.email"
        :state="form.errors.state('email')"
        autocomplete="email"
        placeholder="Email"/>
    </b-form-group>

    <birth-date-field
      :model="dobProxy"
      :state="form.errors.state('dateOfBirth')"
      :error="form.errors.get('dateOfBirth')"/>

    <b-form-group
      :invalid-feedback="form.errors.get('password')"
      :state="form.errors.state('password')">
      <b-form-input
        id="signup-password"
        v-model="form.firstStep.password"
        :state="form.errors.state('password')"
        type="password"
        placeholder="Password"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('passwordConfirmation')"
      :state="form.errors.state('passwordConfirmation')">
      <b-form-input
        id="signup-password-confirmation"
        v-model="form.firstStep.passwordConfirmation"
        :state="form.errors.state('passwordConfirmation')"
        type="password"
        placeholder="Repeat password"/>
    </b-form-group>
    <b-row no-gutters>
      <b-col
        cols="7"
        class="mr-3">
        <b-form-group
          :invalid-feedback="form.errors.get('country')"
          :state="form.errors.state('country')">
          <b-form-select
            v-model="form.firstStep.country"
            :state="form.errors.state('country')">
            <option
              value=""
              disabled>Country</option>
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
          :state="form.errors.state('currency')">
          <b-form-select
            v-model="form.firstStep.currency"
            :state="form.errors.state('curr`ency')">
            <option
              v-for="(currency, index) in currencies"
              :key="index"
              :value="currency.code">
              {{ currency.code }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button
      variant="user-profile-button"
      class="my-4"
      type="button"
      block
      @click="$emit('submit')">
      Next step
    </b-button>
  </div>
</template>

<script>
import { Form } from '@/helpers'
import BirthDateField from './BirthDateField'
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
    countries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currencies: []
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

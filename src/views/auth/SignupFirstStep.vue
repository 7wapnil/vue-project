<template>
  <div>
    <b-form-group
      :invalid-feedback="form.errors.get('username')"
      :state="form.errors.state('username')">
      <b-form-input
        id="signup-username"
        v-model="form.username"
        :state="form.errors.state('username')"
        autocomplete="username"
        placeholder="Username"/>
    </b-form-group>

    <b-form-group
      :invalid-feedback="form.errors.get('email')"
      :state="form.errors.state('email')">
      <b-form-input
        id="signup-email"
        v-model="form.email"
        :state="form.errors.state('email')"
        autocomplete="email"
        placeholder="Email"/>
    </b-form-group>

    <birth-date-field
      v-model="form.dateOfBirth"
      :state="form.errors.state('dateOfBirth')"
      :error="form.errors.get('dateOfBirth')"/>

    <b-form-group
      :invalid-feedback="form.errors.get('password')"
      :state="form.errors.state('password')">
      <b-form-input
        id="signup-password"
        v-model="form.password"
        :state="form.errors.state('password')"
        type="password"
        placeholder="Password"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('passwordConfirmation')"
      :state="form.errors.state('passwordConfirmation')">
      <b-form-input
        id="signup-password-confirmation"
        v-model="form.passwordConfirmation"
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
            v-model="form.country"
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
            v-model="form.currency"
            :state="form.errors.state('currency')">
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
import { countries as countriesList } from 'countries-list'
import BirthDateField from './BirthDateField'
import { CURRENCIES_LIST_QUERY } from '@/graphql'

const countries = Object
  .values(countriesList)
  .map((country) => ({
    value: country.name,
    text: country.name
  }))
  .sort((a, b) => {
    if (a.value < b.value) { return -1 }
    if (a.value > b.value) { return 1 }
    return 0
  })

export default {
  components: {
    BirthDateField
  },
  props: {
    form: {
      type: Form,
      required: true
    }
  },
  data () {
    return {
      currencies: [],
      countries
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

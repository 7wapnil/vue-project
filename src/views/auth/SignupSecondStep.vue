<template>
  <div>
    <b-form-group
      :invalid-feedback="form.errors.get('first_name')"
      :state="form.errors.state('first_name')">
      <b-form-input
        id="signup-first_name"
        v-model="form.first_name"
        :state="form.errors.state('first_name')"
        placeholder="First name"/>
    </b-form-group>
    <b-row no-gutters>
      <b-col
        class="mr-4"
        cols="8">
        <b-form-group
          :invalid-feedback="form.errors.get('last_name')"
          :state="form.errors.state('last_name')">
          <b-form-input
            id="signup-last_name"
            :state="form.errors.state('last_name')"
            v-model="form.last_name"
            placeholder="Last name"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-select
          id="gender"
          :options="genders"
          v-model="form.gender"
        />
      </b-col>
    </b-row>
    <b-form-group
      :invalid-feedback="form.errors.get('phone')"
      :state="form.errors.state('phone')">
      <b-form-input
        v-mask="'+############'"
        id="signup-phone"
        v-model="form.phone"
        :state="form.errors.state('phone')"
        type="tel"
        placeholder="Phone Number"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('street_address')"
      :state="form.errors.state('street_address')">
      <b-form-input
        id="signup-street_address"
        v-model="form.street_address"
        :state="form.errors.state('street_address')"
        placeholder="Street address"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('zip_code')"
      :state="form.errors.state('zip_code')">
      <b-form-input
        id="signup-zip_code"
        v-model="form.zip_code"
        :state="form.errors.state('zip_code')"
        placeholder="Postal code"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('city')"
      :state="form.errors.state('city')">
      <b-form-input
        id="signup-city"
        v-model="form.city"
        :state="form.errors.state('city')"
        placeholder="City"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('state')"
      :state="form.errors.state('state')">
      <b-form-input
        id="signup-state"
        v-model="form.state"
        :state="form.errors.state('state')"
        placeholder="Province"/>
    </b-form-group>
    <b-form-checkbox
      v-model="form.agreed_with_promotional"
      class="accept-all-odds-checkbox mb-3">
      <span class="ml-3 font-size-14 text-arc-clr-iron pointer letter-spacing-2">
        I agree to receive promotional content
      </span>
    </b-form-checkbox>
    <b-form-checkbox
      v-model="agreed_with_privacy"
      class="accept-all-odds-checkbox">
      <span class="d-block font-size-14 text-arc-clr-iron pointer letter-spacing-2 ml-3 mt-1">
        Confirm I am not underage,
        <b-link
          :to="{ name: 'terms and conditions' }"
          target="_blank"
          class="font-weight-bold">
          agree with T&C,
        </b-link>
        agree with
        <b-link
          :to="{ name: 'privacy policy' }"
          target="_blank"
          class="font-weight-bold">
          privacy policy
        </b-link>
      </span>
    </b-form-checkbox>
    <b-row
      class="mb-4 mt-5"
      no-gutters>
      <b-col class="mr-4">
        <b-button
          variant="arc-secondary"
          block
          @click="$emit('return')">
          <b-row no-gutters>
            <b-col class="d-inline-flex align-items-center justify-content-center">
              <icon
                class="mr-2"
                name="chevron-left"
                color="arc-clr-gold"/>
              Return
            </b-col>
          </b-row>
        </b-button>
      </b-col>
      <b-col>
        <b-button
          :disabled="submitting"
          variant="user-profile-button"
          type="submit"
          block>
          Register
        </b-button>
      </b-col>
    </b-row>

  </div>
</template>
<script>
import { Form } from '@/helpers'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  props: {
    form: {
      type: Form,
      required: true
    },
    submitting: {
      type: Boolean,
      default: false
    },
    country: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      agreed_with_privacy: false,
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
    }
  }
}
</script>

<template>
  <b-form
    novalidate
    @submit.prevent="submitFields">
    <b-form-group
      :invalid-feedback="errors.get('first_name')"
      :state="errors.state('first_name')">
      <b-form-input
        id="signup-first_name"
        v-model="fieldsStepTwo.first_name"
        :state="errors.state('first_name')"
        placeholder="First name"/>
    </b-form-group>
    <b-row no-gutters>
      <b-col
        class="mr-4"
        cols="8">
        <b-form-group
          :invalid-feedback="errors.get('last_name')"
          :state="errors.state('last_name')">
          <b-form-input
            id="signup-last_name"
            :state="errors.state('last_name')"
            v-model="fieldsStepTwo.last_name"
            placeholder="Last name"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-select
          id="gender"
          :options="genders"
          v-model="fieldsStepTwo.gender"
        />
      </b-col>
    </b-row>
    <b-form-group
      :invalid-feedback="errors.get('phone')"
      :state="errors.state('phone')">
      <b-form-input
        v-mask="'+############'"
        id="signup-phone"
        v-model="fieldsStepTwo.phone"
        :state="errors.state('phone')"
        type="tel"
        placeholder="Phone Number"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('street_address')"
      :state="errors.state('street_address')">
      <b-form-input
        id="signup-street_address"
        v-model="fieldsStepTwo.street_address"
        :state="errors.state('street_address')"
        placeholder="Street address"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('zip_code')"
      :state="errors.state('zip_code')">
      <b-form-input
        id="signup-zip_code"
        v-model="fieldsStepTwo.zip_code"
        :state="errors.state('zip_code')"
        placeholder="Postal code"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('city')"
      :state="errors.state('city')">
      <b-form-input
        id="signup-city"
        v-model="fieldsStepTwo.city"
        :state="errors.state('city')"
        placeholder="City"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="errors.get('state')"
      :state="errors.state('state')">
      <b-form-input
        id="signup-state"
        v-model="fieldsStepTwo.state"
        :state="errors.state('state')"
        placeholder="Province"/>
    </b-form-group>
    <b-form-checkbox
      v-model="fieldsStepTwo.agreed_with_promotional"
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
          @click="$emit('step-changed')">
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
          block
          @click.prevent="submitFields">
          Register
        </b-button>
      </b-col>
    </b-row>

  </b-form>
</template>
<script>
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  props: {
    submitting: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: null
    },
    country: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      fieldsStepTwo: {
        first_name: '',
        last_name: '',
        gender: 'male',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        agreed_with_promotional: false
      },
      agreed_with_privacy: false,
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
    }
  },
  methods: {
    submitFields () {
      this.$emit('section-two-filled', this.fieldsStepTwo)
    }
  },
}
</script>

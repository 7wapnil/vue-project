<template>
  <div>
    <b-form-group
      :invalid-feedback="form.errors.get('firstName')"
      :state="form.errors.state('firstName')">
      <b-form-input
        id="signup-firstName"
        v-model="form.firstName"
        :state="form.errors.state('firstName')"
        placeholder="First name"/>
    </b-form-group>
    <b-row no-gutters>
      <b-col
        class="mr-4"
        sm="8"
        cols="12">
        <b-form-group
          :invalid-feedback="form.errors.get('lastName')"
          :state="form.errors.state('lastName')">
          <b-form-input
            id="signup-lastName"
            :state="form.errors.state('lastName')"
            v-model="form.lastName"
            placeholder="Last name"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-select
          id="gender"
          :options="genders"
          v-model="form.gender"
          class="mb-3 mb-sm-0"
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
      :invalid-feedback="form.errors.get('streetAddress')"
      :state="form.errors.state('streetAddress')">
      <b-form-input
        id="signup-streetAddress"
        v-model="form.streetAddress"
        :state="form.errors.state('streetAddress')"
        placeholder="Street address"/>
    </b-form-group>
    <b-form-group
      :invalid-feedback="form.errors.get('zipCode')"
      :state="form.errors.state('zipCode')">
      <b-form-input
        id="signup-zipCode"
        v-model="form.zipCode"
        :state="form.errors.state('zipCode')"
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
      v-model="form.agreedWithPromotional"
      class="accept-all-odds-checkbox mb-4">
      <span class="ml-3 font-size-14 text-arc-clr-iron pointer letter-spacing-2">
        I agree to receive promotional content
      </span>
    </b-form-checkbox>
    <b-form-checkbox
      v-model="agreedWithPrivacy"
      class="accept-all-odds-checkbox mb-4">
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
      agreedWithPrivacy: false,
      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
    }
  }
}
</script>

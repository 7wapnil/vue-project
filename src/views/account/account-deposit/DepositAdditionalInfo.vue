<template>
  <div :class="{ 'p-3' : isMobile }">
    <deposit-header/>
    <deposit-additional-info-description />
    <b-form @submit.prevent="submit">
      <b-form-group
        :invalid-feedback="form.errors.get('firstName')"
        :state="form.errors.state('firstName')"
        :label="$i18n.t('auth.depositAdditionalInfo.firstName')"
        label-for="needMoreInfo-firstName">

        <b-form-input
          id="needMoreInfo-firstName"
          v-model="form.firstName"
          :state="form.errors.state('firstName')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.firstName')"
          @input="form.clearError(['firstName'])"/>
      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('lastName')"
        :state="form.errors.state('lastName')"
        :label="$i18n.t('auth.depositAdditionalInfo.lastName')"
        label-for="needMoreInfo-lastName">

        <b-form-input
          id="needMoreInfo-lastName"
          :state="form.errors.state('lastName')"
          v-model="form.lastName"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.lastName')"
          @input="form.clearError(['lastName'])"/>
      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('phone')"
        :state="form.errors.state('phone')"
        :label="$i18n.t('auth.depositAdditionalInfo.phone')"
        label-for="needMoreInfo-phone">

        <b-form-input
          id="needMoreInfo-phone"
          :state="form.errors.state('phone')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.phoneNumber')"
          v-model="form.phone"
          type="tel"
          @input="form.clearError(['phone'])"/>

      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('streetAddress')"
        :state="form.errors.state('streetAddress')"
        :label="$i18n.t('auth.depositAdditionalInfo.streetAddress')"
        label-for="needMoreInfo-streetAddress">

        <b-form-input
          id="needMoreInfo-streetAddress"
          v-model="form.streetAddress"
          :state="form.errors.state('streetAddress')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.streetAddress')"
          @input="form.clearError(['streetAddress'])"/>
      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('zipCode')"
        :state="form.errors.state('zipCode')"
        :label="$i18n.t('auth.depositAdditionalInfo.zipCode')"
        label-for="needMoreInfo-zipCode">

        <b-form-input
          id="needMoreInfo-zipCode"
          v-model="form.zipCode"
          :state="form.errors.state('zipCode')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.zipCode')"
          @input="form.clearError(['zipCode'])"/>
      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('city')"
        :state="form.errors.state('city')"
        :label="$i18n.t('auth.depositAdditionalInfo.city')"
        label-for="needMoreInfo-city">

        <b-form-input
          id="needMoreInfo-city"
          v-model="form.city"
          :state="form.errors.state('city')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.city')"
          @input="form.clearError(['city'])"/>
      </b-form-group>

      <b-form-group
        :invalid-feedback="form.errors.get('state')"
        :state="form.errors.state('state')"
        :label="$i18n.t('auth.depositAdditionalInfo.state')"
        label-for="needMoreInfo-state">

        <b-form-input
          id="needMoreInfo-state"
          v-model="form.state"
          :state="form.errors.state('state')"
          :placeholder="$i18n.t('auth.depositAdditionalInfo.state')"
          @input="form.clearError(['state'])"/>
      </b-form-group>

      <b-row
        class="mb-4 mt-5"
        no-gutters>
        <b-col>
          <b-button
            id="needMoreInfo-submit"
            :disabled="submitting"
            variant="user-profile-button"
            type="submit"
            block>
            {{ $i18n.t('auth.depositAdditionalInfo.next') }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import { Form } from '@/helpers'
import DepositHeader from '@/views/account/account-deposit/DepositHeader'
import DepositAdditionalInfoDescription from '@/views/account/account-deposit/DepositAdditionalInfoDescription'
import { supportedCountries } from '@/helpers/countries'

export default {
  components: {
    DepositHeader,
    DepositAdditionalInfoDescription
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      submitting: false,
      form: new Form(
        {
          firstName: this.user.firstName || '',
          lastName: this.user.lastName || '',
          phone: this.user.phone || '',
          streetAddress: this.user.addressStreetAddress || '',
          zipCode: this.user.addressZipCode || '',
          city: this.user.addressCity || '',
          state: this.user.addressState || ''
        }
      )
    }
  },
  computed: {
    phoneCode () {
      const result = supportedCountries.find(obj => obj.value === this.user.addressCountry)

      return result ? `+${result.phone}` : ''
    }
  },
  mounted () {
    if (!this.form.phone.includes(this.phoneCode)) {
      this.form.phone = this.phoneCode + ' '
    }
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    submit () {
      this.form.clearErrors()
      this.submitting = true
      const values = { ...this.form.values() }
      this.updateUserInfo([values, this.$sbjs.data])
        .catch(({ graphQLErrors }) => this.submitError(graphQLErrors))
        .finally(() => (this.submitting = false))
    },
    submitError (graphQLErrors) {
      const errors = {}
      graphQLErrors.forEach((error) => {
        errors[error.path] = error.message
      })
      this.form.setErrors(errors)
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

    input::placeholder {
      opacity: 0.5
    }
  }
</style>

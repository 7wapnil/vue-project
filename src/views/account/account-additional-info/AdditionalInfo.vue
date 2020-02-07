<template>
  <div :class="{ 'p-3' : isMobile }">
    <deposit-header/>
    <b-row v-if="isMobile">
      <b-col>
        <additional-info-description />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        :cols="isMobile ? 12 : 8">
        <b-form @submit.prevent="submit">
          <b-form-group
            :invalid-feedback="form.errors.get('firstName')"
            :state="form.errors.state('firstName')">
            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-firstName"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.firstName') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-firstName"
                  v-model="form.firstName"
                  :state="form.errors.state('firstName')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.firstName')"
                  @input="form.clearError(['firstName'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('lastName')"
            :state="form.errors.state('lastName')">
            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-lastName"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.lastName') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-lastName"
                  :state="form.errors.state('lastName')"
                  v-model="form.lastName"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.lastName')"
                  @input="form.clearError(['lastName'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('phone')"
            :state="form.errors.state('phone')">

            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-phone"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.phone') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-phone"
                  :state="form.errors.state('phone')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.phoneNumber')"
                  v-model="form.phone"
                  type="tel"
                  @input="form.clearError(['phone'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('streetAddress')"
            :state="form.errors.state('streetAddress')">
            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-streetAddress"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.streetAddress') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-streetAddress"
                  v-model="form.streetAddress"
                  :state="form.errors.state('streetAddress')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.streetAddress')"
                  @input="form.clearError(['streetAddress'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('zipCode')"
            :state="form.errors.state('zipCode')">
            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-zipCode"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.zipCode') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-zipCode"
                  v-model="form.zipCode"
                  :state="form.errors.state('zipCode')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.zipCode')"
                  @input="form.clearError(['zipCode'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('city')"
            :state="form.errors.state('city')">
            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-city"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.city') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-city"
                  v-model="form.city"
                  :state="form.errors.state('city')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.city')"
                  @input="form.clearError(['city'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group
            :invalid-feedback="form.errors.get('state')"
            :state="form.errors.state('state')">

            <b-row no-gutters>
              <b-col
                cols="3"
                class="d-flex align-items-center justify-content-end">
                <label
                  for="needMoreInfo-state"
                  class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                  {{ $t('auth.depositAdditionalInfo.state') }}:
                </label>
              </b-col>
              <b-col
                cols="9"
                class="pl-4">
                <b-form-input
                  id="needMoreInfo-state"
                  v-model="form.state"
                  :state="form.errors.state('state')"
                  :placeholder="$i18n.t('auth.depositAdditionalInfo.state')"
                  @input="form.clearError(['state'])"/>
              </b-col>
            </b-row>
          </b-form-group>

          <b-row
            class="my-4"
            no-gutters>
            <b-col
              cols="9"
              offset="3"
              class="pl-4">
              <b-button
                id="needMoreInfo-submit"
                :disabled="isSubmitDisabled"
                variant="user-profile-button"
                type="submit"
                block>
                {{ $i18n.t('auth.depositAdditionalInfo.nextStep') }}
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <b-col
        v-if="!isMobile"
        cols="4"
        class="pl-4">
        <deposit-additional-info-description />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import { Form } from '@/helpers'
import DepositHeader from '@/views/account/account-deposit/DepositHeader'
import AdditionalInfoDescription from '@/views/account/account-additional-info/AdditionalInfoDescription'
import { supportedCountries } from '@/helpers/countries'

export default {
  components: {
    DepositHeader,
    AdditionalInfoDescription
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
    },
    hasEmptyFields () {
      return Object.keys(this.form.values()).filter((field) => {
        return this.form[field].trim().length === 0
      }).length > 0
    },
    isSubmitDisabled () {
      return this.hasEmptyFields || this.submitting
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
      font-size: 14px;
    }

    & /deep/ .invalid-feedback {
      padding-right: 8px;
      text-align: right;
    }

    input::placeholder {
      opacity: 0.5
    }
  }
  .form-control.is-invalid {
    margin-bottom: 0 !important;
  }
</style>

<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="country"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.country') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="ml-4">
        <b-form-select
          id="country"
          :value="null"
          :options="[{value: null, text: user.addressCountry}]"
          disabled/>
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="province"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.state') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="ml-4">
        <b-form-select
          id="province"
          :value="null"
          :options="[{value: null, text: user.addressState}]"
          disabled/>
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="city"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.city') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="ml-4">
        <b-form-select
          id="city"
          :value="null"
          :options="[{value: null, text: user.addressCity}]"
          disabled/>
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="streetAddress"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.address') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="ml-4">
        <b-row no-gutters>
          <b-col cols="8">
            <b-form-input
              id="streetAddress"
              :value="user.addressStreetAddress"
              disabled/>
          </b-col>
          <b-col class="ml-2">
            <b-form-input
              :value="user.addressZipCode"
              disabled/>
          </b-col>
        </b-row>

      </b-col>
    </b-row>

    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="phone"
          class="text-center text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.phone') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="ml-4">
        <b-form-input
          id="phone"
          :value="user.phone"
          disabled/>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

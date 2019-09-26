<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="firstName"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.firstName') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="pl-4">
        <b-form-input
          id="firstName"
          :value="user.firstName"
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
          for="lastName"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.lastName') }}:
        </label>
      </b-col>
      <b-col
        class="pl-4"
        cols="9"
        lg="6">
        <b-form-input
          id="lastName"
          :value="user.lastName"
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
          for="gender"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.gender') }}:
        </label>
      </b-col>
      <b-col
        class="pl-4"
        cols="9"
        lg="6">
        <b-form-select
          id="gender"
          :value="null"
          :options="[{value: null, text: user.gender}]"
          class="h-100 text-capitalize"
          disabled/>
      </b-col>
    </b-row>

    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <label
          for="birthday"
          class="text-right text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.accountInfo.dob') }}:
        </label>
      </b-col>
      <b-col
        lg="6"
        cols="9"
        class="pl-4">
        <b-row no-gutters>
          <b-col>
            <b-form-select
              id="birthday"
              :value="null"
              :options="[{value: null, text: user.dateOfBirth.slice(8, 11)}]"
              class="h-100"
              type="date"
              disabled/>
          </b-col>
          <b-col class="ml-2">
            <b-form-select
              :value="null"
              :options="[{value: null, text: user.dateOfBirth.slice(5, 7) }]"
              class="h-100"
              type="date"
              disabled/>
          </b-col>
          <b-col
            cols="12"
            lg="4"
            class="mt-4 mt-lg-0 ml-lg-2">
            <b-form-select
              :value="null"
              :options="[{value: null, text: user.dateOfBirth.slice(0, 4)}]"
              class="h-100"
              type="date"
              disabled/>
          </b-col>
        </b-row>
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

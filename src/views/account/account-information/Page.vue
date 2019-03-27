<template>
  <div v-if="user">
    <b-container
      fluid
      class="px-0">
      <b-row no-gutters>
        <b-col/>
        <b-col class="p-4 user-profile-form">
          <h3 class="font-weight-light">
            {{ user.first_name }} {{ user.last_name }}
          </h3>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <b-container
      fluid
      class="px-0 pb-2">
      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Email:
          </label>
        </b-col>
        <b-col class="align-self-center user-profile-form">
          <p class="ml-4 mb-0 pl-2 text-arc-clr-iron-light font-size-14 letter-spacing-2">
            {{ user.email }}
          </p>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="username"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Username:
          </label>
        </b-col>
        <b-col class="user-profile-form">
          <b-form-input
            id="username"
            :value="user.username"
            class="ml-4"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="language"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Language:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="language"
            :options="[{text: 'English'}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-3"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="currency"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Currency:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="currency"
            :options="[{text: 'EUR'}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <div class="border-top border-arc-clr-soil-cover mt-4 mb-5"/>

    <b-container
      fluid
      class="px-0">
      <b-row no-gutters>
        <b-col/>
        <b-col class="p-4 user-profile-form">
          <h4 class="font-weight-light">
            Private data
          </h4>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <b-container
      fluid
      class="px-0 pb-2">

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="first_name"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            First name:
          </label>
        </b-col>
        <b-col class="user-profile-form">
          <b-form-input
            id="first_name"
            :value="user.first_name"
            class="ml-4"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="last_name"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Last name:
          </label>
        </b-col>
        <b-col class="user-profile-form">
          <b-form-input
            id="last_name"
            :value="user.last_name"
            class="ml-4"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="gender"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Gender:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="gender"
            :options="[{text: user.gender}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-3"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="birthday"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Birth date:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-row
            class="ml-4 h-100"
            no-gutters>
            <b-col>
              <b-form-select
                id="birthday"
                :options="[{text: user.date_of_birth.slice(8, 11)}]"
                class="h-100"
                type="date"
                disabled/>
            </b-col>
            <b-col class="ml-2">
              <b-form-select
                :options="[{text: user.date_of_birth.slice(5, 7) }]"
                class="h-100"
                type="date"
                disabled/>
            </b-col>
            <b-col class="ml-2">
              <b-form-select
                :options="[{text: user.date_of_birth.slice(0, 4)}]"
                class="h-100"
                type="date"
                disabled/>
            </b-col>
            <b-col/>
          </b-row>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <div class="border-top border-arc-clr-soil-cover mt-4 mb-5"/>

    <b-container
      fluid
      class="px-0">
      <b-row no-gutters>
        <b-col/>
        <b-col class="p-4 user-profile-form">
          <h4 class="font-weight-light">
            Address and Phone
          </h4>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <b-container
      fluid
      class="px-0 pb-2">
      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="country"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Country:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="country"
            :options="[{text: user.address_country}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="province"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            State or province:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="province"
            :options="[{text: user.address_state}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="city"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            City:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-select
            id="city"
            :options="[{text: user.address_city}]"
            class="ml-4 h-100"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="street_address"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Address:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-row no-gutters>
            <b-col cols="8">
              <b-form-input
                id="street_address"
                :value="user.address_street_address"
                class="ml-4"
                disabled/>
            </b-col>
            <b-col class="ml-2">
              <b-form-input
                :value="user.address_zip_code"
                class="ml-4"
                disabled/>
            </b-col>
          </b-row>

        </b-col>
        <b-col/>
      </b-row>

      <b-row
        class="mb-4"
        no-gutters>
        <b-col class="text-md-right text-sm-left align-self-center">
          <label
            for="phone"
            class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            Phone:
          </label>
        </b-col>
        <b-col class="user-profile-form-select">
          <b-form-input
            id="phone"
            :value="user.phone"
            class="ml-4"
            disabled/>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <div class="border-top border-arc-clr-soil-cover mt-4 mb-5"/>

    <change-password-section/>
  </div>
</template>

<script>
import { USER_QUERY } from '@/graphql/index'
import ChangePasswordSection from './ChangePassword'

export default {
  components: {
    ChangePasswordSection
  },
  data () {
    return {
      user: ''
    }
  },
  apollo: {
    user () {
      return {
        query: USER_QUERY,
      }
    },
  },
}
</script>

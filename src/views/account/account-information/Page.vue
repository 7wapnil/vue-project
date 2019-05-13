<template>
  <div v-if="user">
    <b-container
      fluid
      class="px-0">
      <b-row no-gutters>
        <b-col/>
        <b-col class="p-4 user-profile-form">
          <h3 class="font-weight-light ml-2">
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
            {{ $t('account.accountInfo.email') }}:
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
            {{ $t('account.accountInfo.username') }}:
          </label>
        </b-col>
        <b-col class="user-profile-form">
          <b-col class="align-self-center user-profile-form">
            <p class="ml-3 mb-0 text-arc-clr-iron-light font-size-14 letter-spacing-2">
              {{ user.username }}
            </p>
          </b-col>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>

    <div class="border-top border-arc-clr-soil-cover mt-4 mb-2"/>

    <b-list-group>
      <b-list-group-item
        v-b-toggle.account-private-data
        class="bonus-item bg-arc-clr-soil-light px-0 border-0">
        <b-container
          fluid
          class="px-0">
          <b-row no-gutters>
            <b-col
              cols="auto"
              class="mr-2 d-flex align-items-center">
              <span class="bonus-expand-circle">
                <icon
                  name="bonus-chevron-down"
                  size="8px"
                  color="arc-clr-iron"/>
              </span>
            </b-col>
            <b-col class="p-4 user-profile-form">
              <h4 class="font-weight-light mb-0">
                {{ $t('account.accountInfo.privateData') }}
              </h4>
            </b-col>
            <b-col/>
          </b-row>
        </b-container>
      </b-list-group-item>
      <b-collapse id="account-private-data">
        <b-container
          fluid
          class="px-0 py-5">

          <b-row
            class="mb-4"
            no-gutters>
            <b-col class="text-md-right text-sm-left align-self-center">
              <label
                for="first_name"
                class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                {{ $t('account.accountInfo.firstName') }}:
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
                {{ $t('account.accountInfo.lastName') }}:
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
                {{ $t('account.accountInfo.gender') }}:
              </label>
            </b-col>
            <b-col class="user-profile-form-select">
              <b-form-select
                id="gender"
                :value="null"
                :options="[{value: null, text: user.gender}]"
                class="ml-4 h-100 text-capitalize"
                disabled/>
            </b-col>
            <b-col/>
          </b-row>

          <b-row
            no-gutters>
            <b-col class="text-md-right text-sm-left align-self-center">
              <label
                for="birthday"
                class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                {{ $t('account.accountInfo.dob') }}:
              </label>
            </b-col>
            <b-col class="user-profile-form-select">
              <b-row
                no-gutters>
                <b-col class="ml-4">
                  <b-form-select
                    id="birthday"
                    :value="null"
                    :options="[{value: null, text: user.date_of_birth.slice(8, 11)}]"
                    class="h-100"
                    type="date"
                    disabled/>
                </b-col>
                <b-col class="ml-2">
                  <b-form-select
                    :value="null"
                    :options="[{value: null, text: user.date_of_birth.slice(5, 7) }]"
                    class="h-100"
                    type="date"
                    disabled/>
                </b-col>
                <b-col class="ml-2">
                  <b-form-select
                    :value="null"
                    :options="[{value: null, text: user.date_of_birth.slice(0, 4)}]"
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
      </b-collapse>

      <b-list-group-item
        v-b-toggle.account-address-phone
        class="bonus-item bg-arc-clr-soil-light px-0 border-0">
        <b-container
          fluid
          class="px-0">
          <b-row no-gutters>
            <b-col
              cols="auto"
              class="mr-2 d-flex align-items-center">
              <span class="bonus-expand-circle">
                <icon
                  name="bonus-chevron-down"
                  size="8px"
                  color="arc-clr-iron"/>
              </span>
            </b-col>
            <b-col class="p-4 user-profile-form">
              <h4 class="font-weight-light mb-0">
                {{ $t('account.accountInfo.addressAndPhone') }}
              </h4>
            </b-col>
            <b-col/>
          </b-row>
        </b-container>
      </b-list-group-item>
      <b-collapse id="account-address-phone">
        <b-container
          fluid
          class="px-0 py-5">
          <b-row
            class="mb-4"
            no-gutters>
            <b-col class="text-md-right text-sm-left align-self-center">
              <label
                for="country"
                class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                {{ $t('account.accountInfo.country') }}:
              </label>
            </b-col>
            <b-col class="user-profile-form-select">
              <b-form-select
                id="country"
                :value="null"
                :options="[{value: null, text: user.address_country}]"
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
                {{ $t('account.accountInfo.state') }}:
              </label>
            </b-col>
            <b-col class="user-profile-form-select">
              <b-form-select
                id="province"
                :value="null"
                :options="[{value: null, text: user.address_state}]"
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
                {{ $t('account.accountInfo.city') }}:
              </label>
            </b-col>
            <b-col class="user-profile-form-select">
              <b-form-select
                id="city"
                :value="null"
                :options="[{value: null, text: user.address_city}]"
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
                {{ $t('account.accountInfo.address') }}:
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
            no-gutters>
            <b-col class="text-md-right text-sm-left align-self-center">
              <label
                for="phone"
                class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
                {{ $t('account.accountInfo.phone') }}:
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
      </b-collapse>

      <change-password-section/>
    </b-list-group>
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
      user: null
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

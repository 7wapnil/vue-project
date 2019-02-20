<template>
  <div>
    <h1 class="mb-4">
      {{ user.first_name }} {{ user.last_name }}
    </h1>
    <b-form>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="email"
        label="Email:">
        <p>{{ user.email }}</p>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="username"
        label="Username:">
        <b-form-input
          id="username"
          :value="user.username"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="gender"
        label="Gender:">
        <b-form-input
          id="gender"
          :value="user.gender"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="birthday"
        label="Birthday:">
        <b-form-input
          id="birthday"
          :value="user.date_of_birth"
          disabled
          type="date"/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="phone"
        label="Phone:">
        <b-form-input
          id="phone"
          :value="user.phone"
          disabled
          type="tel"/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="country"
        label="Country:">
        <b-form-input
          id="country"
          :value="user.address_country"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="street_address"
        label="Street address:">
        <b-form-input
          id="street_address"
          :value="user.address_street_address"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="zip_code"
        label="ZIP:">
        <b-form-input
          id="zip_code"
          :value="user.address_zip_code"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="city"
        label="City:">
        <b-form-input
          id="city"
          :value="user.address_city"
          disabled/>
      </b-form-group>
      <b-form-group
        :label-cols="2"
        horizontal
        label-size="sm"
        label-for="province"
        label="Province:">
        <b-form-input
          id="province"
          :value="user.address_state"
          disabled/>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { USER_QUERY } from '@/graphql/index'
export default {
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

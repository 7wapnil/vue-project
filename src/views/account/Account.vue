<template>
  <b-container>
    <b-row>
      <b-col class="mb-4">
        <h1 class="text-muted">
          {{ user.first_name }} {{ user.last_name }}
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
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
              size="sm"
              disabled/>
          </b-form-group>
          <b-form-group
            :label-cols="2"
            horizontal
            label-size="sm"
            label-for="gender"
            label="Gender:">
            <b-form-select
              id="gender"
              :value="user.gender"
              disabled>
              <option selected>
                {{ user.gender }}
              </option>
            </b-form-select>
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
        </b-form>
      </b-col>
    </b-row>
  </b-container>
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

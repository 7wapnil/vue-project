<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="mb-4">
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
        </b-form>
      </b-col>
    </b-row>
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

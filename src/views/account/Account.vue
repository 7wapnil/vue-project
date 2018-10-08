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
          <b-form-group label="Email:"/>
          <b-form-group label="Username:"/>
          <b-form-group label="Gender:"/>
          <b-form-group label="Birthday:"/>
          <b-form-group label="Phone:"/>
        </b-form>
      </b-col>
      <b-col class="mr-5">
        <p>{{ user.email }}</p>
        <b-form-input
          :value="user.username"
          disabled
          class="mb-2"/>
        <b-form-select
          :value="user.gender"
          disabled
          class="mb-2">
          <option selected>
            {{ user.gender }}
          </option>
        </b-form-select>
        <b-form-input
          :value="user.date_of_birth"
          disabled
          class="mb-2"
          type="date"/>
        <b-form-input
          :value="user.phone"
          disabled
          class="mb-2"
          type="tel"/>
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

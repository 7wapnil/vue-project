<template>
  <b-container>
    <b-row v-if="user">
      <b-col>
        <h1>Account status</h1>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-end">
        <span
          :class="[ user.verified ? 'badge-success' : '', 'badge-secondary']"
          class="badge">
          <h5 class="p-1 mb-0">
            {{ user.verified ? 'Verified' : 'Not Verified' }}
          </h5>
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { USER_VERIFICATION_QUERY } from '@/graphql'

export default {
  data () {
    return {
      user: null
    }
  },
  apollo: {
    user () {
      return {
        query: USER_VERIFICATION_QUERY,
        fetchPolicy: 'network-only',
      }
    }
  }
}
</script>

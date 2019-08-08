<template>
  <simple-layout>
    <loader/>
  </simple-layout>
</template>

<script>
import { IMPERSONATE_MUTATION } from '@/graphql'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    token () {
      return this.$route.params.token
    }
  },
  created () {
    this.impersonate()
  },
  methods: {
    ...mapActions(['refreshUserFromPayload']),
    ...mapGetters(['getUser']),
    impersonate () {
      this
        .$apollo
        .mutate({
          mutation: IMPERSONATE_MUTATION,
          variables: { token: this.token }
        })
        .then((payload) => {
          const body = payload.data.impersonate

          this.refreshUserFromPayload({ token: body.token, user: body.user })

          this.$router.push({ name: 'home' })
          this.$noty.success(this.$t('auth.impersonate.success', { username: body.user.username }))
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    }
  }
}
</script>

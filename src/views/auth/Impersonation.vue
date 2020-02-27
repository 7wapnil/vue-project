<template>
  <simple-layout>
    <loader/>
  </simple-layout>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
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
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.impersonation.title'),
      description: this.$i18n.t('meta.impersonation.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href,
      robots: 'noindex,nofollow'
    })
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

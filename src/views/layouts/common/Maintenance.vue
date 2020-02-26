<template>
  <b-row no-gutters>
    <b-col cols="2"/>
    <b-col class="p-5">
      <h1 class="font-weight-light text-arc-clr-iron px-5 pb-5">Oopsie!</h1>
      <p class="font-size-18 letter-spacing-2 text-arc-clr-iron px-5 pb-5">
        Our website is currently under construction
      </p>
    </b-col>
    <b-col cols="2"/>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'

export default {
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.maintenance.title'),
      description: this.$i18n.t('meta.maintenance.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href,
      robots: 'noindex,nofollow'
    })
  }
}
</script>

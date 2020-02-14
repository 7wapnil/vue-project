<template>
  <div>
    <b-row no-gutters >
      <b-col class="d-none d-lg-block py-4"/>
    </b-row>
  </div>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'

export default {
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.about.career.title'),
      description: this.$i18n.t('meta.about.career.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  }
}
</script>

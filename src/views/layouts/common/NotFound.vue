<template>
  <div class="bg-arc-clr-soil-darker min-vh-100">
    <b-row no-gutters>
      <b-col class="text-center mt-4">
        <b-img
          :width="300"
          :src="require('@/assets/images/logo/arcanebet-logo.png')"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        cols="12"
        md="8"
        offset-md="2"
        class="pt-4 pt-md-5 pb-5 px-5">
        <h1
          v-if="!isMobile"
          class="p-4 text-arc-clr-iron font-weight-light">
          {{ $t('noFoundPage.header') }}
        </h1>
        <span
          v-if="isMobile"
          class="px-md-5 font-size-21 text-arc-clr-white font-weight-bold">
          {{ $t('noFoundPage.header') }}
        </span>
        <p class="font-size-18 letter-spacing-2 text-arc-clr-iron px-md-4 pb-4 pb-md-5 my-4">
          {{ $t('noFoundPage.description') }}
        </p>
        <b-row
          no-gutters>
          <b-col
            cols="12"
            xl="3"
            class="text-left px-2">
            <b-button
              :to="{ path: '/esports' }"
              block
              size="lg"
              variant="arc-secondary"
              class="px-4 mb-4 bg-arc-clr-esport-bg border-0 letter-spacing-2 font-weight-bold mb-4 text-uppercase font-size-12">
              {{ $t('noFoundPage.esportButton') }}
            </b-button>
          </b-col>
          <b-col
            cols="12"
            xl="3"
            class="text-right px-2">
            <b-button
              :to="{ path: '/sports'}"
              block
              size="lg"
              variant="arc-secondary"
              class="px-4 mb-4 bg-arc-clr-sport-bg border-0 letter-spacing-2 font-weight-bold text-uppercase font-size-13">
              {{ $t('noFoundPage.sportButton') }}
            </b-button>
          </b-col>
          <b-col
            cols="12"
            xl="3"
            class="text-right px-2">
            <b-button
              :to="{ path: '/casino'}"
              block
              size="lg"
              variant="arc-secondary"
              class="px-4 mb-4 bg-arc-clr-casino-bg border-0 letter-spacing-2 font-weight-bold text-uppercase font-size-12">
              {{ $t('noFoundPage.casinoButton') }}
            </b-button>
          </b-col>
          <b-col
            cols="12"
            xl="3"
            class="text-right px-2">
            <b-button
              :to="{ path: '/live-casino'}"
              block
              size="lg"
              variant="arc-secondary"
              class="px-4 mb-4 bg-arc-clr-live-casino-bg border-0 letter-spacing-2 font-weight-bold text-uppercase font-size-12">
              {{ $t('noFoundPage.liveCasinoButton') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'

export default {
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.notFound.title'),
      description: this.$i18n.t('meta.notFound.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href,
      robots: 'noindex,nofollow'
    })
  }
}
</script>

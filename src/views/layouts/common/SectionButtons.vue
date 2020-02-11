<template>
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
</template>

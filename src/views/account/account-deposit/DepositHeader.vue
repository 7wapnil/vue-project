<template>
  <b-row
    v-if="!isMobile"
    no-gutters>
    <b-col>
      <h3 class="mb-4 font-weight-light letter-spacing-2">
        {{ $t('account.deposit.depositHeader') }}
      </h3>
    </b-col>
  </b-row>
</template>

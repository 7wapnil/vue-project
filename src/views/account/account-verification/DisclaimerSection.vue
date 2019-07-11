<template>
  <div>
    <b-row no-gutters>
      <b-col class="p-4 px-md-0">
        <p class="letter-spacing-2 text-arc-clr-iron mb-0">
          {{ $t('account.accountVerification.disclaimers.description') }}
        </p>
      </b-col>
    </b-row>
    <b-row class="border-bottom border-arc-clr-soil-cover"
           no-gutters>
      <b-col
        class="d-flex align-items-center justify-content-center p-4 mb-4"
        cols="auto">
        <b-img :src="require('@/assets/images/account/account-verification/arc-caution.svg')"
               alt="caution-icon"/>
      </b-col>
      <b-col>
        <p class="letter-spacing-2 text-arc-clr-iron p-4">
          {{ $t('account.accountVerification.disclaimers.cardWarning') }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

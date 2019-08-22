<template>
  <div>
    <b-row
      class="mb-md-4 mb-0"
      no-gutters>
      <b-col class="py-3 px-4 p-md-0">
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          {{ $t('account.deposit.paymentMethodsSupport') }}
          <span class="text-arc-clr-gold">
            {{ $t('account.deposit.serviceFees') }}
          </span>
        </p>
      </b-col>
    </b-row>
    <b-row
      class="my-md-4 my-0"
      no-gutters>
      <b-col class="py-3 px-4 p-md-0">
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          {{ $t('account.deposit.moneyTransferInformation') }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

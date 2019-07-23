<template>
  <div>
    <b-row
      class="mb-md-4 mb-0"
      no-gutters>
      <b-col class="p-3 p-md-0">
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          This is only a list of payment methods we support.
          You will select the one that suits you on the next page.
          <span class="text-arc-clr-gold">
            We do not charge service fees.
          </span>
        </p>
      </b-col>
    </b-row>
    <b-row
      class="my-md-4 my-0"
      no-gutters>
      <b-col class="p-3 p-md-0">
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          {{ $t('account.deposit.moneyTransferInformation') }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

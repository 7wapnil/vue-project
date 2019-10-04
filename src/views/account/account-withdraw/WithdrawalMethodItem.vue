<template>
  <div v-if="activeMethod">
    <withdrawal-header/>
    <b-row
      v-b-toggle.withdrawMethod
      ref="changeMethodButton"
      no-gutters
      class="d-flex align-items-center withdrawal-method-item">
      <b-col
        class="py-4 pl-md-0 pl-4 pr-2"
        cols="auto">
        <payment-method-icon :name="activeMethod.code"/>
      </b-col>
      <b-col class="pl-2">
        <span class="font-weight-bold letter-spacing-2 text-arc-clr-white">
          {{ activeMethod.name }}
        </span>
        <span
          v-if="!activeMethod.details.isEditable"
          class="font-size-12 letter-spacing-2 text-arc-clr-iron">
          ({{ activeMethod.details.title }})
        </span>
        <br>
        <span class="font-size-14 letter-spacing-2 text-arc-clr-iron">
          {{ activeMethod.note }}
        </span>
      </b-col>
      <b-col
        v-if="withdrawalMethods.length > 1"
        cols="auto">
        <b-button variant="arc-secondary">
          {{ $t('account.cta.changeWithdrawalMethod') }}
        </b-button>
      </b-col>
    </b-row>
    <b-collapse
      v-if="withdrawalMethods.length > 1"
      id="withdrawMethod">
      <slot/>
    </b-collapse>
  </div>
</template>

<script>
import WithdrawalHeader from '@/views/account/account-withdraw/WithdrawalHeader'

export default {
  components: {
    WithdrawalHeader
  },
  props: {
    activeMethod: {
      type: Object,
      required: true
    },
    withdrawalMethods: {
      type: Array,
      required: true
    }
  },
}
</script>

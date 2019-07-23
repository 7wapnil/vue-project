<template>
  <div id="summary">
    <b-row no-gutters>
      <b-col class="text-center py-2">
        <h4 class="mt-2 mb-4 font-weight-light letter-spacing-1">
          {{ $t('account.deposit.depositSummary') }}
        </h4>
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
      no-gutters>
      <b-col>
        <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
          {{ $tc('generalTerms.deposit', 1) }}:
        </h6>
      </b-col>
      <b-col class="pl-2 text-truncate">
        <h6 class="letter-spacing-2">
          {{ fields.amount ? fields.amount : 0 }} {{ currency }}
        </h6>
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
      no-gutters>
      <b-col>
        <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
          {{ $tc('generalTerms.bonus', 1) }}:
        </h6>
      </b-col>
      <b-col class="pl-2 text-truncate">
        <h6 class="letter-spacing-2">
          {{ calculatedBonus ? calculatedBonus : 0 }} {{ currency }}
        </h6>
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
      no-gutters>
      <b-col>
        <h6 class="mb-2 text-right letter-spacing-2 text-arc-clr-iron">
          {{ $tc('generalTerms.fee', 1) }}:
        </h6>
      </b-col>
      <b-col class="pl-2 text-truncate">
        <h6 class="mb-2 letter-spacing-2">
          0.00 {{ currency }}
        </h6>
      </b-col>
    </b-row>
    <b-row
      class="mt-2 mb-1"
      no-gutters>
      <b-col class="pt-1">
        <h6 class="mb-0 text-right letter-spacing-2 text-arc-clr-iron">
          {{ $t('account.deposit.total') }}:
        </h6>
      </b-col>
      <b-col class="pl-2 mb-4 text-truncate">
        <span class="letter-spacing-2 font-weight-bold">
          {{ getTotal ? getTotal : 0 }} {{ currency }}
        </span>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col class="px-2 mt-4 mb-2">
        <b-button
          :disabled="buttonDisabled"
          variant="user-profile-button"
          block
          @click.prevent="$emit('submit:deposit')">
          {{ $t('account.cta.deposit') }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      required: true
    },
    currency: {
      type: String,
      default: 'EUR'
    },
    calculatedBonus: {
      type: String,
      default: ''
    },
    getTotal: {
      type: String,
      default: ''
    },
    buttonDisabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <div id="summary">
    <b-row
      v-if="isMobile && !depositState"
      no-gutters>
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
          {{ $tc('account.deposit.method', 1) }}:
        </h6>
      </b-col>
      <b-col class="pl-2 text-truncate">
        <h6 class="letter-spacing-2">
          {{ method }}
        </h6>
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
          {{ computeAmount }}
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
          {{ calculateBonus }}
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
          {{ computeTotal }}
        </span>
      </b-col>
    </b-row>
    <b-row
      v-if="!isMobile && !depositState"
      no-gutters>
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
    <b-row
      v-if="depositState"
      no-gutters>
      <b-col class="px-2 mt-4 mb-2">
        <b-button
          variant="user-profile-button"
          block
          @click.prevent="close">
          {{ $t('account.deposit.close') }}
        </b-button>
        <b-button
          v-if="depositState === failState"
          variant="user-profile-button"
          block
          @click.prevent="tryAgain">
          {{ $t('account.deposit.tryAgain') }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { DEPOSIT_FAIL } from '@/constants/deposit-states'
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
      type: Number,
      default: 0
    },
    getTotal: {
      type: Number,
      default: 0
    },
    buttonDisabled: {
      type: Boolean,
      default: true
    },
    paymentMethod: {
      type: Object,
      default: null
    },
    depositState: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      variantMap: {
        pending: 'warning',
        success: 'success',
        fail: 'danger'
      },
      failState: DEPOSIT_FAIL
    }
  },
  computed: {
    ...mapGetters('tabs', {
      tabIndex: 'getCurrentTabIndex'
    }),
    computeAmount () {
      return this.fields.amount ? `${this.fields.amount} ${this.currency}` : `0 ${this.currency}`
    },
    calculateBonus () {
      return this.calculatedBonus ? `${this.calculatedBonus} ${this.currency}` : `0 ${this.currency}`
    },
    computeTotal () {
      if (this.depositState === DEPOSIT_FAIL) return `0 ${this.currency}`
      return this.getTotal ? `${this.getTotal} ${this.currency}` : `0 ${this.currency}`
    },
    mapDepositState () {
      return this.variantMap[this.depositState]
    },
    method () {
      return this.paymentMethod ? this.paymentMethod.name : this.$t('account.deposit.notSelected')
    }
  },
  mounted () {
    if (!this.depositState) return

    this.$root.$once('bv::modal::hide', () => this.tryAgain())
  },
  methods: {
    ...mapMutations('tabs', [
      'toggleMenu',
      'changeTabIndex'
    ]),
    close () {
      this.changeTabIndex(0)
      this.$bvModal.hide('AccountModal')
      this.$router.replace({ name: this.$route.params.titleKind })
    },
    tryAgain () {
      this.$router.replace({ name: this.$route.params.titleKind })
      this.changeTabIndex(0)
      this.changeTabIndex(3)
    }
  }
}
</script>

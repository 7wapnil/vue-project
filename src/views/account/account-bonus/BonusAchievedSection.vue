<template>
  <b-col
    cols="12"
    md="4"
    class="d-flex align-items-center justify-content-center pb-4 pt-5">
    <div class="text-center">
      <h6 class="mb-0 font-weight-bold letter-spacing-2 text-arc-clr-gold">
        {{ $t('account.bonus.bonusAchieved') }}
      </h6>
      <span class="font-size-36 font-weight-bold text-arc-clr-white letter-spacing-5">
        {{ bonusAchieved | normalizeFloat }}
      </span>
      <span class="font-size-36 font-weight-bold text-arc-clr-white letter-spacing-5">
        <b-button
          variant="user-profile-button"
          block
          @click.prevent="cancelActiveBonus">
          {{ $t('account.bonus.cancelBonus') }}
        </b-button>
      </span>
    </div>
  </b-col>
</template>

<script>
export default {
  filters: {
    normalizeFloat (value) {
      const number = value || 0

      return number.toFixed(2)
    }
  },
  props: {
    bonusAchieved: {
      type: Number,
      required: true
    },
    bonusError: {
      type: String,
      default: null
    },
    bonusSuccess: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancelActiveBonus () {
      this.$bvModal.show('CancelActiveBonusModal')
    }
  }
}
</script>

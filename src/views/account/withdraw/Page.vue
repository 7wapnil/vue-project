<template>
  <div>
    <h3 class="mb-5 font-weight-light">
      Withdraw funds
    </h3>

    <b-row
      v-b-toggle.withdrawMethod
      no-gutters
      class="d-flex align-items-center"
      style="min-height: 80px; box-shadow: 0 1px 0 0 rgba(0,0,0,0.30)">
      <b-col
        class="p-2"
        cols="auto">
        <b-img :src="require('@/assets/images/withdraw-methods/card.png')"/>
      </b-col>
      <b-col class="ml-2">
        <span class="font-weight-bold letter-spacing-2 text-arc-clr-white">
          Credit card (Visa, MasterCard, Maestro)
        </span>
        <br>
        <span class="font-size-14 letter-spacing-2 text-arc-clr-iron">
          Range: 10 - 10 000€ / No service fee
        </span>
      </b-col>
      <b-col cols="auto">
        <b-button variant="arc-secondary">
          Change withdraw method
        </b-button>
      </b-col>
    </b-row>
    <b-collapse id="withdrawMethod">
      <withdraw-methods-switch/>
    </b-collapse>
    <component :is="CreditCard"/>
  </div>
</template>
<script>
import WithdrawMethodsSwitch from './WithdrawMethodsSwitch'
import CreditCard from './withdraw-methods/CreditCard'

export default {
  components: {
    WithdrawMethodsSwitch,
    CreditCard
  },
  data () {
    return {
      CreditCard: CreditCard
    }
  },
}
</script>

<template>
  <b-card>
    <h3>
      Betslip
    </h3>
    <b-card
      no-body
      class="p-4">
      <b-row>
        <b-col
          style="max-width: 295px"
          class="py-4 bg-arc-clr-soil-black">
          <betslip/>
        </b-col>
      </b-row>
    </b-card>
  </b-card>
</template>
<script>
import Betslip from './component/Betslip'
import BetslipItem from './component/BetslipItem'
import NoBetsBlock from './component/NoBetsBlock'

export default {
  components: {
    BetslipItem,
    Betslip,
    NoBetsBlock
  }
}
</script>

<template>
  <b-row
    class="btn-betslip-placing-bet"
    no-gutters>
    <b-col
      class="d-flex align-items-center justify-content-center px-4"
      cols="auto">
      <arc-spinner/>
    </b-col>
    <b-col class="d-flex align-items-center pl-3">PLACING BET</b-col>
  </b-row>
</template>

<script>
import ArcSpinner from '@/components/custom/ArcSpinner'

export default {
  components: {
    ArcSpinner
  }
}
</script>

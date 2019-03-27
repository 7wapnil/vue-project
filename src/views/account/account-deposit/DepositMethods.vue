<template>
  <b-row
    class="p-4 bg-arc-clr-soil-darker border-4"
    no-gutters>
    <b-col
      v-for="(method, index) in depositMethods"
      :key="index"
      class="d-flex align-items-center justify-content-center">
      <b-img :src="method"/>
    </b-col>
  </b-row>
</template>

<script>
import Sofort from '@/assets/images/withdraw-methods/sofort.png'
import Skrill from '@/assets/images/withdraw-methods/skrill.png'
import Skinwallet from '@/assets/images/withdraw-methods/skinwallet.png'
import Skinpay from '@/assets/images/withdraw-methods/skinpay.png'
import Qiwi from '@/assets/images/withdraw-methods/qiwi.png'
import Paysafe from '@/assets/images/withdraw-methods/paysafe.png'
import Mru from '@/assets/images/withdraw-methods/mru.png'
import CreditCard from '@/assets/images/withdraw-methods/card.png'
import Bitcoin from '@/assets/images/withdraw-methods/btc.png'
import Yandex from '@/assets/images/withdraw-methods/yandex.png'

export default {
  data () {
    return {
      depositMethods: [
        Sofort,
        Skrill,
        Skinwallet,
        Skinpay,
        Qiwi,
        Paysafe,
        Mru,
        CreditCard,
        Bitcoin,
        Yandex
      ]
    }
  }
}
</script>

<template>
  <b-row
    class="p-4 bg-arc-clr-soil-dark border-4"
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
import Paysafecard from '@/assets/images/withdraw-methods/paysafecard.png'
import Mru from '@/assets/images/withdraw-methods/mru.png'
import CreditCard from '@/assets/images/withdraw-methods/card.png'
import Bitcoin from '@/assets/images/withdraw-methods/btc.png'
import Yandex from '@/assets/images/withdraw-methods/yandex.png'
import Neteller from '@/assets/images/withdraw-methods/neteller.png'

export default {
  data () {
    return {
      depositMethods: [
        Sofort,
        Skrill,
        Skinwallet,
        Skinpay,
        Qiwi,
        Paysafecard,
        Mru,
        CreditCard,
        Bitcoin,
        Yandex,
        Neteller
      ]
    }
  }
}
</script>

<template>
  <div>
    <b-row no-gutters>
      <b-col class="text-arc-clr-iron mb-md-2 mb-0 p-4 p-md-0">
        Payments methods we support:
      </b-col>
    </b-row>
    <b-row
      class="p-4 mx-4 mb-4 mt-0 m-md-0 bg-arc-clr-soil-dark border-4"
      no-gutters>
      <b-col
        v-for="(method, index) in depositMethods"
        :key="index"
        class="p-2 p-md-0 d-flex align-items-center justify-content-center">
        <b-img :src="method"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sofort from '@/assets/images/withdrawal-methods/sofort.png'
import Skrill from '@/assets/images/withdrawal-methods/skrill.png'
import Skinwallet from '@/assets/images/withdrawal-methods/skinwallet.png'
import Skinpay from '@/assets/images/withdrawal-methods/skinpay.png'
import Qiwi from '@/assets/images/withdrawal-methods/qiwi.png'
import Paysafecard from '@/assets/images/withdrawal-methods/paysafecard.png'
import Mru from '@/assets/images/withdrawal-methods/mru.png'
import CreditCard from '@/assets/images/withdrawal-methods/card.png'
import Bitcoin from '@/assets/images/withdrawal-methods/btc.png'
import Yandex from '@/assets/images/withdrawal-methods/yandex.png'
import Neteller from '@/assets/images/withdrawal-methods/neteller.png'

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

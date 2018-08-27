<template>
    <div>
        <b-card>
            <div slot="header">
                {{event.name}}
                <button class="close"
                        aria-label="Close">
                    <span aria-hidden="true"
                          @click="removeOdd(odd.odd)">
                        ×
                    </span>
                </button>
            </div>
            <div class="row m-2">
                <p>{{market.name}}</p>
            </div>
            <div class="row m-2">
                <p>Outcome {{odd.odd.name}} with value {{odd.odd.value}}</p>
            </div>
            <div class="row mt-4 text-right">
                <div class="col-12">
                    <div class="row my-2">
                        <div class="col-8 text-nowrap text-right">
                            My Stake:
                            <br/>
                            <button class="btn btn-sm btn-outline-secondary my-2">
                                Place max bet
                            </button>
                        </div>
                        <div class="col-4">
                            <input class="form-control"
                                   type="number"
                                   name="odd-value"
                                   @change="odd.stake = odd.stake > 0 ? odd.stake : 0"
                                   v-model="odd.stake"/>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-8 text-nowrap text-right">
                            Potential Return:
                        </div>
                        <div class="col-4">{{potentialReturn}}</div>
                    </div>
                </div>
            </div>
        </b-card>
        <hr/>
    </div>
</template>

<script>
  import OddButton from '@/components/custom/OddButton.vue'

  export default {
    props: {
      odd: {
        type: Object,
        required: true
      }
    },
    components: {
      OddButton
    },
    computed: {
      market: function () {
        return {name: "Market of Odd " + this.odd.odd.id}
      },
      event: function () {
        return {name: "Event of Odd " + this.odd.odd.id}
      },
      potentialReturn: function () {
          const stake = this.odd.stake > 0 ? this.odd.stake : 0
          return Math.round(stake * this.odd.odd.value)
      }
    },
    methods: {
      removeOdd: function (odd) {
        this.$store.commit('removeBetFromBetslip', odd)
      }
    }
  }
</script>

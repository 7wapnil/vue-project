<template>
    <div>
        <b-card :bg-variant="cardVariant">
            <div slot="header">
                {{row.event.name}}
                <button class="close"
                        aria-label="Close">
                    <span aria-hidden="true"
                          @click="removeOdd(row.odd)"
                          v-show="!bet.frozen">
                        ×
                    </span>
                </button>
            </div>
            <div class="row m-2">
                <p>{{row.market.name}}</p>
            </div>
            <div class="row m-2">
                <p>Outcome {{row.odd.name}} with value {{row.odd.value}}</p>
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
                                   :disabled="bet.frozen"
                                   v-model="bet.stake"/>
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
  import Bet from '@/models/bet'

  export default {
    props: {
      row: {
        type: Object,
        required: true
      },
      bet: {
        type: Bet,
        required: true
      }
    },
    components: {
      OddButton
    },
    computed: {
      potentialReturn: function () {
        return Math.round(this.bet.stake * this.row.odd.value)
      },
      cardVariant: function () {
        const variantMapping = {
          initial: 'default',
          submitting: 'light',
          pending: 'light',
          succeeded: 'success',
          failed: 'danger'
        }

        return variantMapping[this.bet.status]
      }
    },
    methods: {
      removeOdd: function (odd) {
        this.$store.commit('removeBetFromBetslip', odd)
      }
    }
  }
</script>

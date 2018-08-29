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
                      <div class="col-12">
                        <b-alert :show="hasMessage">
                          {{bet.message}}
                        </b-alert>
                        <b-alert variant="danger" :show="hasUnconfirmedOddValue">
                          This bet odd value changed from {{bet.approvedValue}} to {{row.odd.value}}.
                        </b-alert>
                      </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-8 text-nowrap text-right">
                            My Stake:
                            <br/>
                        </div>
                        <div class="col-4">
                            <input class="form-control"
                                   type="number"
                                   name="odd-value"
                                   min="0"
                                   v-model="betStake"/>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-8 text-nowrap text-right">
                            Potential Return:
                        </div>
                        <div class="col-4">{{parseFloat(potentialReturn.toFixed(2))}}</div>
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
        const stake = this.bet.stake > 0 ? this.bet.stake : 0
        return stake * this.row.odd.value
      },
      betStake: {
        get () {
          return this.bet.stake
        },
        set (value) {
          let stakeValue = value > 0 ? value : 0
          this.$store.commit('setBetStake', { oddId: this.bet.odd.id, stakeValue })
        }
      },
      hasUnconfirmedOddValue: function () {
        return (this.bet.approvedValue != this.row.odd.value)
      },
      cardVariant: function () {
        const variantMapping = {
          initial: 'default',
          submitting: 'light',
          pending: 'light',
          succeeded: 'success',
          failed: 'danger'
        }

        if(this.bet.approvedValue != this.row.odd.value){
          return 'danger'
        }

        return variantMapping[this.bet.status]
      },
      hasMessage: function () {
        return this.bet.message !== null
      }
    },
    methods: {
      removeOdd: function (odd) {
        this.$store.commit('removeBetFromBetslip', odd)
      }
    }
  }
</script>

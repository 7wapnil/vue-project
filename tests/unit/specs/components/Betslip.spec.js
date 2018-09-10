import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import betslip from '@/stores/betslip'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Betslip component', () => {
  let wrapper

  let store
  let state
  let getters
  let mutations
  let actions

  before(() => {
    const wallet = { id: 1, amount: 112.23, currency: { code: 'EUR' } }

    getters = {
      getWallets: () => { return [ wallet ] },
      getActiveWallet: () => { return wallet },
    }

    mutations = {
      freezeBets: sinon.stub(),
      fetchWallets: sinon.stub()
    }

    const loadEventsStub = sinon.stub().returns({ then: function () {} });

    actions = {
      fetchWallets: sinon.stub(),
      placeBets: sinon.stub(),
      loadEvents: loadEventsStub
    }

    store = new Vuex.Store({
      modules: [ betslip ],
      state,
      getters,
      mutations,
      actions
    })

    wrapper = shallowMount(Betslip, {
      stubs: {
        'b-card': '<div><slot/></div>',
        'betslip-item': '<div><slot/></div>'
      },
      localVue,
      store
    })
  })

  describe('Default state', () => {
    it('opens Single tab', () => {
      expect(wrapper.find('a.nav-link.active').text()).to.eq('Single')
    })

    it('shows placeholder while no bets added', () => {
      expect(wrapper.find('#betslipSingleTab').isVisible()).to.equal(true)
      expect(wrapper.find('#betslipSingleTab').text()).to.eq('Place your bets')
    })
  })

  describe('Single tab', () => {
    before(() => {
      wrapper.find('#betslipSingleTab').trigger('click')
    })

    it('opens single tab', () => {
      expect(wrapper.find('#betslipSingleTab').isVisible()).to.equal(true)
    })

    describe('empty', () => {
      it('shows placeholder', () => {
        expect(wrapper.find('#betslipSingleTab').text()).to.eq('Place your bets')
      })
    })

    describe('with bets added', () => {
      let sampleOddId = 1
      let sampleOddValue = 1.13
      let sampleOdd = { id: sampleOddId, value: sampleOddValue }
      let sampleInitialWalletBalance = 10.006
      let sampleStake = 1.006
      let sampleStakeDisplayValue = '1.01'
      let sampleStakeReturn = 1.13678
      let sampleStakeReturnDisplayValue = '1.14'

      before(() => {
        const events = [
          { id: 1, markets: [{ id: 2, odds: [sampleOdd, { id: 4, value: 2.21 }] }] }
        ]
        const wallet = { id: 1, amount: sampleInitialWalletBalance, currency: { code: 'EUR' } }

        wrapper.vm.$store.hotUpdate({
          getters: {
            getEvents: () => { return events },
            getWallets: () => { return [wallet] },
            getActiveWallet: () => { return wallet }
          }

        })

        wrapper.vm.$store.dispatch('addNewEmptyBet', sampleOdd)
      })

      describe('initial bet state', () => {
        it('has correct odd id', () => {
          expect(wrapper.vm.getBets[0].odd.id).to.eql(sampleOdd.id)
        })

        it('has approved value equals to currrent odd value', () => {
          expect(wrapper.vm.getBets[0].approvedOddValue).to.eql(sampleOdd.value)
        })

        it('has status as initial', () => {
          expect(wrapper.vm.getBets[0].status).to.eql('initial')
        })

        it('has zero stake', () => {
          expect(wrapper.vm.getBets[0].stake).to.eql(0)
        })
      })

      it('has bet placement button disabled', () => {
        expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
      })

      describe('totals block', () => {
        it('has total return field', () => {
          expect(wrapper.find('#betslipSingleTab .total-return').text()).to.contain('Total return:')
        })

        it('has total stake field', () => {
          expect(wrapper.find('#betslipSingleTab .total-stake').text()).to.contain('Total stake:')
        })

        it('should display a button to place bets', () => {
          expect(wrapper.findAll('#betslipSingleTab .btn-submit-bets')).to.have.length(1);
          expect(wrapper.find('#betslipSingleTab .btn-submit-bets').text()).to.contain('Place bet')
        })

        it('has zero stake by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-stake-value').text()).to.eq('0')
        })

        it('has zero return by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq('0')
        })
      })

      describe('with correct stake entered', () => {
        before(() => {
          wrapper.vm.$store.commit('setBetStake', { oddId: sampleOdd.id, stakeValue: sampleStake })
        })

        describe('betslip submitted', () => {
          before(() => {
            wrapper.vm.submit()
          })

          it('freezes BetItems in Betslip', function () {
            expect(mutations.freezeBets.calledOnce).to.equal(true)
          })

          it('calls bet placement API', () => {
            expect(actions.placeBets.called).to.eq(true)
            const fistCallArgs = actions.placeBets.firstCall.args[1][0]
            expect(fistCallArgs.amount).to.eq(sampleStake)
          })
        })

        describe('totals block adjusted', () => {
          it('calculates correct total stakes', () => {
            expect(wrapper.vm.getTotalStakes).to.eq(sampleStake)
          })

          it('displays correct total stakes', () => {
            expect(
              wrapper.find('#betslipSingleTab .total-stake-value').text())
              .to.eq(sampleStakeDisplayValue)
          })

          it('calculates correct total return', () => {
            expect(wrapper.vm.getTotalReturn).to.eq(sampleStakeReturn)
          })

          it('displays correct total return', () => {
            setTimeout(function () {
              expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq(sampleStakeReturnDisplayValue)
            }, 1000);
          })
        })
      })

      describe('with invalid stake', () => {
        describe('negative stake entered', () => {
          before(() => {
            wrapper.vm.$store.commit('setBetStake', { oddId: 1, stakeValue: -3 })
          })

          it('has bet placement button disabled', () => {
            setTimeout(function () {
              expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
            }, 1000);
          })
        })

        describe('stake over current wallet balance', () => {
          before(() => {
            const wallet = { id: 1, amount: 112.23, currency: { code: 'EUR' } }
            wrapper.vm.$store.commit(
              'storeWallets',
              {
                wallets: [wallet],
                activeWallet: wallet
              }
            )
          })

          it('bet placement button reacts on wallet balance rule', () => {
            wrapper.vm.$store.commit('setBetStake', { oddId: 1, stakeValue: 112.23 })
            setTimeout(function () {
              expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('enabled')
              wrapper.vm.$store.commit('resetBetslipStakes')
              wrapper.vm.$store.commit('setBetStake', { oddId: 1, stakeValue: 112.24 })
              setTimeout(function () {
                expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
              }, 1000)
            }, 1000)
          })
        })
      })
    })
  })
})

import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import betslip from '@/stores/betslip'
import wallets from '@/stores/wallets'
import BetslipService from '@/services/api/betslip'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Betslip component', () => {
  let wrapper

  let store
  let mutations

  let loadEventsStub
  let betslipServiceStub
  let betslipPlacementStub

  before(() => {
    loadEventsStub = sinon.stub(Betslip.methods, 'getNewApiService')
      .returns({ load: function () {}})

    betslipPlacementStub = sinon.stub()
      .returns({then: function () { return {  catch: function () {} }},})
    betslipServiceStub = sinon.stub(Betslip.methods, 'getNewBetslipService')
      .returns({ place: betslipPlacementStub })

    mutations = {
      freezeBets: sinon.stub()
    }

    store = new Vuex.Store({
      modules: [ betslip, wallets ],
      mutations
    })

    wrapper = shallowMount(Betslip, {
      stubs: {
        'b-card': '<div><slot/></div>',
        'market-in-betslip': '<div><slot/></div>'
      },
      localVue,
      store
    })
  })

  describe('Default state', () => {
    it('opens Single tab', () => {
      expect(wrapper.find('a.nav-link.active').text()).to.eq('Single')
    })

    it('shows placeholder while no bets added', ()=>{
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

    describe('empty', ()=> {
      it('shows placeholder', ()=>{
        expect(wrapper.find('#betslipSingleTab').text()).to.eq('Place your bets')
      })
    })

    describe('with bets added', ()=> {
      let sampleOdd = {id: 1, value: 1.13}
      let sampleInitialWalletBalance = 10.006
      let sampleStake = 1.006
      let sampleStakeDisplayValue = '1.01'
      let sampleStakeReturn = 1.13678
      let sampleStakeReturnDisplayValue = '1.14'

      before(() => {
        const wallet = { id: 1, amount: sampleInitialWalletBalance, currency: { code: "EUR" } }
        wrapper.vm.$store.commit(
          'storeWallets',
          {
            wallets: [wallet],
            activeWallet: wallet
          }
        )

        wrapper.vm.$store.dispatch('addNewEmptyBet', sampleOdd)
      })

      describe('initial bet state', ()=> {
        it('has correct odd id', () => {
          expect(wrapper.vm.getBets[0].odd.id).to.eql(sampleOdd.id)
        })

        it('has approved value equals to currrent odd value', () => {
          expect(wrapper.vm.getBets[0].approvedValue).to.eql(sampleOdd.value)
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
          expect(wrapper.find('#betslipSingleTab .btn-submit-bets').text()).to.contain("Place bet")
        })

        it('has zero stake by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-stake-value').text()).to.eq('0')
        })

        it('has zero return by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq('0')
        })
      })

      describe('with correct stake entered', ()=> {
        before(() => {
          wrapper.vm.$store.commit('setBetStake',{oddId: sampleOdd.id, stakeValue: sampleStake})
        })

        it('has correct preconditions to submit', () => {
          expect(wrapper.vm.betslipSubmittable).to.eq(true)
        })

        describe('betslip submitted', ()=> {
          before(() => {
            wrapper.vm.submit()
          })

          it('freezes BetItems in Betslip', function(){
            expect(mutations.freezeBets.calledOnce).to.equal(true)
          })

          it('calls bet placement API', () => {
            expect(betslipPlacementStub.called).to.eq(true)
            expect(betslipPlacementStub.firstCall.args[0][0].amount).to.eq(sampleStake)
          })
        })

        describe('totals block adjusted', () => {
          it('calculates correct total stakes', ()=>{
            expect(wrapper.vm.getTotalStakes).to.eq(sampleStake)
          })

          it('displays correct total stakes', ()=>{
            expect(wrapper.find('#betslipSingleTab .total-stake-value').text()).to.eq(sampleStakeDisplayValue)
          })

          it('calculates correct total return', ()=>{
            expect(wrapper.vm.getTotalReturn).to.eq( sampleStakeReturn )
          })

          it('displays correct total return', ()=>{
            setTimeout(function(){
              expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq(sampleStakeReturnDisplayValue)
            }, 1000);
          })
        })
      })

      describe('with invalide stake', ()=> {
        describe('negative stake entered', ()=> {
          before(() => {
            wrapper.vm.$store.commit('setBetStake',{oddId: 1, stakeValue: -3})
          })

          it('has bet placement button disabled', () => {
            setTimeout(function(){
              expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
            }, 1000);
          })
        })

        describe('stake over current wallet balance', ()=> {
          before(() => {
            const wallet = { id: 1, amount: 112.23, currency: { code: "EUR" } }
            wrapper.vm.$store.commit(
              'storeWallets',
              {
                wallets: [wallet],
                activeWallet: wallet
              }
            )
          })

          it('bet placement button reacts on wallet balance rule', () => {
            wrapper.vm.$store.commit('setBetStake',{oddId: 1, stakeValue: 112.23})
            setTimeout(function(){
              expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('enabled')
              wrapper.vm.$store.commit('resetBetslipStakes')
              wrapper.vm.$store.commit('setBetStake',{oddId: 1, stakeValue: 112.24})
              setTimeout(function(){
                expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
              }, 1000)
            }, 1000)
          })
        })
      })
    })
  })
})

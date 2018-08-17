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

  before(() => {
    store = new Vuex.Store({
      modules: [ betslip ]
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
      let sampleOdd = {id: 1, value: 1.2}
      let sampleBet = { odd: sampleOdd, stake: 0 }
      let sampleStake = 2
      let sampleStakeReturn = 2.4

      before(() => {
        wrapper.vm.$store.dispatch('addNewEmptyBet', sampleOdd)
      })

      it('reacts on store state change', () => {
        expect(wrapper.vm.getBets).to.eql([sampleBet])
      })

      it('has bet placement button disabled', () => {
        expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.contain('disabled')
      })

      describe('totals block', () => {
        it('has total return field', () => {
          expect(wrapper.find('#betslipSingleTab .total-return').text()).to.contain('Total return:')
        })

        it('has total odds field', () => {
          expect(wrapper.find('#betslipSingleTab .total-odds').text()).to.contain('Total Odds:')
        })

        it('has total stake field', () => {
          expect(wrapper.find('#betslipSingleTab .total-stake').text()).to.contain('Total stake:')
        })

        it('should display a button to place bets', () => {
          expect(wrapper.findAll('#betslipSingleTab .btn-submit-bets')).to.have.length(1);
          expect(wrapper.find('#betslipSingleTab .btn-submit-bets').text()).to.contain("Place bet")
        })

        it('has zero odds by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-odds-value').text()).to.eq('1')
        })

        it('has zero stake by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-stake-value').text()).to.eq('0')
        })

        it('has zero return by default', () => {
          expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq('0')
        })
      })

      describe('with stake entered', ()=> {
        before(() => {
          wrapper.vm.$store.commit('setBetStake',{oddId: sampleOdd.id, stakeValue: sampleStake})
        })

        it('has bet placement button enabled', () => {
          setTimeout(function(){
            expect(wrapper.find('#betslipSingleTab .btn-submit-bets').html()).to.not.contain('disabled')
          }, 1000);
        })

        it('calculates correct total stakes', ()=>{
          expect(wrapper.vm.getTotalStakes).to.eq(sampleStake)
        })

        it('displays correct total stakes', ()=>{
          const stake = String(sampleStake)
          expect(wrapper.find('#betslipSingleTab .total-stake-value').text()).to.eq(stake)
        })

        it('calculates correct total return', ()=>{
          expect(wrapper.vm.getTotalReturn).to.eq( Math.round(sampleStakeReturn) )
        })

        it('displays correct total return', ()=>{
          setTimeout(function(){
            const returnValue = String(Math.round(sampleStakeReturn))
            expect(wrapper.find('#betslipSingleTab .total-return-value').text()).to.eq(returnValue)
          }, 1000);
        })
      })
    })
  })



})

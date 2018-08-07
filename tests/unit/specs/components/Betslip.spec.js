import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Betslip component', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      mutations: {},
      getters: {
        getBets: () => () => {
          return {}
        }
      }
    })

    wrapper = shallowMount(Betslip, {
      stubs: {
        'b-card': '<div><slot/></div>'
      },
      localVue,
      store
    })
  })

  describe('Default state', () => {
    it('opens Single tab', () => {
      expect(wrapper.find('a.nav-link.active').text()).to.eq('Single')
    })
  })

  describe('Single tab', () => {
    it('has total return field', () => {
      expect(wrapper.find('#total-return').text()).to.contain('Total return:')
    })

    it('has total odds field', () => {
      expect(wrapper.find('#total-odds').text()).to.contain('Total Odds:')
    })

    it('has total stake field', () => {
      expect(wrapper.find('#total-stake').text()).to.contain('Total stake:')
    })

    it('should display a button to place bets', () => {
      expect(wrapper.findAll('button#placeBets')).to.have.length(1);
      expect(wrapper.find('#placeBets').text()).to.contain("Place bet")
    })

    describe('default state', () => {
      it('has zero odds by default', () => {
        expect(wrapper.find('#total-odds-value').text()).to.eq('0')
      })
      it('has zero stake by default', () => {
        expect(wrapper.find('#total-stake-value').text()).to.eq('0')
      })

      it('has zero return by default', () => {
        expect(wrapper.find('#total-return-value').text()).to.eq('0')
      })
    })

    describe('markets reacts on storage change', () => {
      it('display no markets with empty store',()=>{
        expect(wrapper.findAll('#markets-in-betslip div.market-in-betslip').length).to.eq(0)
      })
      it('add market on storage change',()=>{
        store = new Vuex.Store({
          state: {
            bets: [
              { id: 1 },
              { id: 2 }
            ]
          },
          mutations: {},
          getters: {
            getBets: (state) => {
              return state.bets
            }
          }
        })
        wrapper = shallowMount(Betslip, {
          stubs: {
            'b-card': '<div><slot/></div>',
            'market-in-betslip': '<div class="market-in-betslip"><slot/></div>'
          },
          localVue,
          store
        })
        expect(wrapper.findAll('#markets-in-betslip div.market-in-betslip').length).to.eq(2)
      })
    })
  })



})

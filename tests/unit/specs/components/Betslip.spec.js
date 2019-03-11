import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import contentful from '@/libs/contentful/contentful-client'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(contentful)

describe('Betslip', () => {
  let wrapper
  let promotion

  let store
  let state
  let actions
  let getters
  let mutations

  before(() => {
    state = {
      bets: []
    }

    getters = {
      getBetsCount: () => state.bets.count,
      getBets: () => state.bets,
      betslipSubmittable: () => true
    }

    store = new Vuex.Store({
      modules: {
        betslip: {
          namespaced: true,
          state,
          actions,
          getters,
          mutations
        }
      }
    })

    promotion = mount(PromotionalItem,
      {
        localVue,
        store
      })

    wrapper = mount(Betslip,
      {
        localVue,
        store
      })
  })

  describe('Default state', () => {
    it('shows the banner', () => {
      expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(true)
    })

    it('shows initial view', () => {
      expect(wrapper.text()).contains('Your betslip is currently empty.\n' +
        '      Click on any odds to add them\n' +
        '      to betslip.')
    })

    it('shows place bet button', () => {
      expect(wrapper.find('span.text-uppercase').text()).to.equal('Place bet')
    })
  })

  describe('Has bets', () => {
    before(() => {
      state = {
        bets: [{ event: {}, market: {}, odd: {} }]
      }
      getters = {
        getBets: () => state.bets,
        getBetsCount: () => state.bets.length
      }

      store = new Vuex.Store({
        modules: {
          betslip: {
            namespaced: true,
            state,
            actions,
            getters
          }
        }
      })

      promotion = mount(PromotionalItem,
        {
          localVue,
          store
        })
    })

    it('shows no banner', () => {
      expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(false)
    })
  })
})

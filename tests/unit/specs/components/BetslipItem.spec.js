import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import BetslipItem from '@/components/betslip/BetslipItem.vue'

import Bet from '@/models/bet'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)

describe('BetslipItem component', () => {
  let store
  let actions
  let bet
  let wrapper
  let getters
  let mutations
  let state
  let i18n
  let parentRef

  before(() => {
    state = {
      bets: [new Bet({
        id: null,
        eventId: '52908',
        marketStatus: 'active',
        eventName: 'Cameroon VS New Zealand',
        marketId: '7091092',
        marketName: '1x2',
        oddId: '25838157',
        oddName: 'New Zealand',
        stake: 5,
        status: 'initial',
        message: null,
        externalId: null,
        approvedOddValue: 3.48,
        currentOddValue: 3.48,
        success: null
      }),
      new Bet({
        id: null,
        eventId: '67890',
        marketStatus: 'inactive',
        eventName: 'Estonia vs Estonia',
        marketId: '0964783',
        marketName: '0',
        oddId: '24321142',
        oddName: 'Estonia',
        stake: 5,
        status: 'initial',
        message: null,
        externalId: null,
        approvedOddValue: 6.78,
        currentOddValue: 3.45,
        success: null
      })
      ]
    }

    bet = state.bets[0]

    getters = {
      getBets: () => state.bets,
      getBetsCount: () => state.bets.length,
      betslipSubmittable: () => true,
      getAnySubmittedBet: () => false,
      getAnyBetInValidation: () => false,
      getTotalStakes: () => 10,
      getTotalReturn: () => 15,
      acceptAllChecked: () => false,
      isLoggedIn: () => true
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

    i18n = new VueI18n({
      locale: 'en',
      messages
    })
    //
    // ololo = shallowMount(Betslip, {
    //   data () {
    //     return {
    //       tabIndex: 0
    //     }
    //   },
    //   computed: {
    //     acceptAllOdds: () => false,
    //   },
    //   store,
    //   localVue,
    //   i18n
    // })

    wrapper = shallowMount(BetslipItem, {
      computed: {
        potentialReturn () {
          return 13
        }
      },
      propsData: {
        bet,
        parentRef
      },
      store,
      localVue,
      i18n
    })
  })

  describe('initial state', () => {
    it('shows bet event name', () => {
      expect(wrapper.find('.event-name').text()).to.equal(bet.eventName)
    })

    it('shows bet event name', () => {
      expect(wrapper.find('.market-name').text()).to.equal(bet.marketName)
    })
  })
})

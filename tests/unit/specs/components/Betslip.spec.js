import { expect } from 'chai'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import contentful from '@/libs/contentful/contentful-client'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'
import Bet from '@/models/bet'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)
localVue.use(contentful, {
  space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
})

describe('Betslip', () => {
  let wrapper
  let promotion

  let store
  let state
  let actions
  let getters
  let mutations
  let uri
  let i18n
  before(() => {
    state = {
      bets: []
    }

    uri = 'https://someurl'

    getters = {
      getBetsCount: () => state.bets.length,
      getBets: () => state.bets,
      betslipSubmittable: () => false,
      getAnySubmittedBet: () => false,
      getAnyBetInValidation: () => false,
      acceptAllChecked: () => false,
      isLoggedIn: () => false
    }

    i18n = new VueI18n({
      locale: 'en',
      messages
    })

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
        computed: {
          uri () {
            return uri
          }
        },
        i18n,
        localVue,
        store
      })

    wrapper = mount(Betslip,
      {
        data () {
          return {
            tabIndex: 0
          }
        },
        computed: {
          acceptAllOdds: () => false,
        },
        i18n,
        localVue,
        store
      })

    const submit = sinon.stub()
    wrapper.setMethods({ submit: submit })
  })

  describe('Default state', () => {
    describe('no url', () => {
      before(() => {
        promotion = mount(PromotionalItem,
          {
            computed: {
              uri () {
                return ''
              }
            },
            localVue,
            store
          })
      })

      it('does not display banner when there is no url', () => {
        expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(false)
      })
    })

    it('shows the banner', () => {
      expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(true)
    })

    it('shows initial view', () => {
      expect(wrapper.text()).contains(i18n.t('betslip.betslipEmpty'))
    })

    it('shows place bet button', () => {
      expect(wrapper.find('button.btn-arc-primary').text()).to.equal(i18n.t('betslip.cta.login'))
    })

    it('has no checkbox', () => {
      expect(wrapper.contains('.accept-all-odds-checkbox')).to.equal(false)
    })

    it('has submit button as enabled on initial state', () => {
      expect(wrapper.find('.submit-bets').attributes()['disabled']).to.equal(undefined)
    })
  })

  describe('Has bets', () => {
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

      actions = {
        clearBetslip: () => { state.bets = [] }
      }

      mutations = {
        clearBets: () => { state.bets = [] }
      }

      store = new Vuex.Store({
        modules: {
          betslip: {
            namespaced: true,
            state,
            getters,
            mutations,
            actions
          }
        }
      })
      promotion = shallowMount(PromotionalItem,
        {
          localVue,
          store
        })

      wrapper = shallowMount(Betslip, { store, localVue, i18n })
    })

    it('shows no banner', () => {
      expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(false)
    })

    it('shows amount of bets in betslip on top', () => {
      expect(wrapper.find('div.bet-amount').text()).to.equal(getters.getBetsCount().toString())
    })

    it('has correct text in button', () => {
      expect(wrapper.find('.clear').text()).to.equal(i18n.t('betslip.cta.clearAll'))
    })

    it('has correct text in checkbox', () => {
      expect(wrapper.find('.accept-all-odds-checkbox').text()).to.equal(i18n.t('betslip.acceptAllCheckbox'))
    })

    it('shows total stakes', () => {
      const value = getters.getTotalStakes().toFixed(2)
      expect(wrapper.find('.total-stake').text()).to.equal(value)
    })

    it('shows total return', () => {
      const value = getters.getTotalReturn().toFixed(2)
      expect(wrapper.find('.total-return').text()).to.equal(value)
    })
  })
})

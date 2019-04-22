import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import contentful from '@/libs/contentful/contentful-client'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'

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
      getBetsCount: () => state.bets.count,
      getBets: () => state.bets,
      betslipSubmittable: () => true
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
        i18n,
        localVue,
        store
      })
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
      expect(wrapper.find('button.btn-arc-primary').text()).to.equal('PLACE BET')
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

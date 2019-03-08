import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import OddButton from '@/components/markets/OddButton.vue'
import betslip from '@/stores/betslip'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OddButton component', () => {
  let store
  let actions
  let odd
  let wrapper
  let event
  let market

  beforeEach(() => {
    event = {}
    market = {}
    odd = { id: 1, name: 'foo', value: 1.22 }

    actions = {
      'betslip/pushBet': sinon.stub()
    }

    store = new Vuex.Store({
      modules: {
        betslip
      },
      actions
    })

    wrapper = shallowMount(OddButton, {
      propsData: {
        event,
        market,
        odd,
        disabled: false
      },
      store,
      localVue
    })
  })

  describe('methods', () => {
    describe('obbButtonClick', () => {
      it('dispatches pushBet event with current odd object', () => {
        wrapper.vm.pushBetToBetslip()

        expect(actions['betslip/pushBet'].calledOnce).to.equal(true)
        expect(actions['betslip/pushBet'].firstCall.args[1]).to.deep.eq({
          event,
          market,
          odd
        })
      })
    })
  })
})

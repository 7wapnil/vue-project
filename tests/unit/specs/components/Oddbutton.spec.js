import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import OddButton from '@/components/custom/OddButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OddButton component', () => {
  let store
  let actions
  let exampleOdd

  beforeEach(() => {
    exampleOdd = { id: 1, name: 'foo', value: 1.22 }

    actions = {
      addOddtoBetslip: sinon.stub()
    }

    store = new Vuex.Store({
      actions
    })
  })

  describe('methods', () => {
    describe('obbButtonClick', () => {
      it('dispatches addOddtoBetslip event with current odd object', () => {
        const wrapper = shallowMount(OddButton, {
          propsData: { odd: exampleOdd },
          store,
          localVue
        })

        wrapper.findAll('.btn').at(0).trigger('click')

        expect(actions.addOddtoBetslip.calledOnce).to.equal(true)
        expect(actions.addOddtoBetslip.firstCall.args[1]).to.eq(exampleOdd);
      })
    })
  })
})

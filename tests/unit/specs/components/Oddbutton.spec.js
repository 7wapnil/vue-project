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
      addNewEmptyBet: sinon.stub()
    }

    store = new Vuex.Store({
      actions
    })
  })

  describe('methods', () => {
    describe('obbButtonClick', () => {
      it('dispatches addNewEmptyBet event with current odd object', () => {
        const wrapper = shallowMount(OddButton, {
          propsData: { odd: exampleOdd },
          store,
          localVue
        })

        wrapper.findAll('.btn').at(0).trigger('click')

        expect(actions.addNewEmptyBet.calledOnce).to.equal(true)
        expect(actions.addNewEmptyBet.firstCall.args[1]).to.eq(exampleOdd);
      })
    })
  })
})

import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import OddButton from '@/components/markets/OddButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OddButton component', () => {
  let store
  let actions
  let odd
  let wrapper

  beforeEach(() => {
    odd = { id: 1, name: 'foo', value: 1.22 }

    actions = {
      addNewEmptyBet: sinon.stub()
    }

    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(OddButton, {
      propsData: { odd, disabled: false },
      store,
      localVue
    })
  })

  describe('methods', () => {
    describe('obbButtonClick', () => {
      it('dispatches addNewEmptyBet event with current odd object', () => {
        wrapper.findAll('.btn').at(0).trigger('click')

        expect(actions.addNewEmptyBet.calledOnce).to.equal(true)
        expect(actions.addNewEmptyBet.firstCall.args[1]).to.eq(odd);
      })

      it('restricts new bets when odd disabled', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ disabled: true })

        expect(wrapper.vm.isDisabled).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })
    })
  })
})

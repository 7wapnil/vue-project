import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import OddButton from '@/components/custom/OddButton.vue'
import {
  ACTIVE_STATUS,
  SUSPENDED_STATUS,
  INACTIVE_STATUS,
  SETTLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OddButton component', () => {
  let store
  let actions
  let odd
  let market
  let wrapper

  beforeEach(() => {
    odd = { id: 1, name: 'foo', value: 1.22 }
    market = { id: 1, status: ACTIVE_STATUS }

    actions = {
      addNewEmptyBet: sinon.stub()
    }

    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(OddButton, {
      propsData: { odd, market },
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
    })

    describe('statuses', () => {
      it('restricts new bets when market suspended', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ market: { status: SUSPENDED_STATUS } })

        expect(wrapper.vm.isDisabled).to.eq(true)
        expect(wrapper.findAll('.btn').at(0).is('[disabled]')).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })

      it('restricts new bets when market deactivated', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ market: { status: INACTIVE_STATUS } })

        expect(wrapper.vm.isDisabled).to.eq(true)
        expect(wrapper.findAll('.btn').at(0).is('[disabled]')).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })

      it('restricts new bets when market settled', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ market: { status: SETTLED_STATUS } })

        expect(wrapper.vm.isDisabled).to.eq(true)
        expect(wrapper.findAll('.btn').at(0).is('[disabled]')).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })

      it('restricts new bets when market handed over', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ market: { status: HANDED_OVER_STATUS } })

        expect(wrapper.vm.isDisabled).to.eq(true)
        expect(wrapper.findAll('.btn').at(0).is('[disabled]')).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })

      it('restricts new bets when odd desctivated', () => {
        expect(wrapper.vm.isDisabled).to.eq(false)
        wrapper.setProps({ odd: { status: 'inactive' } })

        expect(wrapper.vm.isDisabled).to.eq(true)
        expect(wrapper.findAll('.btn').at(0).is('[disabled]')).to.eq(true)
        wrapper.vm.obbButtonClick()
        expect(actions.addNewEmptyBet.calledOnce).to.equal(false)
      })
    })
  })
})

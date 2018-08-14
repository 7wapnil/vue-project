import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import BalancesList from '@/components/custom/BalancesList.vue'

const wallets = [{
  id: 1,
  amount: 299.00,
  currency: {
    code: 'EUR',
    name: 'Euro'
  }
}, {
  id: 2,
  amount: 19.99,
  currency: {
    code: 'BTC',
    name: 'Bitcoin'
  }
}, {
  id: 3,
  amount: 0.99,
  currency: {
    code: 'ETH',
    name: 'Etherium'
  }
}]

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BalancesList component', () => {

  let wrapper
  let getters
  let mutations
  let actions

  beforeEach(() => {
    const state = {
      wallets: wallets
    }

    getters = {
      getActiveWallet: () => wallets[1],
      getWallets: () => wallets
    }

    mutations = {
      setActiveWalletId: sinon.stub()
    }

    actions = {
      loadWallets: sinon.stub(),
      changeActiveWallet: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })

    wrapper = shallowMount(BalancesList, {
      localVue,
      store
    })
  })

  describe('Setting active wallet', () => {
    it('should load active wallet ID from store', () => {
      const text = wrapper.vm.displayAmount(wallets[1])
      expect(wrapper.find('#wallets-dropdown').text()).to.eq(text)
    })
  })

  describe('List of customer wallets', () => {
    it ('should exclude active wallet from a list', () => {
      expect(wrapper.findAll('a.dropdown-item').length).to.eq(2)
    })

    it ('should set other active wallet on select', () => {
      wrapper.find('a.dropdown-item').trigger('click')
      expect(mutations.setActiveWalletId.calledOnce).to.equal(true)
      expect(mutations.setActiveWalletId.firstCall.args[1]).to.eq(1);
    })
  })

})

import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import BalancesList from '@/components/navbar/wallet/BalancesList.vue'
import { SET_ACTIVE_WALLET } from '@/stores/wallets'

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
  let wrapper // eslint-disable-line no-unused-vars

  let getters
  let actions
  let mutations
  let store

  before(() => {
    const state = {
      wallets: wallets
    }

    getters = {
      ativeWallet: () => wallets[1],
      wallets: () => wallets
    }

    actions = {
      fetchWallets: sinon.stub()
    }

    mutations = {
      [SET_ACTIVE_WALLET]: sinon.stub()
    }

    store = new Vuex.Store({
      modules: {
        wallets: {
          namespaced: true,
          state,
          getters,
          actions,
          mutations
        }
      }
    })
  })

  describe('Methods', () => {
    beforeEach(function () {
      wrapper = shallowMount(BalancesList, { localVue, store })
    })

    it('selectWallet - should set active wallet id', () => {
      const walletId = 832
      const wallet = { id: walletId }

      wrapper.vm.selectWallet(wallet)

      expect(mutations[SET_ACTIVE_WALLET].calledOnce).to.equal(true)
      expect(mutations[SET_ACTIVE_WALLET].firstCall.args[1]).to.eq(walletId);
    })
  })
})

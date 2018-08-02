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
  let store
  let walletId

  let setActiveWallet = (id) => {
    walletId = id
    wrapper.vm.setActiveWallet()
  }

  beforeEach(() => {
    walletId = null

    store = new Vuex.Store({
      state: {},
      mutations: {},
      getters: {
        getUserData: () => () => {
          return walletId
        }
      }
    })

    wrapper = shallowMount(BalancesList, {
      localVue,
      store,
      methods: {
        loadWallets: () => {}
      }
    })
    wrapper.setData({ wallets })
  })

  describe('Setting active wallet', () => {
    it('should hide dropdown unless active wallet set', () => {
      expect(wrapper.vm.activeWallet).to.be.null
    })

    it('should load active wallet ID from store', () => {
      setActiveWallet(2)
      wrapper.vm.setActiveWallet()
      expect(wrapper.find('#wallets-dropdown').text()).to.eq('19.99 BTC')
    })

    it('should set first wallet active if no wallet stored', () => {
      setActiveWallet(null)
      expect(wrapper.find('#wallets-dropdown').text()).to.eq('299.00 EUR')
    })
  })

  describe('List of customer wallets', () => {
    it ('should exclude active wallet from a list', () => {
      setActiveWallet(1)
      expect(wrapper.findAll('a.dropdown-item').length).to.eq(2)
    })

    it ('should set other active wallet on select', () => {
      setActiveWallet(1)

      expect(wrapper.vm.activeWallet.id).to.eq(1)
      wrapper.find('a.dropdown-item').trigger('click')
      expect(wrapper.vm.activeWallet.id).to.eq(2)
    })
  })

})

import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import BalancesList from '@/components/custom/BalancesList.vue'
import WalletsService from '@/services/api/wallets'

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
  let store

  let loadWalletsStub

  before(() => {
    const state = {
      wallets: wallets
    }

    getters = {
      getActiveWallet: () => wallets[1],
      getWallets: () => wallets
    }

    actions = {
      changeActiveWallet: sinon.stub()
    }

    store = new Vuex.Store({
      state,
      getters,
      actions
    })
  })

  describe('Lifecycle', () => {
    it('Created', done => {
      loadWalletsStub = sinon.stub(BalancesList.methods, 'loadWallets').returns({})
      wrapper = shallowMount(BalancesList, { localVue, store })

      expect(loadWalletsStub.calledOnce).to.equal(true)

      loadWalletsStub.restore()
      done()
    })
  })

  describe('Methods', () => {
    beforeEach(function() {
      loadWalletsStub = sinon.stub(BalancesList.methods, 'loadWallets').returns({})
      wrapper = shallowMount(BalancesList, { localVue, store })
    })

    afterEach(function() {
      loadWalletsStub.restore();
    })

    it('displayAmount - should return wallet amount to fixed 2 and with currency code', done => {
      const wallet = {amount: 12.22545, currency: { code: 'FOO'} }
      const expectedDisplayText = '12.23 FOO'

      const result = wrapper.vm.displayAmount(wallet)

      expect(result).to.eq(expectedDisplayText)

      done()
    })

    it('selectWallet - should dispatch action with active wallet id', done => {
      const walletId = 832
      const wallet = { id: walletId }

      wrapper.vm.selectWallet(wallet)

      expect(actions.changeActiveWallet.calledOnce).to.equal(true)
      expect(actions.changeActiveWallet.firstCall.args[1]).to.eq(walletId);

      done()
    })
  })

  describe('Functional tests', ()=>{
    beforeEach(function() {
      loadWalletsStub = sinon.stub(BalancesList.methods, 'loadWallets').returns({})
      selectWalletStub = sinon.stub(BalancesList.methods, 'selectWallet').returns({})
      wrapper = shallowMount(BalancesList, { localVue, store })
    })

    afterEach(function() {
      selectWalletStub.restore()
      loadWalletsStub.restore()
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
        console.log(wrapper.find('a.dropdown-item').html())
        wrapper.find('a.dropdown-item').trigger('click')
        expect(selectWalletStub.calledOnce).to.equal(true)
      })
    })
  })
})

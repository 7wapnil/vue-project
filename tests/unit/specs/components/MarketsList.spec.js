import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { MARKETS_LIST_QUERY } from '@/graphql'
import {
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  SUSPENDED_STATUS,
  SETTLED_STATUS,
  CANCELLED_STATUS } from '@/models/market'
import MarketsList from '@/components/markets/MarketsList'

const localVue = createLocalVue()

const event = {
  id: 1,
  name: 'Test event'
}

const markets = [{
  id: 1,
  name: 'Test market 1',
  status: ACTIVE_STATUS
}, {
  id: 2,
  name: 'Test market 2',
  status: INACTIVE_STATUS
}, {
  id: 3,
  name: 'Test market 2',
  status: SUSPENDED_STATUS
}, {
  id: 4,
  name: 'Test market 4',
  status: SETTLED_STATUS
}, {
  id: 5,
  name: 'Test market 5',
  status: CANCELLED_STATUS
}]

describe('MarketsList component', () => {
  let wrapper

  before(() => {
    wrapper = shallowMount(MarketsList, {
      methods: {
        loadMarkets: sinon.stub()
      },
      localVue
    })

    wrapper.setProps({ event })
    wrapper.setData({ markets })
  })

  it('builds list query', () => {
    wrapper.setProps({
      queryOptions: { filter: 1, limit: 10 }
    })
    expect(wrapper.vm.query)
      .to
      .deep
      .eq({
        query: MARKETS_LIST_QUERY,
        variables: { filter: 1, limit: 10, eventId: 1 }
      })
  })

  it('filters out specified markets by status', () => {
    const filtered = wrapper.vm.filteredMarkets
    const visibleStatuses = filtered.map(market => market.status)
    expect(visibleStatuses).to.include.members([ ACTIVE_STATUS, INACTIVE_STATUS, SUSPENDED_STATUS ])
    expect(visibleStatuses).not.to.include.members([ SETTLED_STATUS, CANCELLED_STATUS ])
  })
})

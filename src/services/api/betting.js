import BaseService from './base-service'

class BettingService extends BaseService {

  constructor(vm) {
    super(vm)
  }

  // TODO: Replace this stub
  placeBets(fields = '', prop = 'wallets') {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery(prop, {
        query: this.buildQuery(`
          query {
            wallets {
              ${fields}
            }
          }
        `),
        result: resolve,
        error: reject
      })
    })
  }
}

export default BettingService
